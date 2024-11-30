import { describe, it, expect } from 'vitest';
import { getIconPath } from '@/utils/icon';

describe('Icon utils', () => {
  it('should return correct path for 24px icon', () => {
    const path = getIconPath('widgets_24');

    expect(path).toBe('./src/assets/widgets_24.svg');
  });

  it('should return correct path for 64px icon', () => {
    const path = getIconPath('widgets_64');

    expect(path).toBe('./src/assets/widgets_64.svg');
  });
});
