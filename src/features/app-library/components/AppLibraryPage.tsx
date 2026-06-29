import { useEffect, useMemo, useState } from "react";
import { AppShell } from "../../../components/AppShell";
import { ToastViewport } from "../../../components/ToastViewport";
import { filterAppLibrary } from "../usecases/filterAppLibrary";
import { AppCard } from "./AppCard";
import { EmptyLibraryState } from "./EmptyLibraryState";
import { LibraryToolbar } from "./LibraryToolbar";
import { languageOptions, translations } from "../../../shared/i18n/translations";
import type { LanguageCode } from "../../../shared/types/language";
import type { ThemeMode } from "../../../shared/types/theme";
import type { AppImageEntry } from "../../../shared/types/appImage";
import type { ToastMessage, ToastKind } from "../../../shared/types/toast";
import {
  canUseNativeAppImageCommands,
  inspectAppImage,
  launchAppImage,
  makeAppImageExecutable,
  openAppImageFolder,
  pickAppImagePath,
} from "../usecases/appImageCommands";
import {
  removeAppImage,
  updateAppImage,
  upsertAppImage,
} from "../usecases/appLibraryActions";
import {
  loadAppLibrary,
  loadPreferences,
  saveAppLibrary,
  savePreferences,
} from "../usecases/appLibraryStorage";
import { getErrorMessage } from "../usecases/errorMessages";

export function AppLibraryPage() {
  const initialPreferences = useMemo(() => loadPreferences(), []);
  const [apps, setApps] = useState<AppImageEntry[]>(() => loadAppLibrary());
  const [searchTerm, setSearchTerm] = useState("");
  const [themeMode, setThemeMode] = useState<ThemeMode>(
    initialPreferences.themeMode,
  );
  const [language, setLanguage] = useState<LanguageCode>(
    initialPreferences.language,
  );
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const copy = translations[language];

  const filteredApps = useMemo(
    () => filterAppLibrary(apps, searchTerm),
    [apps, searchTerm],
  );

  const readyApps = apps.filter((app) => app.executable).length;
  const libraryStatus = copy.library.status(apps.length, readyApps);

  useEffect(() => {
    saveAppLibrary(apps);
  }, [apps]);

  useEffect(() => {
    savePreferences({ language, themeMode });
  }, [language, themeMode]);

  const addToast = (
    kind: ToastKind,
    title: string,
    description?: string,
  ) => {
    const toastId = crypto.randomUUID();

    setToasts((currentToasts) => [
      ...currentToasts
        .filter(
          (toast) => toast.title !== title || toast.description !== description,
        )
        .slice(-3),
      {
        id: toastId,
        kind,
        title,
        description,
      },
    ]);

    window.setTimeout(() => {
      setToasts((currentToasts) =>
        currentToasts.filter((toast) => toast.id !== toastId),
      );
    }, 4200);
  };

  const dismissToast = (toastId: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== toastId),
    );
  };

  const toggleThemeMode = () => {
    setThemeMode((currentThemeMode) =>
      currentThemeMode === "dark" ? "light" : "dark",
    );
  };

  const handleImportAppImage = async () => {
    try {
      if (!canUseNativeAppImageCommands()) {
        addToast(
          "error",
          copy.toast.errorTitle,
          copy.toast.nativeRuntimeUnavailable,
        );
        return;
      }

      const selectedPath = await pickAppImagePath();

      if (!selectedPath) {
        return;
      }

      const inspectedApp = await inspectAppImage(selectedPath);
      const nextApps = upsertAppImage(apps, inspectedApp);

      setApps(nextApps);
      addToast(
        "success",
        copy.toast.importedTitle,
        copy.toast.importedDescription(inspectedApp.name),
      );
    } catch (error) {
      addToast(
        "error",
        copy.toast.errorTitle,
        getErrorMessage(error, copy.toast.nativeRuntimeUnavailable),
      );
    }
  };

  const handleLaunchAppImage = async (app: AppImageEntry) => {
    try {
      await launchAppImage(app.path);
      const updatedApp = {
        ...app,
        lastOpenedAt: new Date().toISOString(),
      };

      setApps((currentApps) => updateAppImage(currentApps, updatedApp));
      addToast(
        "success",
        copy.toast.openedTitle,
        copy.toast.openedDescription(app.name),
      );
    } catch (error) {
      addToast(
        "error",
        copy.toast.errorTitle,
        getErrorMessage(error, copy.toast.nativeRuntimeUnavailable),
      );
    }
  };

  const handleMakeExecutable = async (app: AppImageEntry) => {
    try {
      const updatedNativeApp = await makeAppImageExecutable(app.path);
      const updatedApp = {
        ...app,
        ...updatedNativeApp,
        id: app.id,
      };

      setApps((currentApps) => updateAppImage(currentApps, updatedApp));
      addToast(
        "success",
        copy.toast.permissionTitle,
        copy.toast.permissionDescription(app.name),
      );
    } catch (error) {
      addToast(
        "error",
        copy.toast.errorTitle,
        getErrorMessage(error, copy.toast.nativeRuntimeUnavailable),
      );
    }
  };

  const handleOpenFolder = async (app: AppImageEntry) => {
    try {
      await openAppImageFolder(app.path);
      addToast("info", copy.toast.folderTitle, app.path);
    } catch (error) {
      addToast(
        "error",
        copy.toast.errorTitle,
        getErrorMessage(error, copy.toast.nativeRuntimeUnavailable),
      );
    }
  };

  const handleRemoveAppImage = (app: AppImageEntry) => {
    setApps((currentApps) => removeAppImage(currentApps, app.id));
    addToast(
      "info",
      copy.toast.removedTitle,
      copy.toast.removedDescription(app.name),
    );
  };

  const handleSearchShortcut = (key: "Enter" | "Escape") => {
    if (key === "Escape") {
      setSearchTerm("");
      return;
    }

    if (filteredApps.length > 0) {
      handleLaunchAppImage(filteredApps[0]);
    }
  };

  return (
    <AppShell
      totalApps={apps.length}
      readyApps={readyApps}
      themeMode={themeMode}
      language={language}
      languages={languageOptions}
      copy={copy.sidebar}
      onThemeToggle={toggleThemeMode}
      onLanguageChange={setLanguage}
    >
      <header className="library-header">
        <div>
          <h1 className="library-header__title">{copy.library.title}</h1>
          <p className="library-header__subtitle">{libraryStatus}</p>
        </div>

        <div className="library-actions">
          <button
            className="button button--primary"
            type="button"
            onClick={handleImportAppImage}
          >
            {copy.library.importAppImage}
          </button>
        </div>
      </header>

      <LibraryToolbar
        copy={copy.library}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSearchShortcut={handleSearchShortcut}
      />

      {filteredApps.length > 0 ? (
        <section className="library-grid" aria-label="AppImage apps">
          {filteredApps.map((app) => (
            <AppCard
              app={app}
              copy={copy.card}
              key={app.id}
              onLaunch={handleLaunchAppImage}
              onMakeExecutable={handleMakeExecutable}
              onOpenFolder={handleOpenFolder}
              onRemove={handleRemoveAppImage}
            />
          ))}
        </section>
      ) : (
        <EmptyLibraryState
          copy={copy.library}
          isFiltered={apps.length > 0 && searchTerm.trim().length > 0}
          onImportAppImage={handleImportAppImage}
        />
      )}

      <ToastViewport messages={toasts} onDismiss={dismissToast} />
    </AppShell>
  );
}
