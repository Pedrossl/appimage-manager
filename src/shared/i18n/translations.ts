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
    appImageErrors: Record<string, string>;
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
      appImageErrors: {
        empty_path: "Select an AppImage file before continuing.",
        invalid_name: "The selected AppImage name is invalid.",
        invalid_extension: "Select a file ending in .AppImage.",
        file_not_found: "This AppImage no longer exists at the saved path.",
        metadata_error: "Could not read this AppImage metadata.",
        not_a_file: "The selected path is not a file.",
        invalid_appimage_signature:
          "This file is not a valid AppImage. It may be corrupted or only renamed with the .AppImage extension.",
        read_permission_denied:
          "The app does not have permission to read this AppImage.",
        read_error: "Could not read this AppImage.",
        not_executable:
          "This AppImage needs execution permission before it can be opened.",
        launch_error:
          "Could not launch this AppImage. Check if it is compatible with your Linux installation.",
        permission_error:
          "Could not change this AppImage permission. Check the file owner and folder permissions.",
        folder_not_found: "Could not find the folder for this AppImage.",
        open_folder_error: "Could not open this AppImage folder.",
        unsupported_platform:
          "This action is only supported on compatible desktop systems.",
      },
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
      appImageErrors: {
        empty_path: "Selecione um arquivo AppImage antes de continuar.",
        invalid_name: "O nome do AppImage selecionado é inválido.",
        invalid_extension: "Selecione um arquivo terminado em .AppImage.",
        file_not_found: "Este AppImage não existe mais no caminho salvo.",
        metadata_error: "Não foi possível ler os metadados deste AppImage.",
        not_a_file: "O caminho selecionado não é um arquivo.",
        invalid_appimage_signature:
          "Este arquivo não é um AppImage válido. Ele pode estar corrompido ou apenas ter sido renomeado com a extensão .AppImage.",
        read_permission_denied:
          "O app não tem permissão para ler este AppImage.",
        read_error: "Não foi possível ler este AppImage.",
        not_executable:
          "Este AppImage precisa de permissão de execução antes de abrir.",
        launch_error:
          "Não foi possível iniciar este AppImage. Verifique se ele é compatível com o seu Linux.",
        permission_error:
          "Não foi possível alterar a permissão deste AppImage. Verifique o dono do arquivo e as permissões da pasta.",
        folder_not_found: "Não foi possível encontrar a pasta deste AppImage.",
        open_folder_error: "Não foi possível abrir a pasta deste AppImage.",
        unsupported_platform:
          "Esta ação só é suportada em sistemas desktop compatíveis.",
      },
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
      appImageErrors: {
        empty_path: "Selecciona un archivo AppImage antes de continuar.",
        invalid_name: "El nombre del AppImage seleccionado no es válido.",
        invalid_extension: "Selecciona un archivo terminado en .AppImage.",
        file_not_found: "Este AppImage ya no existe en la ruta guardada.",
        metadata_error: "No se pudieron leer los metadatos de este AppImage.",
        not_a_file: "La ruta seleccionada no es un archivo.",
        invalid_appimage_signature:
          "Este archivo no es un AppImage válido. Puede estar dañado o solo haber sido renombrado con la extensión .AppImage.",
        read_permission_denied:
          "La app no tiene permiso para leer este AppImage.",
        read_error: "No se pudo leer este AppImage.",
        not_executable:
          "Este AppImage necesita permiso de ejecución antes de abrirse.",
        launch_error:
          "No se pudo iniciar este AppImage. Verifica si es compatible con tu Linux.",
        permission_error:
          "No se pudo cambiar el permiso de este AppImage. Verifica el propietario del archivo y los permisos de la carpeta.",
        folder_not_found: "No se pudo encontrar la carpeta de este AppImage.",
        open_folder_error: "No se pudo abrir la carpeta de este AppImage.",
        unsupported_platform:
          "Esta acción solo es compatible con sistemas desktop compatibles.",
      },
    },
  },
};
