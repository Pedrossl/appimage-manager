import type { AppImageEntry } from "../../../shared/types/appImage";

export function filterAppLibrary(
  apps: AppImageEntry[],
  searchTerm: string,
) {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  return apps.filter((app) => {
    return (
      normalizedSearch.length === 0 ||
      app.name.toLowerCase().includes(normalizedSearch) ||
      app.path.toLowerCase().includes(normalizedSearch)
    );
  });
}
