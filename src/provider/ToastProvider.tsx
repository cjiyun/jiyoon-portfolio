import { type ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import { ToastContext } from '@/provider/ToastContext';
import type { ToastItem, ToastPayload, ToastContextValue } from '@/types/toast';

const MAX_TOASTS = 5;
const DEFAULT_TOAST_DURATION_MS = 2600;

const createToastId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timerIdsRef = useRef<Record<string, number>>({});

  const dismiss = useCallback((id: string) => {
    const timerId = timerIdsRef.current[id];

    if (timerId) {
      window.clearTimeout(timerId);
      delete timerIdsRef.current[id];
    }

    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const push = useCallback(
    ({ type, message, durationMs = DEFAULT_TOAST_DURATION_MS }: ToastPayload) => {
      setToasts(prev => {
        if (prev.some(toast => toast.message === message)) {
          return prev;
        }

        const id = createToastId();

        timerIdsRef.current[id] = window.setTimeout(() => {
          dismiss(id);
        }, durationMs);

        return [...prev, { id, type, message }].slice(-MAX_TOASTS);
      });
    },
    [dismiss]
  );

  const value = useMemo<ToastContextValue>(() => {
    return {
      toasts,
      push,
      dismiss,
    };
  }, [toasts, push, dismiss]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};
