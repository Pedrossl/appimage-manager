mod appimage;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            appimage::commands::inspect_appimage,
            appimage::commands::launch_appimage,
            appimage::commands::make_appimage_executable
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
