import type { AppImageEntry } from "../../../shared/types/appImage";
import type { LanguageCode } from "../../../shared/types/language";
import type { ThemeMode } from "../../../shared/types/theme";

const appLibraryKey = "appimage-manager:library";
const preferencesKey = "appimage-manager:preferences";

export type AppPreferences = {
  language: LanguageCode;
  themeMode: ThemeMode;
};

export function loadAppLibrary() {
  const storedLibrary = window.localStorage.getItem(appLibraryKey);

  if (!storedLibrary) {
    return [];
  }

  try {
    const parsedLibrary = JSON.parse(storedLibrary);

    if (!Array.isArray(parsedLibrary)) {
      return [];
    }

    return parsedLibrary.filter(isAppImageEntry);
  } catch {
    return [];
  }
}

export function saveAppLibrary(apps: AppImageEntry[]) {
  window.localStorage.setItem(appLibraryKey, JSON.stringify(apps));
}

export function loadPreferences(): AppPreferences {
  const storedPreferences = window.localStorage.getItem(preferencesKey);

  if (!storedPreferences) {
    return {
      language: "pt",
      themeMode: "light",
    };
  }

  try {
    const parsedPreferences = JSON.parse(storedPreferences);

    return {
      language: isLanguageCode(parsedPreferences.language)
        ? parsedPreferences.language
        : "pt",
      themeMode: isThemeMode(parsedPreferences.themeMode)
        ? parsedPreferences.themeMode
        : "light",
    };
  } catch {
    return {
      language: "pt",
      themeMode: "light",
    };
  }
}

export function savePreferences(preferences: AppPreferences) {
  window.localStorage.setItem(preferencesKey, JSON.stringify(preferences));
}

function isAppImageEntry(value: unknown): value is AppImageEntry {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as AppImageEntry;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.version === "string" &&
    typeof candidate.path === "string" &&
    typeof candidate.executable === "boolean" &&
    typeof candidate.importedAt === "string"
  );
}

function isLanguageCode(value: unknown): value is LanguageCode {
  return value === "en" || value === "pt" || value === "es";
}

function isThemeMode(value: unknown): value is ThemeMode {
  return value === "light" || value === "dark";
}
