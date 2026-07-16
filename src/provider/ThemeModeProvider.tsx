import * as React from 'react';
import type { ThemeModeContextValue, ThemeMode } from '@/types/theme';
import { THEME_ORDER, getNextMode, getSystemDefaultMode } from '@/types/theme';

const ThemeModeContext = React.createContext<ThemeModeContextValue | null>(null);

const STORAGE_KEY = 'portfolio-theme-mode';

const isValidThemeMode = (value: unknown): value is ThemeMode => {
  return typeof value === 'string' && (THEME_ORDER as readonly string[]).includes(value);
};

type ThemeState = {
  mode: ThemeMode;
  hasUserPreference: boolean;
};

const getInitialThemeState = (): ThemeState => {
  if (typeof window === 'undefined') {
    return { mode: THEME_ORDER[0], hasUserPreference: false };
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (isValidThemeMode(saved)) {
    return { mode: saved, hasUserPreference: true };
  }

  return { mode: getSystemDefaultMode(), hasUserPreference: false };
};

export const ThemeModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = React.useState<ThemeState>(() => getInitialThemeState());

  // 사용자가 선택한 경우에만 localStorage 저장
  React.useEffect(() => {
    if (!state.hasUserPreference) return;
    window.localStorage.setItem(STORAGE_KEY, state.mode);
  }, [state.hasUserPreference, state.mode]);

  // 사용자가 아직 선택 안 했을 때만 시스템 설정 변경을 따라감
  React.useEffect(() => {
    if (state.hasUserPreference) return;
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!mql) return;

    const onChange = (e: MediaQueryListEvent) => {
      setState(prev => {
        if (prev.hasUserPreference) return prev;
        return { ...prev, mode: (e.matches ? 'dark' : 'light') as ThemeMode };
      });
    };

    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [state.hasUserPreference]);

  const setMode = React.useCallback((mode: ThemeMode) => {
    setState({ mode, hasUserPreference: true });
  }, []);

  const toggleMode = React.useCallback(() => {
    setState(prev => ({
      mode: getNextMode(prev.mode),
      hasUserPreference: true,
    }));
  }, []);

  const value = React.useMemo<ThemeModeContextValue>(() => {
    return {
      mode: state.mode,
      nextMode: getNextMode(state.mode),
      toggleMode,
      setMode,
    };
  }, [state.mode, toggleMode, setMode]);

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
};

export { ThemeModeContext };
