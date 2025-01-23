import { describe, expect, it } from 'vitest';

import { hexWithAlpha, pickCss, rgbWithAlpha } from '@/utils/style';

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

describe('pickCss', () => {
  it('should return blue', () => {
    expect(pickCss('color: red; background-color: blue;', 'background-color')).toBe('blue');
  });
  it('should return blue: with white space', () => {
    expect(pickCss('color: red ; background-color : blue ;', 'background-color')).toBe('blue');
  });
});

// TODO: calcWidgetWidth, calcWidgetHeight
describe('calcWidgetWidth', () => {});
describe('calcWidgetHeight', () => {});
