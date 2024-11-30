import { Theme } from '@emotion/react';

import { mode, primaryColor } from '@/hook/useTheme';

const theme: Theme = {
  colors: {
    primary: primaryColor ?? '#1890ff',
    background: mode === 'dark' ? '#141414' : mode === 'light' ? '#f0f2f5' : primaryColor,
    text: mode === 'dark' ? '#f0f2f5' : mode === 'light' ? '#141414' : '#f0f2f5',
  },
};

export default theme;
