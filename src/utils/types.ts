import { CustomWidgetType, WidgetType } from '@/types/Widget';

export function isWidget<T extends CustomWidgetType>(
  widget: WidgetType<CustomWidgetType>,
  widgetType: WidgetType<T>['widgetType']
): widget is WidgetType<T> {
  return widget.widgetType === widgetType;
}
