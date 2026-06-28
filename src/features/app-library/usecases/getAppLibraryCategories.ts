import type { AppImageEntry } from "../../../shared/types/appImage";

export function getAppLibraryCategories(apps: AppImageEntry[]) {
  const categories = apps.map((app) => app.category);

  return ["All", ...Array.from(new Set(categories)).sort()];
}
