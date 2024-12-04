import { useCallback } from 'react';
import { create } from 'zustand';

import { syncClear, syncGet, syncSet } from '@/chrome/storage';

import useBookmarkStore from './useBookmark';

import { CustomWidgetType, WidgetType } from '@/types/Widget';

type WidgetStoreType<T> = {
  widgets: WidgetType<T>[];
  actions: {
    getWidgets: () => Promise<WidgetType<T>[]>;
    setWidgets: (widgets: WidgetType<T>[]) => void;
    createWidget: (widget: Omit<WidgetType<T>, 'index'>) => Promise<void>;
    updateWidget: (id: string, changes: Partial<WidgetType<T>>, dataChanges: Partial<T>) => Promise<void>;
    removeWidget: (id: string) => Promise<void>;
    clearWidgets: () => Promise<void>;
  };
};

const useWidgetStore = create<WidgetStoreType<CustomWidgetType>>((set) => ({
  widgets: [],
  actions: {
    getWidgets: async () => {
      const widgets = await syncGet('widgets');

      if (!widgets) {
        return [];
      }

      return widgets as WidgetType<CustomWidgetType>[];
    },
    setWidgets: (widgets) => {
      syncSet('widgets', widgets);
      set({ widgets });
    },
    createWidget: async (widget) => {
      set((prev) => {
        const widgets = [...prev.widgets, { ...widget, index: prev.widgets.length }];

        syncSet('widgets', widgets);

        return { widgets };
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

        syncSet('widgets', widgets);
        return { widgets };
      });
    },
    removeWidget: async (id) => {
      set((prev) => {
        const widgets = prev.widgets.filter((widget) => widget.id !== id);

        syncSet('widgets', widgets);
        return { widgets };
      });
    },
    clearWidgets: async () => {
      await syncClear();
      set({ widgets: [] });
    },
  },
}));

const useWidget = () => {
  const { widgets, actions } = useWidgetStore();
  const {
    actions: { getBookmarks },
  } = useBookmarkStore();

  const getWidgets = useCallback(async () => {
    const bookmarks = await getBookmarks();
    console.log('bookmarks', bookmarks);

    const widgets = await actions.getWidgets();

    console.log('widgets', widgets);

    const widgetIds = widgets.map((widget) => widget.id);

    const lastWidgetIndex = Math.max(...widgets.map((widget) => widget.index), -1);

    const newBookmarks: WidgetType<CustomWidgetType>[] = bookmarks.map((bookmark, index) => {
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

    const newBookmarksIds = newBookmarks.map((bookmark) => bookmark.id);

    const withoutBookmarks = widgets.filter((widget) => !newBookmarksIds.includes(widget.id));

    const newWidgets = [...withoutBookmarks, ...newBookmarks]
      .map((widget) => {
        if (widget.widgetType === 'bookmark') {
          return newBookmarks.find((bookmark) => bookmark.id === widget.id) || widget;
        }
        return widget;
      })
      .sort((a, b) => a.index - b.index);

    actions.setWidgets(newWidgets);

    return newWidgets;
  }, [actions, getBookmarks]);

  const refresh = useCallback(async () => {
    await getWidgets();
  }, [getWidgets]);

  const clearWidgets = useCallback(async () => {
    await actions.clearWidgets();

    await refresh();
  }, [actions, refresh]);

  return {
    widgets,
    actions: {
      getWidgets,
      createWidget: actions.createWidget,
      updateWidget: actions.updateWidget,
      removeWidget: actions.removeWidget,
      refresh,
      clearWidgets,
    },
  };
};

export default useWidget;
