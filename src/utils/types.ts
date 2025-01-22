import { CustomWidgetType, WidgetOptionType, WidgetType } from '@/types/widget';

export function isWidgetOf<T extends CustomWidgetType>(
  widget: Pick<WidgetType<CustomWidgetType>, 'widgetType'>,
  widgetType: WidgetOptionType
): widget is WidgetType<T> {
  return widget.widgetType === widgetType;
}
