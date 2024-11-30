type IconPathType = 'widgets_24' | 'widgets_64';

export function getIconPath(type: IconPathType): string {
  return `./src/assets/${type}.svg`;
}
