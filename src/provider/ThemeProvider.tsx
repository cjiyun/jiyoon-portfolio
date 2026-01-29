import * as React from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { themes } from '@/styles/theme';
import { useThemeMode } from '@/hooks/useThemeMode';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { mode } = useThemeMode();
  return <EmotionThemeProvider theme={themes[mode]}>{children}</EmotionThemeProvider>;
};
