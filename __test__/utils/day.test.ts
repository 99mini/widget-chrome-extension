import { describe, it, expect } from 'vitest';
import { formatDate, i18n } from '@/utils/day';

describe('i18n', () => {
  it('should return localized string', () => {
    expect(i18n('year', 'ko')).toBe('년');
    expect(i18n('year', 'en')).toBe('year');
    expect(i18n('month', 'ko')).toBe('월');
    expect(i18n('month', 'en')).toBe('month');
    expect(i18n('day', 'ko')).toBe('일');
    expect(i18n('day', 'en')).toBe('day');
    expect(i18n('hour', 'ko')).toBe('시');
    expect(i18n('hour', 'en')).toBe('hour');
    expect(i18n('minute', 'ko')).toBe('분');
    expect(i18n('minute', 'en')).toBe('minute');
    expect(i18n('second', 'ko')).toBe('초');
    expect(i18n('second', 'en')).toBe('second');
    expect(i18n('PM', 'ko')).toBe('오후');
    expect(i18n('PM', 'en')).toBe('PM');
    expect(i18n('AM', 'ko')).toBe('오전');
    expect(i18n('AM', 'en')).toBe('AM');
    expect(i18n('unknown', 'ko')).toBe('unknown');
    expect(i18n('unknown', 'en')).toBe('unknown');
  });
});

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

  it('should throw error when date is invalid', () => {
    expect(() => formatDate('invalid date')).toThrowError('Invalid date');
  });
});
