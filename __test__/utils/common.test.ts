import { describe, expect, it } from 'vitest';

import { urlProtocol, validateEmail } from '@/utils/common';

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

describe('validateEmail', () => {
  it('should return true if email is valid', () => {
    const validEmail = 'example@gmail.com';

    expect(validateEmail(validEmail)).toBe(true);
  });

  it('should return false if email is invalid', () => {
    const invalidEmail = 'example';

    expect(validateEmail(invalidEmail)).toBe(false);
  });
});
