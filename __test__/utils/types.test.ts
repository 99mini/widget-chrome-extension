import { describe, expect, it } from 'vitest';

import { WidgetBookmarkType, WidgetType } from '@/lib/types/Widget';
import { isWidgetOf } from '@/lib/utils/types';

describe('isWidgetOf', () => {
  it('should return true when widgetType is bookmark', () => {
    const widget: WidgetType<WidgetBookmarkType> = {
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

    expect(isWidgetOf<WidgetBookmarkType>(widget, 'bookmark')).toBe(true);
  });
});
