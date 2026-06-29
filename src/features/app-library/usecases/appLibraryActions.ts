import type { AppImageEntry } from "../../../shared/types/appImage";

export function upsertAppImage(
  apps: AppImageEntry[],
  importedApp: Omit<AppImageEntry, "importedAt" | "lastOpenedAt">,
) {
  const existingApp = apps.find((app) => app.path === importedApp.path);
  const stableId = `${importedApp.id}-${createPathHash(importedApp.path)}`;
  const nextApp: AppImageEntry = {
    ...importedApp,
    id: existingApp?.id ?? stableId,
    importedAt: existingApp?.importedAt ?? new Date().toISOString(),
    lastOpenedAt: existingApp?.lastOpenedAt,
  };

  if (existingApp) {
    return apps.map((app) => (app.path === importedApp.path ? nextApp : app));
  }

  return [nextApp, ...apps];
}

export function removeAppImage(apps: AppImageEntry[], appId: string) {
  return apps.filter((app) => app.id !== appId);
}

export function updateAppImage(apps: AppImageEntry[], updatedApp: AppImageEntry) {
  return apps.map((app) => (app.id === updatedApp.id ? updatedApp : app));
}

function createPathHash(path: string) {
  let hash = 0;

  for (let index = 0; index < path.length; index += 1) {
    hash = (hash << 5) - hash + path.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash).toString(36);
}
