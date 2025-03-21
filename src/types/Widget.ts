type TimeFormat = 'HH:mm:ss' | 'HH:mm' | 'a h:mm:ss' | 'a h:mm';
type DateFormat = 'yyyy-MM-dd';

type DateTimeFormat = `${DateFormat} ${TimeFormat}` | `${DateFormat} ${Exclude<TimeFormat, 'a h:mm:ss' | 'a h:mm'>}`;

export type ClockFormatType = TimeFormat | DateTimeFormat;

export const CLOCK_FORMAT_OPTIONS: ClockFormatType[] = [
  'HH:mm:ss',
  'HH:mm',
  'a h:mm:ss',
  'a h:mm',
  'yyyy-MM-dd HH:mm:ss',
  'yyyy-MM-dd HH:mm',
  'yyyy-MM-dd a h:mm:ss',
  'yyyy-MM-dd a h:mm',
] as const;

export const SPAN_OPTIONS = [
  { row: 1, column: 1 },
  { row: 1, column: 2 },
  { row: 2, column: 2 },
  { row: 2, column: 4 },
  { row: 4, column: 4 },
] as const;

export type SpanType = (typeof SPAN_OPTIONS)[number];

export type WidgetOptionType = 'folder' | 'bookmark' | 'clock' | 'google' | 'history';

export type WidgetBookmarkType = Omit<chrome.bookmarks.BookmarkTreeNode, 'children'> & {
  imageUrl?: string;
  children?: WidgetBookmarkType[] | undefined;
};

export type ClockWidgetType = {
  format?: ClockFormatType;
};

export type GoogleWidgetType = {
  googleType: 'search' | 'youtube';
};

export type HistoryWidgetType = {
  historyList: chrome.history.HistoryItem[];
  maxResults?: number;
};

export type CustomWidgetType = WidgetBookmarkType | ClockWidgetType | GoogleWidgetType | HistoryWidgetType;

export type WidgetType<T extends CustomWidgetType> = {
  id: string;
  index: number;
  title: string;
  widgetType: WidgetOptionType;
  span?: SpanType;
  data: T;
};
