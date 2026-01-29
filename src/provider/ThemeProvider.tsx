import * as React from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { lightTheme, darkTheme } from '@/styles/theme';
import { useThemeMode } from '@/hooks/useThemeMode'; // 프로젝트에 있는 훅으로 교체

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { mode } = useThemeMode();

  const appliedTheme = mode === 'dark' ? darkTheme : lightTheme;

  return <EmotionThemeProvider theme={appliedTheme}>{children}</EmotionThemeProvider>;
};
