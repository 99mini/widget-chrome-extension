import { describe, it, expect } from 'vitest';
import { rgbWithAlpha, hexWithAlpha } from '@/utils/style';

describe('rgbWithAlpha', () => {
  it('should return rgba(255, 255, 255, 0.5)', () => {
    expect(rgbWithAlpha('rgb(255, 255, 255)', 0.5)).toBe('rgba(255, 255, 255, 0.5)');
  });
  it('should return rgba(255, 255, 255, 1)', () => {
    expect(rgbWithAlpha('rgb(255, 255, 255)')).toBe('rgba(255, 255, 255, 1)');
  });
});

describe('hexWithAlpha', () => {
  it('should return rgba(255, 255, 255, 0.5)', () => {
    expect(hexWithAlpha('#ffffff', 0.5)).toBe('rgba(255, 255, 255, 0.5)');
  });
  it('should return rgba(255, 255, 255, 1)', () => {
    expect(hexWithAlpha('#ffffff')).toBe('rgba(255, 255, 255, 1)');
  });
});
