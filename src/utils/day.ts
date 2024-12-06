/* eslint-disable no-redeclare */

function i18n(value: string, local: 'ko' | 'en' = 'ko'): string {
  switch (value) {
    case 'year':
      return local === 'ko' ? '년' : value;
    case 'month':
      return local === 'ko' ? '월' : value;
    case 'day':
      return local === 'ko' ? '일' : value;
    case 'hour':
      return local === 'ko' ? '시' : value;
    case 'minute':
      return local === 'ko' ? '분' : value;
    case 'second':
      return local === 'ko' ? '초' : value;
    case 'PM':
      return local === 'ko' ? '오후' : value;
    case 'AM':
      return local === 'ko' ? '오전' : value;
    default:
      return value;
  }
}

function formatDate(date: Date): string;
function formatDate(date: Date, format: string): string;
function formatDate(date: number): string;
function formatDate(date: number, format: string): string;
function formatDate(date: string): string;
function formatDate(date: string, format: string): string;

function formatDate(date: Date | number | string, format = 'yyyy-MM-dd HH:mm:ss'): string {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    throw new Error('Invalid date');
  }

  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour = d.getHours();
  const minute = d.getMinutes();
  const second = d.getSeconds();

  return format
    .replace('yyyy', year.toString())
    .replace('MM', month.toString().padStart(2, '0'))
    .replace('dd', day.toString().padStart(2, '0'))
    .replace('HH', hour.toString().padStart(2, '0'))
    .replace('h', (hour % 12).toString().padStart(2, '0'))
    .replace('mm', minute.toString().padStart(2, '0'))
    .replace('ss', second.toString().padStart(2, '0'))
    .replace('a', hour >= 12 ? i18n('PM') : i18n('AM'));
}

export { i18n, formatDate };
