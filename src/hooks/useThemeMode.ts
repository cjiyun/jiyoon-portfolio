import * as React from 'react';
import { ThemeModeContext } from '@/provider/ThemeModeProvider';

export const useThemeMode = () => {
  const ctx = React.useContext(ThemeModeContext);
  if (!ctx) throw new Error('useThemeMode must be used within ThemeModeProvider');
  return ctx;
};
