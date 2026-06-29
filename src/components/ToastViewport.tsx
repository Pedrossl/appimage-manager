import type { ToastMessage } from "../shared/types/toast";

type ToastViewportProps = {
  messages: ToastMessage[];
  onDismiss: (toastId: string) => void;
};

export function ToastViewport({ messages, onDismiss }: ToastViewportProps) {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="toast-viewport" role="status" aria-live="polite">
      {messages.map((message) => (
        <div className={`toast toast--${message.kind}`} key={message.id}>
          <div>
            <strong className="toast__title">{message.title}</strong>
            {message.description ? (
              <p className="toast__description">{message.description}</p>
            ) : null}
          </div>
          <button
            className="toast__dismiss"
            type="button"
          onClick={() => onDismiss(message.id)}
          aria-label="Dismiss notification"
        >
            x
          </button>
        </div>
      ))}
    </div>
  );
}
