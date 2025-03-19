import { type CustomWidgetType, type WidgetOptionType, type WidgetType } from '@/lib/types/Widget';

export function isWidgetOf<T extends CustomWidgetType>(
  widget: Pick<WidgetType<CustomWidgetType>, 'widgetType'>,
  widgetType: WidgetOptionType
): widget is WidgetType<T> {
  return widget.widgetType === widgetType;
}
