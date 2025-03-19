import { describe, expect, it } from 'vitest';

import { urlProtocol, validateEmail, validateUrl } from '@/lib/utils/common';

describe('urlProtocol', () => {
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

describe('validateUrl', () => {
  it('should return true if url is valid', () => {
    const withSubDomain = 'https://www.google.com';
    const withoutSubDomain = 'www.google.com';
    const withoutProtocol = 'google.com';
    const withHashTag = 'google.com#hash-tag';

    expect(validateUrl(withoutSubDomain)).toBe(true);
    expect(validateUrl(withSubDomain)).toBe(true);
    expect(validateUrl(withoutProtocol)).toBe(true);
    expect(validateUrl(withHashTag)).toBe(true);
  });

  it('should return false if url is invalid', () => {
    const invalidUrl = 'googlecom';
    const invalidUrlWithHashTag = 'google#.com';
    expect(validateUrl(invalidUrl)).toBe(false);
    expect(validateUrl(invalidUrlWithHashTag)).toBe(false);
  });
});
