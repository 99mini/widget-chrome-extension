import { useCallback } from 'react';

import { create } from 'zustand';

import { syncClear, syncGet, syncSet } from '@/chrome/storage';

import { deepMerge } from '@/utils/object';
import { increaseSuffixNumber } from '@/utils/string';
import { isWidgetOf } from '@/utils/types';

import { CustomWidgetType, WidgetBookmarkType, WidgetType } from '@/types/Widget';

import useBookmarkStore from './useBookmark';

type WidgetStoreType<T extends CustomWidgetType> = {
  widgets: WidgetType<T>[];
  actions: {
    getWidgets: () => Promise<WidgetType<T>[]>;
    setWidgets: (widgets: WidgetType<T>[]) => void;
    createWidget: (widget: Omit<WidgetType<T>, 'index'>) => Promise<void>;
    moveWidget: (id: string, prevIndex: number, nextIndex: number) => Promise<void>;
    updateWidget: (id: string, changes: Partial<WidgetType<T>>) => Promise<void>;
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
        const widgets = [
          ...prev.widgets,
          { ...widget, index: prev.widgets.length, id: increaseSuffixNumber(`${widget.id}-${prev.widgets.length}`) },
        ];

        syncSet('widgets', widgets);

        return { widgets };
      });
    },
    moveWidget: async (id, prevIndex, nextIndex) => {
      console.log(`moveWidget(${id}): ${prevIndex} to ${nextIndex}`);
      set((prev) => {
        const newWidgets = prev.widgets
          .map((widget) => {
            if (widget.id === id) {
              return { ...widget, index: nextIndex };
            } else if (widget.index >= nextIndex && widget.index < prevIndex) {
              return { ...widget, index: widget.index + 1 };
            } else if (widget.index <= nextIndex && widget.index > prevIndex) {
              return { ...widget, index: widget.index - 1 };
            }
            return widget;
          })
          .sort((a, b) => a.index - b.index);

        console.log('widgets', newWidgets);
        syncSet('widgets', newWidgets);
        return { widgets: newWidgets };
      });
    },
    updateWidget: async (id, changes) => {
      set((prev) => {
        const widgets = prev.widgets.map((widget) => {
          if (widget.id === id) {
            return deepMerge(widget, changes);
          }
          return widget;
        });

        syncSet('widgets', widgets);
        console.log('updateWidget', widgets);
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
    actions: { getBookmarks, createBookmark, removeBookmark, updateBookmark },
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

  const createWidget = useCallback(
    async <T extends CustomWidgetType>(widget: Omit<WidgetType<T>, 'index'>) => {
      if (widget.widgetType === 'bookmark' && isWidgetOf<WidgetBookmarkType>(widget, 'bookmark')) {
        try {
          const res = await createBookmark({
            title: widget.data.title,
            url: widget.data.url,
            parentId: widget.data.parentId ?? '1',
          });
          console.debug(`createWidget: ${res}`);

          await actions.createWidget({
            id: res.id,
            title: res.title,
            widgetType: 'bookmark',
            data: { ...res, imageUrl: widget.data.imageUrl },
          });

          return;
        } catch (e) {
          console.error(e);
          return;
        }
      }

      await actions.createWidget(widget);
    },
    [actions, createBookmark]
  );

  const removeWidget = useCallback(
    async (id: string) => {
      const widget = widgets.find((widget) => widget.id === id);

      if (!widget) {
        return;
      }

      if (isWidgetOf<WidgetBookmarkType>(widget, 'bookmark')) {
        await removeBookmark(id);
      }

      await actions.removeWidget(id);
    },
    [actions, removeBookmark, widgets]
  );

  const updateWidget = useCallback(
    async <T extends CustomWidgetType>(id: string, changes: Partial<WidgetType<T>>) => {
      if (!changes) {
        return;
      }

      if (changes?.widgetType === 'bookmark') {
        const changesBookmark = changes.data as WidgetBookmarkType | undefined;
        await updateBookmark(id, {
          title: changesBookmark?.title,
          url: changesBookmark?.url,
        });
      }

      await actions.updateWidget(id, changes);
    },
    [actions, updateBookmark]
  );

  return {
    widgets,
    actions: {
      ...actions,
      getWidgets,
      removeWidget,
      refresh,
      clearWidgets,
      createWidget,
      updateWidget,
    },
  };
};

export default useWidget;
