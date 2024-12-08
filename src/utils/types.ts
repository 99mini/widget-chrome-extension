import { CustomWidgetType, WidgetType } from '@/types/Widget';

export function isWidgetOf<T extends CustomWidgetType>(
  widget: Pick<WidgetType<CustomWidgetType>, 'widgetType'>,
  widgetType: WidgetType<T>['widgetType']
): widget is WidgetType<T> {
  return widget.widgetType === widgetType;
}
