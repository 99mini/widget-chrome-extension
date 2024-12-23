import { describe, it, expect } from 'vitest';
import { formatDate } from '@/utils/day';

describe('formatDate', () => {
  it('should format date correctly', () => {
    expect(formatDate(new Date('2021-01-01'))).toBe('2021-01-01 09:00:00');
    expect(formatDate('2021-01-01')).toBe('2021-01-01 09:00:00');
    expect(formatDate(1609459200000)).toBe('2021-01-01 09:00:00');
  });

  it('should format date correctly with custom format', () => {
    expect(formatDate(new Date('2021-01-01'), 'yyyy/MM/dd')).toBe('2021/01/01');
    expect(formatDate('2021-01-01', 'yyyy/MM/dd')).toBe('2021/01/01');
    expect(formatDate(1609459200000, 'yyyy/MM/dd')).toBe('2021/01/01');
    expect(formatDate(new Date('2021-01-01T11:00:00'), 'yyyy/MM/dd HH:mm:ss')).toBe('2021/01/01 11:00:00');
    expect(formatDate(new Date('2021-01-01T13:00:00'), 'yyyy/MM/dd HH:mm:ss')).toBe('2021/01/01 13:00:00');
  });

  it('should format date correctly with region', () => {
    expect(formatDate(new Date('2021-01-01T13:00:00'), 'yyyy-MM-dd a h:mm:ss', 'ko')).toBe('2021-01-01 오후 01:00:00');
    expect(formatDate(new Date('2021-01-01T13:00:00'), 'yyyy-MM-dd a h:mm:ss', 'en')).toBe('2021-01-01 PM 01:00:00');
  });

  it('should throw error when date is invalid', () => {
    expect(() => formatDate('invalid date')).toThrowError('Invalid date');
  });
});
