export type ToastKind = "success" | "error" | "info";

export type ToastMessage = {
  id: string;
  kind: ToastKind;
  title: string;
  description?: string;
};
