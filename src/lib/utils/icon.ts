type IconPathType = 'widgets_24' | 'widgets_64' | 'widgets_light_24' | 'widgets_light_64';

export function getIconPath(type: IconPathType): string {
  if (chrome !== undefined && chrome.runtime !== undefined) {
    return chrome.runtime.getURL(`assets/${type}.svg`);
  }

  return `assets/${type}.svg`;
}
