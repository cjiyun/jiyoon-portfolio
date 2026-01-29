export const THEME_ORDER = ['light', 'dark'] as const;

export type ThemeMode = (typeof THEME_ORDER)[number];

export const getNextMode = (mode: ThemeMode) => {
  const idx = THEME_ORDER.indexOf(mode);
  return THEME_ORDER[(idx + 1) % THEME_ORDER.length];
};

export type ThemeModeContextValue = {
  mode: ThemeMode;
  nextMode: ThemeMode;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
};
