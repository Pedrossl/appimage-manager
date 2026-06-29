#[cfg(target_os = "linux")]
use std::fs;
#[cfg(target_os = "linux")]
use std::io;
#[cfg(target_os = "linux")]
use std::path::{Path, PathBuf};
#[cfg(target_os = "linux")]
use std::process::Command;

#[cfg(target_os = "linux")]
const DESKTOP_FILE_NAME: &str = "com.pedrolobato.appimagelauncher.desktop";
#[cfg(target_os = "linux")]
const APP_NAME: &str = "AppImage Manager";
#[cfg(target_os = "linux")]
const APP_COMMENT: &str = "Import, organize and launch AppImage applications";
#[cfg(target_os = "linux")]
const ICON_NAME: &str = "appimage-manager";

#[cfg(target_os = "linux")]
pub fn ensure_desktop_entry() -> io::Result<()> {
    let applications_dir = user_applications_dir()?;
    fs::create_dir_all(&applications_dir)?;

    let desktop_file_path = applications_dir.join(DESKTOP_FILE_NAME);
    let executable_path = persistent_executable_path()?;
    let desktop_file = create_desktop_file(&executable_path);

    if fs::read_to_string(&desktop_file_path).ok().as_deref() != Some(desktop_file.as_str()) {
        fs::write(&desktop_file_path, desktop_file)?;
    }

    refresh_desktop_database(&applications_dir);

    Ok(())
}

#[cfg(not(target_os = "linux"))]
pub fn ensure_desktop_entry() -> std::io::Result<()> {
    Ok(())
}

#[cfg(target_os = "linux")]
fn user_applications_dir() -> io::Result<PathBuf> {
    let data_home = std::env::var_os("XDG_DATA_HOME")
        .map(PathBuf::from)
        .or_else(|| std::env::var_os("HOME").map(|home| PathBuf::from(home).join(".local/share")))
        .ok_or_else(|| io::Error::new(io::ErrorKind::NotFound, "home directory not found"))?;

    Ok(data_home.join("applications"))
}

#[cfg(target_os = "linux")]
fn persistent_executable_path() -> io::Result<PathBuf> {
    if let Some(appimage_path) = std::env::var_os("APPIMAGE") {
        return Ok(PathBuf::from(appimage_path));
    }

    std::env::current_exe()
}

#[cfg(target_os = "linux")]
fn create_desktop_file(executable_path: &Path) -> String {
    format!(
        "[Desktop Entry]\nType=Application\nName={APP_NAME}\nComment={APP_COMMENT}\nExec=\"{}\"\nIcon={ICON_NAME}\nTerminal=false\nNoDisplay=false\nCategories=Utility;\nKeywords=AppImage;Launcher;Applications;Desktop;Linux;\nStartupNotify=true\n",
        escape_desktop_path(executable_path)
    )
}

#[cfg(target_os = "linux")]
fn escape_desktop_path(path: &Path) -> String {
    path.to_string_lossy()
        .replace('\\', "\\\\")
        .replace('"', "\\\"")
}

#[cfg(target_os = "linux")]
fn refresh_desktop_database(applications_dir: &Path) {
    let _ = Command::new("update-desktop-database")
        .arg(applications_dir)
        .spawn();
}
