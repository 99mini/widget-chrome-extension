export type WidgetType<T> = {
  id: string;
  index: number;
  title: string;
  widgetType: 'bookmark' | 'clock';
  data: T;
};

export type ClockWidgetType = {
  format: string;
};
