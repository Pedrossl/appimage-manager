use std::fs::{File, Metadata};
use std::io::Read;
use std::path::{Path, PathBuf};
use std::process::Command;

use super::models::{AppImageEntry, AppImageError};

pub fn inspect_appimage(path: impl AsRef<Path>) -> Result<AppImageEntry, AppImageError> {
    let path = normalize_path(path.as_ref())?;
    validate_appimage_path(&path)?;

    let metadata = path
        .metadata()
        .map_err(|error| AppImageError::new("metadata_error", error.to_string()))?;

    if !metadata.is_file() {
        return Err(AppImageError::new(
            "not_a_file",
            "The selected path is not a file.",
        ));
    }

    validate_appimage_signature(&path)?;

    let name = get_app_name(&path)?;

    Ok(AppImageEntry {
        id: create_app_id(&name),
        name,
        version: "Unknown".to_string(),
        path: path.to_string_lossy().to_string(),
        executable: is_executable(&metadata),
    })
}

pub fn launch_appimage(path: impl AsRef<Path>) -> Result<(), AppImageError> {
    if !cfg!(target_os = "linux") {
        return Err(AppImageError::new(
            "unsupported_platform",
            "AppImages can only be launched on Linux.",
        ));
    }

    let entry = inspect_appimage(path)?;

    if !entry.executable {
        return Err(AppImageError::new(
            "not_executable",
            "This AppImage does not have execution permission.",
        ));
    }

    let path = PathBuf::from(entry.path);
    let mut command = Command::new(&path);

    if let Some(parent) = path.parent() {
        command.current_dir(parent);
    }

    command
        .spawn()
        .map_err(|error| AppImageError::new("launch_error", error.to_string()))?;

    Ok(())
}

pub fn make_appimage_executable(path: impl AsRef<Path>) -> Result<AppImageEntry, AppImageError> {
    let path = normalize_path(path.as_ref())?;
    let entry = inspect_appimage(&path)?;

    if entry.executable {
        return Ok(entry);
    }

    apply_executable_permission(&path)?;

    inspect_appimage(path)
}

pub fn open_appimage_folder(path: impl AsRef<Path>) -> Result<(), AppImageError> {
    let entry = inspect_appimage(path)?;
    let path = PathBuf::from(entry.path);
    let folder = path.parent().ok_or_else(|| {
        AppImageError::new("folder_not_found", "Could not find the AppImage folder.")
    })?;

    open_folder(folder)
}

fn normalize_path(path: &Path) -> Result<PathBuf, AppImageError> {
    if path.as_os_str().is_empty() {
        return Err(AppImageError::new("empty_path", "Path cannot be empty."));
    }

    Ok(path.to_path_buf())
}

fn validate_appimage_path(path: &Path) -> Result<(), AppImageError> {
    let file_name = path
        .file_name()
        .and_then(|value| value.to_str())
        .ok_or_else(|| AppImageError::new("invalid_name", "Invalid AppImage file name."))?;

    if !file_name.to_lowercase().ends_with(".appimage") {
        return Err(AppImageError::new(
            "invalid_extension",
            "The selected file is not an AppImage.",
        ));
    }

    if !path.exists() {
        return Err(AppImageError::new(
            "file_not_found",
            "The selected AppImage does not exist.",
        ));
    }

    Ok(())
}

fn validate_appimage_signature(path: &Path) -> Result<(), AppImageError> {
    let mut header = [0_u8; 12];
    let mut file = File::open(path).map_err(|error| {
        if error.kind() == std::io::ErrorKind::PermissionDenied {
            AppImageError::new(
                "read_permission_denied",
                "The selected AppImage cannot be read.",
            )
        } else {
            AppImageError::new("read_error", error.to_string())
        }
    })?;

    file.read_exact(&mut header).map_err(|error| {
        if error.kind() == std::io::ErrorKind::UnexpectedEof {
            AppImageError::new(
                "invalid_appimage_signature",
                "The selected file is too small to be a valid AppImage.",
            )
        } else {
            AppImageError::new("read_error", error.to_string())
        }
    })?;

    let has_elf_signature = header.starts_with(&[0x7f, b'E', b'L', b'F']);
    let has_appimage_magic = header[8] == b'A'
        && header[9] == b'I'
        && (header[10] == 1 || header[10] == 2);

    if !has_elf_signature || !has_appimage_magic {
        return Err(AppImageError::new(
            "invalid_appimage_signature",
            "The selected file is not a valid AppImage.",
        ));
    }

    Ok(())
}

