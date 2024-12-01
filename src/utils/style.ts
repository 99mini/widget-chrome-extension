/**
 *
 * @param rgb
 * @param opacity
 * @returns rgb = rgb(255, 255, 255), opacity = 0.5 => rgba(255, 255, 255, 0.5)
 */
export function rgbWithAlpha(rgb: string, opacity = 1) {
  return `rgba(${rgb.slice(4, -1)}, ${opacity})`;
}

/**
 *
 * @param hex
 * @param opacity
 * @returns hex = #ffffff, opacity = 0.5 => rgba(255, 255, 255, 0.5)
 */
export function hexWithAlpha(hex: string, opacity = 1) {
  const rgb = hex.match(/\w\w/g)?.map((x) => parseInt(x, 16));
  return `rgba(${rgb?.join(', ')}, ${opacity})`;
}
