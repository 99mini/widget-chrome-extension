import { describe, it, expect } from 'vitest';

import { isWidget } from '@/utils/types';
import { WidgetType, CustomWidgetType } from '@/types/Widget';

describe('isWidget', () => {
  it('should return true when widgetType is bookmark', () => {
    const widget: WidgetType<CustomWidgetType> = {
      id: '1',
      index: 1,
      title: 'bookmark',
      widgetType: 'bookmark',
      data: {
        id: '1',
        title: 'bookmark',
        url: 'https://www.google.com',
      },
    };

    expect(isWidget(widget, 'bookmark')).toBe(true);
  });
});
