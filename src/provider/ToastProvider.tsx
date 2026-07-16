import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from 'react';

export type ToastKind = 'success' | 'error' | 'info' | 'warning';

export type ToastItem = {
  id: string;
  kind: ToastKind;
  message: string;
};

type ToastContextType = {
  toasts: ToastItem[];
  push: (payload: { kind: ToastKind; message: string; durationMs?: number }) => void;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

const MAX_TOASTS = 5;
const createToastId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const push = useCallback(
    ({
      kind,
      message,
      durationMs = 2600,
    }: {
      kind: ToastKind;
      message: string;
      durationMs?: number;
    }) => {
      setToasts(prev => {
        // 중복 방지
        if (prev.some(t => t.message === message)) return prev;
        const id = createToastId();
        window.setTimeout(() => dismiss(id), durationMs);
        return [...prev, { id, kind, message }].slice(-MAX_TOASTS);
      });
    },
    [dismiss]
  );

  const value = useMemo(() => ({ toasts, push, dismiss }), [toasts, push, dismiss]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};
