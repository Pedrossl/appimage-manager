import type { AppImageEntry } from "../../../shared/types/appImage";

export function filterAppLibrary(
  apps: AppImageEntry[],
  searchTerm: string,
  selectedCategory: string,
) {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  return apps.filter((app) => {
    const matchesCategory =
      selectedCategory === "All" || app.category === selectedCategory;
    const matchesSearch =
      normalizedSearch.length === 0 ||
      app.name.toLowerCase().includes(normalizedSearch) ||
      app.path.toLowerCase().includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });
}
