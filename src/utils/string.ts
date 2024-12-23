import { RegionType } from '@/types/theme';

export function i18n(local: RegionType, dict: Record<RegionType, string>): string {
  return dict[local];
}
