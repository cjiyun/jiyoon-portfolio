import * as React from 'react';
import type { ThemeModeContextValue, ThemeMode } from '@/types/theme';
import { THEME_ORDER, getNextMode } from '@/types/theme';

const ThemeModeContext = React.createContext<ThemeModeContextValue | null>(null);

const STORAGE_KEY = 'portfolio-theme-mode';

const isValidThemeMode = (value: unknown): value is ThemeMode => {
  return typeof value === 'string' && (THEME_ORDER as readonly string[]).includes(value);
};

const getInitialMode = (): ThemeMode => {
  if (typeof window === 'undefined') return THEME_ORDER[0];

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (isValidThemeMode(saved)) return saved;

  return THEME_ORDER[0];
};

export const ThemeModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = React.useState<ThemeMode>(() => getInitialMode());

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const toggleMode = React.useCallback(() => {
    setMode(prev => getNextMode(prev));
  }, []);

  const nextMode = React.useMemo(() => getNextMode(mode), [mode]);

  const value = React.useMemo(
    () => ({
      mode,
      nextMode,
      toggleMode,
      setMode,
    }),
    [mode, nextMode, toggleMode]
  );

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
};

export { ThemeModeContext };
