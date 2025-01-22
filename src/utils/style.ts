import { Theme } from '@emotion/react';

import { SpanType } from '@/types/Widget';

/**
 * @description Convert rgb color to hex color
 * @param rgb
 * @param opacity
 * @returns rgb = rgb(255, 255, 255), opacity = 0.5 => rgba(255, 255, 255, 0.5)
 * @example
 * ```ts
 * rgbWithAlpha('rgb(255, 255, 255)', 0.5); // => rgba(255, 255, 255, 0.5)
 * ```
 */
export function rgbWithAlpha(rgb: string, opacity = 1) {
  return `rgba(${rgb.slice(4, -1)}, ${opacity})`;
}

/**
 *
 * @description Convert hex color to rgba color
 * @param hex
 * @param opacity
 * @returns hex = #ffffff, opacity = 0.5 => rgba(255, 255, 255, 0.5)
 * @example
 * ```ts
 * hexWithAlpha('#ffffff', 0.5); // => rgba(255, 255, 255, 0.5)
 * ```
 */
export function hexWithAlpha(hex: string, opacity = 1) {
  const rgb = hex.match(/\w\w/g)?.map((x) => parseInt(x, 16));
  return `rgba(${rgb?.join(', ')}, ${opacity})`;
}

/**
 * @description Pick css value from css string
 * @param value
 * @param key
 * @returns value of key
 * @example
 * ```ts
 * pickCss('color: red; background-color: blue;', 'background-color'); // => blue
 * pickCss('color: red ; background-color : blue ;', 'background-color'); // => blue
 * ```
 */
export function pickCss(value: string, key: string): string | null {
  const reg = new RegExp(`\\s*${key}\\s*:\\s*([^;]+);`);
  const match = value.match(reg);

  return match ? match[1].trim() : null;
}

/**
 * @description Calculate widget width
 * @param column
 * @param theme
 * @returns widget width
 * @example
 * ```ts
 * calcWidgetWidth(4, theme); // => 264px
 * ```
 */
export function calcWidgetWidth(column: SpanType['column'] | undefined, theme: Theme) {
  if (column === 4) {
    return `${theme.sizes.widget.icon * 4 + theme.sizes.widget.rowGap * 3}px`;
  }
  if (column === 2) {
    return `${theme.sizes.widget.icon * 2 + theme.sizes.widget.rowGap}px`;
  }
  return `${theme.sizes.widget.icon}px`;
}

/**
 * @description Calculate widget height
 * @param row
 * @param theme
 * @returns widget height
 * @example
 * ```ts
 * calcWidgetHeight(4, theme); // => 264px
 * ```
 */
export function calcWidgetHeight(row: SpanType['row'] | undefined, theme: Theme) {
  if (row === 4) {
    return `${theme.sizes.widget.icon * 4 + theme.sizes.widget.rowGap * 3 + theme.sizes.widget.textHeight + theme.sizes.widget.textGap}px`;
  }
  if (row === 2) {
    return `${theme.sizes.widget.icon * 2 + theme.sizes.widget.rowGap + theme.sizes.widget.textHeight + theme.sizes.widget.textGap}px`;
  }
  return `${theme.sizes.widget.icon + theme.sizes.widget.textHeight + theme.sizes.widget.textGap}px`;
}
