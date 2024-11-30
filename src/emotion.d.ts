import '@emotion/react';

import { type Colors } from './context/theme';

declare module '@emotion/react' {
  export interface Theme {
    colors: Colors;
  }
}
