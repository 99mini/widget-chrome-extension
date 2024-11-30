import '@emotion/react';

import theme from './context/theme';

type Colors = (typeof theme)['colors'];

declare module '@emotion/react' {
  export interface Theme {
    colors: Colors;
  }
}
