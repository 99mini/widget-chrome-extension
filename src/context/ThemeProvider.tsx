import React from 'react';

import useThemeStore from '@/hook/useTheme';
import { ThemeProvider as EmotionThemeProvider, ThemeProviderProps } from '@emotion/react';
import { DarkTheme, LightTheme } from './theme';

const ThemeProvider: React.FC<Omit<ThemeProviderProps, 'theme'>> = ({ children }) => {
  const { mode } = useThemeStore();

  return <EmotionThemeProvider theme={mode === 'dark' ? DarkTheme : LightTheme}>{children}</EmotionThemeProvider>;
};

export default ThemeProvider;
