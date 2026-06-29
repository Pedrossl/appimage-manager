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
    emptyAction: string;
    status: (totalApps: number, readyApps: number) => string;
  };
  card: {
    ready: string;
    needsPermission: string;
    open: string;
    fixPermission: string;
    openFolder: string;
    remove: string;
    pathLabel: string;
  };
  toast: {
    importedTitle: string;
    importedDescription: (appName: string) => string;
    openedTitle: string;
    openedDescription: (appName: string) => string;
    permissionTitle: string;
    permissionDescription: (appName: string) => string;
    removedTitle: string;
    removedDescription: (appName: string) => string;
    folderTitle: string;
    errorTitle: string;
    nativeRuntimeUnavailable: string;
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
      emptyDescription: "Import your first AppImage to start building the library.",
      emptyAction: "Import AppImage",
      status: (totalApps, readyApps) =>
        `${totalApps} registered AppImages / ${readyApps} ready`,
    },
    card: {
      ready: "Ready",
      needsPermission: "Needs permission",
      open: "Open",
      fixPermission: "Fix permission",
      openFolder: "Open folder",
      remove: "Remove",
      pathLabel: "Path",
    },
    toast: {
      importedTitle: "AppImage imported",
      importedDescription: (appName) => `${appName} was added to the library.`,
      openedTitle: "AppImage opened",
      openedDescription: (appName) => `${appName} was launched.`,
      permissionTitle: "Permission fixed",
      permissionDescription: (appName) => `${appName} is ready to launch.`,
      removedTitle: "AppImage removed",
      removedDescription: (appName) => `${appName} was removed from the library.`,
      folderTitle: "Folder opened",
      errorTitle: "Something went wrong",
      nativeRuntimeUnavailable:
        "This action only works inside the Tauri desktop app. Run npm run tauri dev to import and launch AppImages.",
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
      emptyDescription: "Importe seu primeiro AppImage para comecar a biblioteca.",
      emptyAction: "Importar AppImage",
      status: (totalApps, readyApps) =>
        `${totalApps} AppImages cadastrados / ${readyApps} prontos`,
    },
    card: {
      ready: "Pronto",
      needsPermission: "Precisa de permissão",
      open: "Abrir",
      fixPermission: "Corrigir permissão",
      openFolder: "Abrir pasta",
      remove: "Remover",
      pathLabel: "Caminho",
    },
    toast: {
      importedTitle: "AppImage importado",
      importedDescription: (appName) => `${appName} foi adicionado a biblioteca.`,
      openedTitle: "AppImage aberto",
      openedDescription: (appName) => `${appName} foi iniciado.`,
      permissionTitle: "Permissão corrigida",
      permissionDescription: (appName) => `${appName} esta pronto para abrir.`,
      removedTitle: "AppImage removido",
      removedDescription: (appName) => `${appName} foi removido da biblioteca.`,
      folderTitle: "Pasta aberta",
      errorTitle: "Algo deu errado",
      nativeRuntimeUnavailable:
        "Esta acao so funciona dentro do app desktop Tauri. Rode npm run tauri dev para importar e abrir AppImages.",
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
      emptyDescription: "Importa tu primer AppImage para empezar la biblioteca.",
      emptyAction: "Importar AppImage",
      status: (totalApps, readyApps) =>
        `${totalApps} AppImages registrados / ${readyApps} listos`,
    },
    card: {
      ready: "Listo",
      needsPermission: "Necesita permiso",
      open: "Abrir",
      fixPermission: "Corregir permiso",
      openFolder: "Abrir carpeta",
      remove: "Eliminar",
      pathLabel: "Ruta",
    },
    toast: {
      importedTitle: "AppImage importado",
      importedDescription: (appName) => `${appName} fue agregado a la biblioteca.`,
      openedTitle: "AppImage abierto",
      openedDescription: (appName) => `${appName} fue iniciado.`,
      permissionTitle: "Permiso corregido",
      permissionDescription: (appName) => `${appName} esta listo para abrir.`,
      removedTitle: "AppImage eliminado",
      removedDescription: (appName) => `${appName} fue eliminado de la biblioteca.`,
      folderTitle: "Carpeta abierta",
      errorTitle: "Algo salió mal",
      nativeRuntimeUnavailable:
        "Esta accion solo funciona dentro de la app desktop Tauri. Ejecuta npm run tauri dev para importar y abrir AppImages.",
    },
  },
};
