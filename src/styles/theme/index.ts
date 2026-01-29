import type { Theme } from '@emotion/react';
import type { ThemeMode } from '@/types/theme';
import { lightColors, darkColors } from './colors';
import { fonts } from './fonts';
import { shadows } from '@/styles/theme/shadows';

export const lightTheme: Theme = {
  colors: lightColors,
  fonts,
  shadows,
};

export const darkTheme: Theme = {
  colors: darkColors,
  fonts,
  shadows,
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const satisfies Record<ThemeMode, Theme>;
