import { describe, expect, it } from 'vitest';

import { i18n, increaseSuffixNumber } from '@/lib/utils/string';

describe('i18n', () => {
  it('should return each language', () => {
    const dict = { ko: '안녕', en: 'hello' };
    expect(i18n('ko', dict)).toBe('안녕');
    expect(i18n('en', dict)).toBe('hello');
  });
});

describe('increaseSuffixNumber', () => {
  it('should return hello-2', () => {
    expect(increaseSuffixNumber('hello-1')).toBe('hello-2');
  });
  it('should return hello-1', () => {
    expect(increaseSuffixNumber('hello')).toBe('hello-1');
  });
  it('should return hello-1-2', () => {
    expect(increaseSuffixNumber('hello-1-1')).toBe('hello-1-2');
  });
});
