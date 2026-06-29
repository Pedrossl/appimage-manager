use std::path::PathBuf;

use super::models::{AppImageEntry, AppImageError};
use super::usecases;

#[tauri::command]
pub fn inspect_appimage(path: String) -> Result<AppImageEntry, AppImageError> {
    usecases::inspect_appimage(PathBuf::from(path))
}

#[tauri::command]
pub fn launch_appimage(path: String) -> Result<(), AppImageError> {
    usecases::launch_appimage(PathBuf::from(path))
}

#[tauri::command]
pub fn make_appimage_executable(path: String) -> Result<AppImageEntry, AppImageError> {
    usecases::make_appimage_executable(PathBuf::from(path))
}

#[tauri::command]
pub fn open_appimage_folder(path: String) -> Result<(), AppImageError> {
    usecases::open_appimage_folder(PathBuf::from(path))
}
