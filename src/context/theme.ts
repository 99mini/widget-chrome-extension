import { Theme } from '@emotion/react';

import { rgbWithAlpha } from '@/utils/style';

const lightPrimaryColor = 'rgb(150, 148, 255)' as const;

const lightPrimaryColorPalette = {
  100: lightPrimaryColor,
  200: 'rgb(131, 129, 240)',
  300: 'rgb(112, 110, 225)',
  400: 'rgb(93, 91, 210)',
  500: 'rgb(74, 72, 195)',
  600: 'rgb(55, 53, 180)',
  700: 'rgb(36, 34, 165)',
  800: 'rgb(17, 15, 150)',
  900: 'rgb(0, 0, 135)',
} as const;

const lightBackgroundColor = 'rgb(233, 235, 240)' as const;
const lightBackgroundColorPalette = {
  100: lightBackgroundColor,
  200: 'rgb(214, 216, 221)',
  300: 'rgb(195, 197, 202)',
  400: 'rgb(176, 178, 183)',
  500: 'rgb(157, 159, 164)',
  600: 'rgb(138, 140, 145)',
  700: 'rgb(119, 121, 126)',
  800: 'rgb(100, 102, 107)',
  900: 'rgb(81, 83, 88)',
} as const;

const darkPrimaryColor = 'rgb(61, 59, 243)' as const;
const darkPrimaryColorPalette = {
  100: darkPrimaryColor,
  200: 'rgb(39, 39, 39)',
  300: 'rgb(58, 58, 58)',
  400: 'rgb(77, 77, 77)',
  500: 'rgb(96, 96, 96)',
  600: 'rgb(115, 115, 115)',
  700: 'rgb(134, 134, 134)',
  800: 'rgb(153, 153, 153)',
  900: 'rgb(172, 172, 172)',
} as const;

const darkBackgroundColor = 'rgb(20, 20, 20)' as const;
const darkBackgroundColorPalette = {
  100: darkBackgroundColor,
  200: 'rgb(39, 39, 39)',
  300: 'rgb(58, 58, 58)',
  400: 'rgb(77, 77, 77)',
  500: 'rgb(96, 96, 96)',
  600: 'rgb(115, 115, 115)',
  700: 'rgb(134, 134, 134)',
  800: 'rgb(153, 153, 153)',
  900: 'rgb(172, 172, 172)',
} as const;

const lightContrast = darkBackgroundColorPalette;
const darkContrast = lightBackgroundColorPalette;

const rootDarkColor = 'rgb(33, 33, 33)' as const;
const rootLightColor = 'rgb(255, 255, 255)' as const;

const defaultColors = {
  error: 'rgb(255, 51, 51)',
  warning: 'rgb(255, 204, 0)',
} as const;

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

const DefaultTheme = {
  sizes,
  colors: {
    ...defaultColors,
    errorHover: rgbWithAlpha(defaultColors.error, 0.8),
    errorActive: rgbWithAlpha(defaultColors.error, 0.5),
    errorDisabled: rgbWithAlpha(defaultColors.error, 0.3),

    warningHover: rgbWithAlpha(defaultColors.warning, 0.8),
    warningActive: rgbWithAlpha(defaultColors.warning, 0.5),
    warningDisabled: rgbWithAlpha(defaultColors.warning, 0.3),

    black: 'rgb(20, 20, 20)',
    white: 'rgb(233, 235, 240)',
  },
} as const;

const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,

    root: rootLightColor,

    primary: lightPrimaryColor,
    primaryPalette: lightPrimaryColorPalette,
    primaryHover: rgbWithAlpha(lightPrimaryColor, 0.8),
    primaryActive: rgbWithAlpha(lightPrimaryColor, 0.5),
    primaryDisabled: rgbWithAlpha(lightPrimaryColor, 0.3),

    background: lightBackgroundColor,
    backgroundPalette: lightBackgroundColorPalette,
    backgroundHover: rgbWithAlpha(lightBackgroundColor, 0.8),
    backgroundActive: rgbWithAlpha(lightBackgroundColor, 0.5),
    backgroundDisabled: rgbWithAlpha(lightBackgroundColor, 0.3),

    contrast: lightContrast[100],

    text: lightContrast[100],
    textActive: lightContrast[200],
    textHover: lightContrast[300],
    textDisabled: lightContrast[400],
  },
};

const DarkTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,

    root: rootDarkColor,

    primary: darkPrimaryColor,
    primaryPalette: darkPrimaryColorPalette,
    primaryHover: rgbWithAlpha(darkPrimaryColor, 0.8),
    primaryActive: rgbWithAlpha(darkPrimaryColor, 0.5),
    primaryDisabled: rgbWithAlpha(darkPrimaryColor, 0.3),

    background: darkBackgroundColor,
    backgroundPalette: darkBackgroundColorPalette,
    backgroundHover: rgbWithAlpha(darkBackgroundColor, 0.8),
    backgroundActive: rgbWithAlpha(darkBackgroundColor, 0.5),
    backgroundDisabled: rgbWithAlpha(darkBackgroundColor, 0.3),

    contrast: darkContrast[100],

    text: darkContrast[100],
    textActive: darkContrast[200],
    textHover: darkContrast[300],
    textDisabled: darkContrast[400],
  },
};

type Sizes = typeof sizes;

type Colors = (typeof DefaultTheme)['colors'] & {
  /* root */
  root: typeof rootLightColor | typeof rootDarkColor;

  /* primary */
  primary: typeof lightPrimaryColor | typeof darkPrimaryColor;
  primaryPalette: typeof lightPrimaryColorPalette | typeof darkPrimaryColorPalette;

  primaryHover: string;
  primaryActive: string;
  primaryDisabled: string;

  /* background */
  background: typeof lightBackgroundColor | typeof darkBackgroundColor;
  backgroundPalette: typeof lightBackgroundColorPalette | typeof darkBackgroundColorPalette;

  backgroundHover: string;
  backgroundActive: string;
  backgroundDisabled: string;

  /* contrast */
  contrast: (typeof lightContrast)[keyof typeof lightContrast] | (typeof darkContrast)[keyof typeof darkContrast];

  /* text */
  text: (typeof lightContrast)[keyof typeof lightContrast] | (typeof darkContrast)[keyof typeof darkContrast];
  textHover: (typeof lightContrast)[keyof typeof lightContrast] | (typeof darkContrast)[keyof typeof darkContrast];
  textActive: (typeof lightContrast)[keyof typeof lightContrast] | (typeof darkContrast)[keyof typeof darkContrast];
  textDisabled: (typeof lightContrast)[keyof typeof lightContrast] | (typeof darkContrast)[keyof typeof darkContrast];
};

export { DefaultTheme, LightTheme, DarkTheme };
export type { Colors, Sizes };
