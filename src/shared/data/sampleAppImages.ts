import type { AppImageEntry } from "../types/appImage";

export const sampleAppImages: AppImageEntry[] = [
  {
    id: "obsidian",
    name: "Obsidian",
    version: "1.8.10",
    path: "~/Applications/AppImages/Obsidian.AppImage",
    executable: true,
  },
  {
    id: "krita",
    name: "Krita",
    version: "5.2.9",
    path: "~/Applications/AppImages/Krita.AppImage",
    executable: true,
  },
  {
    id: "godot",
    name: "Godot Engine",
    version: "4.4.1",
    path: "~/Applications/AppImages/Godot.AppImage",
    executable: false,
  },
  {
    id: "heroic",
    name: "Heroic Games Launcher",
    version: "2.17.0",
    path: "~/Applications/AppImages/Heroic.AppImage",
    executable: true,
  },
];
