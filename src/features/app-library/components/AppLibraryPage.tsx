import { useMemo, useState } from "react";
import { AppShell } from "../../../components/AppShell";
import { getInitialAppLibrary } from "../usecases/getInitialAppLibrary";
import { filterAppLibrary } from "../usecases/filterAppLibrary";
import { AppCard } from "./AppCard";
import { LibraryToolbar } from "./LibraryToolbar";
import { languageOptions, translations } from "../../../shared/i18n/translations";
import type { LanguageCode } from "../../../shared/types/language";
import type { ThemeMode } from "../../../shared/types/theme";

export function AppLibraryPage() {
  const apps = useMemo(() => getInitialAppLibrary(), []);
  const [searchTerm, setSearchTerm] = useState("");
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const [language, setLanguage] = useState<LanguageCode>("en");
  const copy = translations[language];

  const filteredApps = useMemo(
    () => filterAppLibrary(apps, searchTerm),
    [apps, searchTerm],
  );

  const readyApps = apps.filter((app) => app.executable).length;
  const libraryStatus = copy.library.status(apps.length, readyApps);
  const toggleThemeMode = () => {
    setThemeMode((currentThemeMode) =>
      currentThemeMode === "dark" ? "light" : "dark",
    );
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
          <button className="button button--primary" type="button">
            {copy.library.importAppImage}
          </button>
        </div>
      </header>

      <LibraryToolbar
        copy={copy.library}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />

      {filteredApps.length > 0 ? (
        <section className="library-grid" aria-label="AppImage apps">
          {filteredApps.map((app) => (
            <AppCard app={app} copy={copy.card} key={app.id} />
          ))}
        </section>
      ) : (
        <section className="empty-state">
          <h2>{copy.library.emptyTitle}</h2>
          <p>{copy.library.emptyDescription}</p>
        </section>
      )}
    </AppShell>
  );
}
