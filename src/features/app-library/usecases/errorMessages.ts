import type { NativeAppImageError } from "./appImageCommands";

export function getErrorMessage(
  error: unknown,
  nativeRuntimeUnavailableMessage = "Esta acao so funciona dentro do app desktop Tauri.",
) {
  if (error instanceof Error && error.message === "native_runtime_unavailable") {
    return nativeRuntimeUnavailableMessage;
  }

  if (isNativeAppImageError(error)) {
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
