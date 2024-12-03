import { useCallback } from 'react';
import { create } from 'zustand';

import { syncGet, syncSet } from '@/chrome/storage';

import useBookmarkStore from './useBookmark';

import { CustomWidgetType, WidgetType } from '@/types/Widget';

type WidgetStoreType<T> = {
  widgets: WidgetType<T>[];
  lastWidgetIndex: number;
  actions: {
    getWidgets: () => Promise<WidgetType<T>[]>;
    setWidgets: (widgets: WidgetType<T>[]) => void;
    createWidget: (widget: WidgetType<T>) => Promise<void>;
    updateWidget: (id: string, changes: Partial<WidgetType<T>>, dataChanges: Partial<T>) => Promise<void>;
    removeWidget: (id: string) => Promise<void>;
  };
};

const useWidgetStore = create<WidgetStoreType<CustomWidgetType>>((set) => ({
  widgets: [],
  lastWidgetIndex: -1,
  actions: {
    getWidgets: async () => {
      const widgets = await syncGet('widgets');

      if (!widgets) {
        return [];
      }

      return widgets as WidgetType<CustomWidgetType>[];
    },
    setWidgets: (widgets) => {
      syncSet('widgets', { widgets });
      set({ widgets });
    },
    createWidget: async (widget) => {
      set((prev) => {
        const widgets = [...prev.widgets, widget];

        syncSet('widgets', { widgets });

        return { widgets, lastWidgetIndex: prev.lastWidgetIndex + 1 };
      });
    },
    updateWidget: async (id, changes, dataChanges) => {
      set((prev) => {
        const widgets = prev.widgets.map((widget) => {
          if (widget.id === id) {
            return { ...widget, ...changes, data: { ...widget.data, ...dataChanges } };
          }
          return widget;
        });

        syncSet('widgets', { widgets });
        return { widgets };
      });
    },
    removeWidget: async (id) => {
      set((prev) => {
        const widgets = prev.widgets.filter((widget) => widget.id !== id);

        syncSet('widgets', { widgets });
        return { widgets };
      });
    },
  },
}));

const useWidget = () => {
  const { widgets, actions } = useWidgetStore();
  const {
    actions: { getBookmarks },
  } = useBookmarkStore();

  const getWidgets = useCallback(async () => {
    const widgets = await actions.getWidgets();
    const bookmarks = await getBookmarks();

    const widgetIds = widgets.map((widget) => widget.id);

    const lastWidgetIndex = Math.max(...widgets.map((widget) => widget.index), -1);

    const newWidgets: WidgetType<CustomWidgetType>[] = bookmarks.map((bookmark, index) => {
      if (widgetIds.includes(bookmark.id)) {
        const currentWidget = widgets.find((widget) => widget.id === bookmark.id) as WidgetType<CustomWidgetType>;
        return {
          index: currentWidget.index,
          id: bookmark.id,
          title: bookmark.title,
          widgetType: 'bookmark',
          data: bookmark,
        };
      }

      return {
        index: lastWidgetIndex + index + 1,
        id: bookmark.id,
        title: bookmark.title,
        widgetType: 'bookmark',
        data: bookmark,
      };
    });

    actions.setWidgets(newWidgets);

    return newWidgets;
  }, [actions, getBookmarks]);

  const refresh = useCallback(async () => {
    await getWidgets();
  }, [getWidgets]);

  return {
    widgets,
    actions: {
      getWidgets,
      createWidget: actions.createWidget,
      updateWidget: actions.updateWidget,
      removeWidget: actions.removeWidget,
      refresh,
    },
  };
};

export default useWidget;
