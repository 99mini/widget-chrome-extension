import '@emotion/react';

import { type Colors, type Sizes } from './context/theme';

declare module '@emotion/react' {
  export interface Theme {
    colors: Colors;
    sizes: Sizes;
  }
}
