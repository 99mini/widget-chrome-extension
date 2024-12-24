import { describe, expect, it } from 'vitest';

import { urlProtocol } from '@/utils/common';

describe('Common utils', () => {
  it('should return https url', () => {
    const url = urlProtocol('www.google.com');

    expect(url).toBe('https://www.google.com');
  });

  it('should return http url', () => {
    const url = urlProtocol('https://www.google.com', 'http');

    expect(url).toBe('http://www.google.com');
  });
});
