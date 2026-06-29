import type { NativeAppImageError } from "./appImageCommands";

export type AppImageErrorMessages = Record<string, string>;

export function getErrorMessage(
  error: unknown,
  nativeRuntimeUnavailableMessage = "Esta acao so funciona dentro do app desktop Tauri.",
  appImageErrorMessages: AppImageErrorMessages = {},
) {
  if (error instanceof Error && error.message === "native_runtime_unavailable") {
    return nativeRuntimeUnavailableMessage;
  }

  if (isNativeAppImageError(error)) {
    const translatedMessage = appImageErrorMessages[error.code];

    if (translatedMessage) {
      return translatedMessage;
    }

    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Erro inesperado.";
}

function isNativeAppImageError(error: unknown): error is NativeAppImageError {
  return (
    !!error &&
    typeof error === "object" &&
    typeof (error as NativeAppImageError).message === "string"
  );
}
