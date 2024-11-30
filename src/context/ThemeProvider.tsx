import React from 'react';

import { ThemeProvider as EmotionThemeProvider, ThemeProviderProps } from '@emotion/react';
import theme from './theme';

const ThemeProvider: React.FC<Omit<ThemeProviderProps, 'theme'>> = ({ children }) => {
  return <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>;
};

export default ThemeProvider;
