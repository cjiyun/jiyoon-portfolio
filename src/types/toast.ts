export type ToastType = 'success' | 'error';

export type ToastPayload = {
  type: ToastType;
  message: string;
  durationMs?: number;
};

export type ToastItem = {
  id: string;
  type: ToastType;
  message: string;
};

export type ToastContextValue = {
  toasts: ToastItem[];
  push: (payload: ToastPayload) => void;
  dismiss: (id: string) => void;
};
