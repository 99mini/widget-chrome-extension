import { describe, it, expect } from 'vitest';
import { getIconPath } from '@/utils/icon';

describe('Icon utils', () => {
  it('should return correct path for 24px icon', () => {
    const path = getIconPath('widgets_24');

    expect(path).toBe('assets/widgets_24.svg');
  });

  it('should return chrome.runtime.getURL path for 24px icon', () => {
    global.chrome = {
      runtime: {
        getURL: (path: string) => `chrome-extension://test/${path}`,
      },
    } as never;

    const path = getIconPath('widgets_24');

    expect(path).toBe('chrome-extension://test/assets/widgets_24.svg');
  });
});
