import '@emotion/react';

import { DefaultTheme } from './context/theme';

type Colors = (typeof DefaultTheme)['colors'];

declare module '@emotion/react' {
  export interface Theme {
    colors: Colors;
  }
}
