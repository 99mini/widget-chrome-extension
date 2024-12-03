type TimeFormat = 'HH:mm:ss' | 'HH:mm' | 'a HH:mm:ss' | 'a HH:mm';
type DateFormat = 'yyyy-MM-dd' | 'yyyy년 MM월 dd일';

type DateTimeFormat = `${DateFormat} ${TimeFormat}` | `${DateFormat} ${Exclude<TimeFormat, 'a HH:mm:ss' | 'a HH:mm'>}`;

export type ClockFormatType = TimeFormat | DateTimeFormat;

export type SpanType =
  | {
      row: 1;
      column: 1;
    }
  | {
      row: 1;
      column: 2;
    }
  | {
      row: 2;
      column: 2;
    }
  | {
      row: 2;
      column: 4;
    }
  | {
      row: 4;
      column: 4;
    };

export type WidgetType<T> = {
  id: string;
  index: number;
  title: string;
  widgetType: 'bookmark' | 'clock';
  span?: SpanType;
  data: T;
};

export type WidgetBookmarkType = Omit<chrome.bookmarks.BookmarkTreeNode, 'children'> & {
  imageUrl?: string;
  children?: WidgetBookmarkType[] | undefined;
};

export type ClockWidgetType = {
  format?: ClockFormatType;
};

export type CustomWidgetType = WidgetBookmarkType | ClockWidgetType;
