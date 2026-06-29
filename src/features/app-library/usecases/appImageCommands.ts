import { invoke, isTauri } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import type { AppImageEntry } from "../../../shared/types/appImage";

type NativeAppImageEntry = Omit<AppImageEntry, "importedAt" | "lastOpenedAt">;

export type NativeAppImageError = {
  code: string;
  message: string;
};

export function canUseNativeAppImageCommands() {
  return isTauri();
}

export async function pickAppImagePath() {
  ensureTauriRuntime();

  const selectedPath = await open({
    multiple: false,
    filters: [
      {
        name: "AppImage",
        extensions: ["AppImage", "appimage"],
      },
    ],
  });

  return typeof selectedPath === "string" ? selectedPath : null;
}

export async function inspectAppImage(path: string) {
  ensureTauriRuntime();

  return invoke<NativeAppImageEntry>("inspect_appimage", { path });
}

export async function launchAppImage(path: string) {
  ensureTauriRuntime();

  return invoke<void>("launch_appimage", { path });
}

export async function makeAppImageExecutable(path: string) {
  ensureTauriRuntime();

  return invoke<NativeAppImageEntry>("make_appimage_executable", { path });
}

export async function openAppImageFolder(path: string) {
  ensureTauriRuntime();

  return invoke<void>("open_appimage_folder", { path });
}

function ensureTauriRuntime() {
  if (!canUseNativeAppImageCommands()) {
    throw new Error("native_runtime_unavailable");
  }
}
