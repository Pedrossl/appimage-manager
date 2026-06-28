import type { LanguageCode, LanguageOption } from "../types/language";

export type AppTranslations = {
  sidebar: {
    brandLabel: string;
    navigationLabel: string;
    library: string;
    favorites: string;
    settings: string;
    darkMode: string;
    normalMode: string;
    language: string;
    readyToLaunch: string;
    registeredAppImages: string;
  };
  library: {
    title: string;
    importAppImage: string;
    searchPlaceholder: string;
    emptyTitle: string;
    emptyDescription: string;
    status: (totalApps: number, readyApps: number) => string;
  };
  card: {
    ready: string;
    needsPermission: string;
    open: string;
  };
};

export const languageOptions: LanguageOption[] = [
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
  { code: "es", label: "Español" },
];

export const translations: Record<LanguageCode, AppTranslations> = {
  en: {
    sidebar: {
      brandLabel: "Desktop launcher",
      navigationLabel: "Main navigation",
      library: "Library",
      favorites: "Favorites",
      settings: "Settings",
      darkMode: "Dark mode",
      normalMode: "Normal mode",
      language: "Language",
      readyToLaunch: "Ready to launch",
      registeredAppImages: "Registered AppImages",
    },
    library: {
      title: "AppImage Library",
      importAppImage: "Import AppImage",
      searchPlaceholder: "Search AppImages",
      emptyTitle: "No AppImages found",
      emptyDescription: "Try another search.",
      status: (totalApps, readyApps) =>
        `${totalApps} registered AppImages / ${readyApps} ready`,
    },
    card: {
      ready: "Ready",
      needsPermission: "Needs permission",
      open: "Open",
    },
  },
  pt: {
    sidebar: {
      brandLabel: "Launcher desktop",
      navigationLabel: "Navegação principal",
      library: "Biblioteca",
      favorites: "Favoritos",
      settings: "Configurações",
      darkMode: "Modo escuro",
      normalMode: "Modo normal",
      language: "Idioma",
      readyToLaunch: "Prontos para abrir",
      registeredAppImages: "AppImages cadastrados",
    },
    library: {
      title: "Biblioteca de AppImages",
      importAppImage: "Importar AppImage",
      searchPlaceholder: "Buscar AppImages",
      emptyTitle: "Nenhum AppImage encontrado",
      emptyDescription: "Tente outra busca.",
      status: (totalApps, readyApps) =>
        `${totalApps} AppImages cadastrados / ${readyApps} prontos`,
    },
    card: {
      ready: "Pronto",
      needsPermission: "Precisa de permissão",
      open: "Abrir",
    },
  },
  es: {
    sidebar: {
      brandLabel: "Launcher de escritorio",
      navigationLabel: "Navegación principal",
      library: "Biblioteca",
      favorites: "Favoritos",
      settings: "Ajustes",
      darkMode: "Modo oscuro",
      normalMode: "Modo normal",
      language: "Idioma",
      readyToLaunch: "Listos para abrir",
      registeredAppImages: "AppImages registrados",
    },
    library: {
      title: "Biblioteca de AppImages",
      importAppImage: "Importar AppImage",
      searchPlaceholder: "Buscar AppImages",
      emptyTitle: "No se encontraron AppImages",
      emptyDescription: "Prueba otra búsqueda.",
      status: (totalApps, readyApps) =>
        `${totalApps} AppImages registrados / ${readyApps} listos`,
    },
    card: {
      ready: "Listo",
      needsPermission: "Necesita permiso",
      open: "Abrir",
    },
  },
};
