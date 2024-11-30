import { Theme } from '@emotion/react';

type Colros = {
  primary: string;
  primaryHover: string;
  primaryActive: string;
  primaryDisabled: string;

  background: string;
  backgroundDisabled: string;
  backgroundHover: string;
  backgroundActive: string;

  text: string;
  root: string;
};

const lightPrimaryColor = 'rgba(233, 235, 240, 1)' as const;
const lightPrimaryHoverColor = 'rgba(233, 235, 240, 0.8)' as const;
const lightPrimaryActiveColor = 'rgba(233, 235, 240, 0.5)' as const;
const lightPrimaryDisabledColor = 'rgba(233, 235, 240, 0.3)' as const;

const darkPrimaryColor = 'rgba(20, 20, 20, 1)' as const;
const darkPrimaryHoverColor = 'rgba(20, 20, 20, 0.8)' as const;
const darkPrimaryActiveColor = 'rgba(20, 20, 20, 0.5)' as const;
const darkPrimaryDisabledColor = 'rgba(20, 20, 20, 0.3)' as const;

const rootDarkColor = 'rgba(33, 33, 33, 1)' as const;
const rootLightColor = 'rgba(255, 255, 255, 1)' as const;

const sizes = {
  widget: {
    icon: 60,
    rowGap: 36,
    columnGap: 12,

    textHeight: 16,
    textGap: 8,
  },
  header: `height: 80px; padding: 16px; box-sizing: border-box;`,
  footer: `height: 80px; padding: 16px; box-sizing: border-box;`,
} as const;

const DefaultTheme: Pick<Theme, 'sizes'> = {
  sizes,
};

const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    primary: lightPrimaryColor,
    primaryHover: lightPrimaryHoverColor,
    primaryActive: lightPrimaryActiveColor,
    primaryDisabled: lightPrimaryDisabledColor,

    background: lightPrimaryColor,
    backgroundHover: lightPrimaryHoverColor,
    backgroundActive: lightPrimaryActiveColor,
    backgroundDisabled: lightPrimaryDisabledColor,

    text: darkPrimaryColor,
    root: rootLightColor,
  },
};

const DarkTheme: Theme = {
  ...DefaultTheme,
  colors: {
    primary: darkPrimaryColor,
    primaryHover: darkPrimaryHoverColor,
    primaryActive: darkPrimaryActiveColor,
    primaryDisabled: darkPrimaryDisabledColor,

    background: darkPrimaryColor,
    backgroundHover: darkPrimaryHoverColor,
    backgroundActive: darkPrimaryActiveColor,
    backgroundDisabled: darkPrimaryDisabledColor,

    text: lightPrimaryColor,
    root: rootDarkColor,
  },
};

type Sizes = typeof sizes;

export { DefaultTheme, LightTheme, DarkTheme };
export type { Colros, Sizes };
