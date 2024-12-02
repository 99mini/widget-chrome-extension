import { create } from 'zustand';

import { WidgetBookmarkType } from '@/types/Bookmarks';
import { ClockWidgetType, WidgetType } from '@/types/Widget';

import { syncGet, syncSet } from '@/chrome/storage';

export type CustomWidget = WidgetBookmarkType | ClockWidgetType;

type WidgetStoreType<T> = {
  widgets: WidgetType<T>[];
  actions: {
    getWidgets: () => Promise<WidgetType<T>[]>;
    createWidget: (widget: WidgetType<T>) => Promise<void>;
    updateWidget: (id: string, changes: Partial<WidgetType<T>>, dataChanges: Partial<T>) => Promise<void>;
    removeWidget: (id: string) => Promise<void>;
  };
};

const useWidgetStore = create<WidgetStoreType<CustomWidget>>((set) => ({
  widgets: [],
  actions: {
    getWidgets: async () => {
      const widgets = await syncGet('widgets');

      set({ widgets: widgets as WidgetType<CustomWidget>[] });
      return widgets as WidgetType<CustomWidget>[];
    },
    createWidget: async (widget) => {
      set((prev) => {
        const widgets = [...prev.widgets, widget];

        syncSet('widgets', { widgets });
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

export default useWidgetStore;