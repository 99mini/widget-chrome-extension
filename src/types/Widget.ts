export type WidgetType<T> = {
  id: string;
  index: number;
  title: string;
  widgetType: 'bookmark' | 'clock';
  data: T;
};

export type WidgetBookmarkType = Omit<chrome.bookmarks.BookmarkTreeNode, 'children'> & {
  imageUrl?: string;
  children?: WidgetBookmarkType[] | undefined;
};

export type ClockWidgetType = {
  format: string;
};

export type CustomWidgetType = WidgetBookmarkType | ClockWidgetType;
