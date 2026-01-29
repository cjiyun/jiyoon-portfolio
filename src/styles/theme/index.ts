import type { Theme } from '@emotion/react';
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
