export type ThemeMode = 'light' | 'dark';

export type ThemeModeContextValue = {
  mode: ThemeMode;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
};
