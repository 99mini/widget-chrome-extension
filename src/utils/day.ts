/* eslint-disable no-redeclare */
import { RegionType } from '@/types/theme';

import { i18n } from './string';

function formatDate(date: Date): string;
function formatDate(date: Date, format: string): string;

function formatDate(date: number): string;
function formatDate(date: number, format: string): string;

function formatDate(date: string): string;
function formatDate(date: string, format: string): string;

function formatDate(date: Date | number | string, format?: string, region?: RegionType): string;

function formatDate(date: Date | number | string, format = 'yyyy-MM-dd HH:mm:ss', region: RegionType = 'ko'): string {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    throw new Error('Invalid date');
  }

  const hasA = format.includes('a');

  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour = d.getHours();
  const minute = d.getMinutes();
  const second = d.getSeconds();

  return format
    .replace('yyyy', year.toString())
    .replace('yy', year.toString().slice(-2))
    .replace('MM', month.toString().padStart(2, '0'))
    .replace('dd', day.toString().padStart(2, '0'))
    .replace('HH', hour.toString().padStart(2, '0'))
    .replace('h', (hasA ? hour % 12 || 12 : hour).toString().padStart(2, '0'))
    .replace('mm', minute.toString().padStart(2, '0'))
    .replace('ss', second.toString().padStart(2, '0'))
    .replace('a', hour >= 12 ? i18n(region, { ko: '오후', en: 'PM' }) : i18n(region, { ko: '오전', en: 'AM' }));
}

export { formatDate };
