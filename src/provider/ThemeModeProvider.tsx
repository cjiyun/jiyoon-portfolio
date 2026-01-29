import * as React from 'react';
import type { ThemeModeContextValue } from '@/types/theme';
import { THEME_ORDER, getNextMode, type ThemeMode } from '@/types/theme';

const ThemeModeContext = React.createContext<ThemeModeContextValue | null>(null);

const STORAGE_KEY = 'portfolio-theme-mode';

export const ThemeModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = React.useState<ThemeMode>(THEME_ORDER[0]);

  React.useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (saved && THEME_ORDER.includes(saved)) setMode(saved);
  }, []);

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const toggleMode = React.useCallback(() => {
    setMode(prev => getNextMode(prev));
  }, []);

  const value = React.useMemo(
    () => ({
      mode,
      nextMode: getNextMode(mode),
      toggleMode,
      setMode,
    }),
    [mode, toggleMode]
  );

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
};

export { ThemeModeContext };
