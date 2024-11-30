import { Theme } from '@emotion/react';

const lightPrimaryColor = 'rgb(233,235,240)' as const;
const darkPrimaryColor = 'rgb(20,20,20)' as const;

const rootDarkColor = 'rgb(33, 33, 33)' as const;
const rootLightColor = 'rgb(233, 235, 240)' as const;

const LightTheme: Theme = {
  colors: {
    primary: lightPrimaryColor,
    background: lightPrimaryColor,
    text: darkPrimaryColor,
    root: rootLightColor,
  },
};

const DarkTheme: Theme = {
  colors: {
    primary: darkPrimaryColor,
    background: darkPrimaryColor,
    text: lightPrimaryColor,
    root: rootDarkColor,
  },
};

const DefaultTheme: Theme = {
  colors: {
    primary: lightPrimaryColor,
    background: lightPrimaryColor,
    text: darkPrimaryColor,
    root: rootLightColor,
  },
};

export { DefaultTheme, LightTheme, DarkTheme };
