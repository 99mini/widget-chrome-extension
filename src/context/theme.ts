import { Theme } from '@emotion/react';

const lightPrimaryColor = 'rgb(233,235,240)' as const;
const darkPrimaryColor = 'rgb(20,20,20)' as const;

const LightTheme: Theme = {
  colors: {
    primary: lightPrimaryColor,
    background: lightPrimaryColor,
    text: darkPrimaryColor,
  },
};

const DarkTheme: Theme = {
  colors: {
    primary: darkPrimaryColor,
    background: darkPrimaryColor,
    text: lightPrimaryColor,
  },
};

export { LightTheme, DarkTheme };
