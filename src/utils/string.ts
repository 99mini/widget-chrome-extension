import { RegionType } from '@/types/theme';

export function i18n(local: RegionType, dict: Record<RegionType, string>): string {
  return dict[local];
}

/**
 *
 * @param str
 * @returns string with increased suffix number
 * @example
 * ```ts
 * increaseSuffixNumber('hello-1') // 'hello-2'
 * increaseSuffixNumber('hello') // 'hello-1'
 * increaseSuffixNumber('hello-1-1') // 'hello-1-2'
 * ```
 */
export function increaseSuffixNumber(str: string): string {
  const match = str.match(/(\d+)$/);
  if (!match) {
    return str + '-1';
  }
  const num = parseInt(match[0]);
  return str.replace(/(\d+)$/, String(num + 1));
}
