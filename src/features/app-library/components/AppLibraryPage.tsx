import { useMemo, useState } from "react";
import { AppShell } from "../../../components/AppShell";
import { getInitialAppLibrary } from "../usecases/getInitialAppLibrary";
import { filterAppLibrary } from "../usecases/filterAppLibrary";
import { getAppLibraryCategories } from "../usecases/getAppLibraryCategories";
import { AppCard } from "./AppCard";
import { LibraryToolbar } from "./LibraryToolbar";

export function AppLibraryPage() {
  const apps = useMemo(() => getInitialAppLibrary(), []);
  const categories = useMemo(() => getAppLibraryCategories(apps), [apps]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredApps = useMemo(
    () => filterAppLibrary(apps, searchTerm, selectedCategory),
    [apps, searchTerm, selectedCategory],
  );

  const readyApps = apps.filter((app) => app.executable).length;

  return (
    <AppShell totalApps={apps.length} readyApps={readyApps}>
      <header className="library-header">
        <div>
          <h1 className="library-header__title">AppImage Library</h1>
          <p className="library-header__subtitle">
            Organize, inspect and launch portable Linux apps from one place.
          </p>
        </div>

        <div className="library-actions">
          <button className="button" type="button">
            Import folder
          </button>
          <button className="button button--primary" type="button">
            Add AppImage
          </button>
        </div>
      </header>

      <LibraryToolbar
        categories={categories}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        onSearchTermChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
      />

      {filteredApps.length > 0 ? (
        <section className="library-grid" aria-label="AppImage apps">
          {filteredApps.map((app) => (
            <AppCard app={app} key={app.id} />
          ))}
        </section>
      ) : (
        <section className="empty-state">
          <h2>No AppImages found</h2>
          <p>Try another search or category.</p>
        </section>
      )}
    </AppShell>
  );
}