fn get_app_name(path: &Path) -> Result<String, AppImageError> {
    let file_name = path
        .file_name()
        .and_then(|value| value.to_str())
        .ok_or_else(|| AppImageError::new("invalid_name", "Invalid AppImage file name."))?;

    let lower_file_name = file_name.to_lowercase();
    let name = if lower_file_name.ends_with(".appimage") {
        &file_name[..file_name.len() - ".appimage".len()]
    } else {
        file_name
    };

    let name = name.trim().to_string();

    if name.is_empty() {
        return Err(AppImageError::new(
            "invalid_name",
            "AppImage name cannot be empty.",
        ));
    }

    Ok(name)
}

fn create_app_id(name: &str) -> String {
    let mut id = String::new();
    let mut last_was_separator = false;

    for character in name.chars() {
        if character.is_ascii_alphanumeric() {
            id.push(character.to_ascii_lowercase());
            last_was_separator = false;
        } else if !last_was_separator {
            id.push('-');
            last_was_separator = true;
        }
    }

    let id = id.trim_matches('-').to_string();

    if id.is_empty() {
        "appimage".to_string()
    } else {
        id
    }
}

#[cfg(unix)]
fn is_executable(metadata: &Metadata) -> bool {
    use std::os::unix::fs::PermissionsExt;

    metadata.permissions().mode() & 0o111 != 0
}

#[cfg(not(unix))]
fn is_executable(_metadata: &Metadata) -> bool {
    false
}

#[cfg(unix)]
fn apply_executable_permission(path: &Path) -> Result<(), AppImageError> {
    use std::os::unix::fs::PermissionsExt;

    let metadata = path
        .metadata()
        .map_err(|error| AppImageError::new("metadata_error", error.to_string()))?;
    let mut permissions = metadata.permissions();
    let mode = permissions.mode();

    permissions.set_mode(mode | 0o111);

    std::fs::set_permissions(path, permissions)
        .map_err(|error| AppImageError::new("permission_error", error.to_string()))
}

#[cfg(not(unix))]
fn apply_executable_permission(_path: &Path) -> Result<(), AppImageError> {
    Err(AppImageError::new(
        "unsupported_platform",
        "Execution permissions are only supported on Unix-like systems.",
    ))
}

#[cfg(target_os = "linux")]
fn open_folder(path: &Path) -> Result<(), AppImageError> {
    Command::new("xdg-open")
        .arg(path)
        .spawn()
        .map_err(|error| AppImageError::new("open_folder_error", error.to_string()))?;

    Ok(())
}

#[cfg(target_os = "macos")]
fn open_folder(path: &Path) -> Result<(), AppImageError> {
    Command::new("open")
        .arg(path)
        .spawn()
        .map_err(|error| AppImageError::new("open_folder_error", error.to_string()))?;

    Ok(())
}

#[cfg(target_os = "windows")]
fn open_folder(path: &Path) -> Result<(), AppImageError> {
    Command::new("explorer")
        .arg(path)
        .spawn()
        .map_err(|error| AppImageError::new("open_folder_error", error.to_string()))?;

    Ok(())
}

#[cfg(not(any(target_os = "linux", target_os = "macos", target_os = "windows")))]
fn open_folder(_path: &Path) -> Result<(), AppImageError> {
    Err(AppImageError::new(
        "unsupported_platform",
        "Opening folders is not supported on this platform.",
    ))
}
