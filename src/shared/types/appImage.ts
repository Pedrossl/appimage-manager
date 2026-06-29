export type AppImageEntry = {
  id: string;
  name: string;
  version: string;
  path: string;
  executable: boolean;
  importedAt: string;
  lastOpenedAt?: string;
};
