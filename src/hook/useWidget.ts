import { create } from 'zustand';

import { CustomWidgetType, WidgetType } from '@/types/Widget';

import { syncGet, syncSet } from '@/chrome/storage';

type WidgetStoreType<T> = {
  widgets: WidgetType<T>[];
  actions: {
    getWidgets: () => Promise<WidgetType<T>[]>;
    createWidget: (widget: WidgetType<T>) => Promise<void>;
    updateWidget: (id: string, changes: Partial<WidgetType<T>>, dataChanges: Partial<T>) => Promise<void>;
    removeWidget: (id: string) => Promise<void>;
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

      set({ widgets: widgets as WidgetType<CustomWidgetType>[] });
      return widgets as WidgetType<CustomWidgetType>[];
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

const useWidget = () => {
  const { widgets, actions } = useWidgetStore();

  return { widgets, actions };
};

export default useWidget;
