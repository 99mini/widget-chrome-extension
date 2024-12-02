import { create } from 'zustand';

import { getTree, search, create as createBookmark, update, remove, move } from '@/chrome/bookmarks';

import { flatBookmark } from '@/utils/bookmark';
import { WidgetBookmarkType } from '@/types/Bookmarks';
import { WidgetType } from '@/types/Widget';

type BookmarkStore = {
  bookmarks: WidgetBookmarkType[];
  actions: {
    getBookmarks: () => Promise<WidgetBookmarkType[]>;
    searchBookmarks: typeof search;
    createBookmark: typeof createBookmark;
    updateBookmark: typeof update;
    removeBookmark: typeof remove;
    moveBookmark: typeof move;
    refresh: () => Promise<void>;
  };
};

const useBookmarkStore = create<BookmarkStore>((set) => ({
  bookmarks: [],
  actions: {
    getBookmarks: async () => {
      const res = await getTree();
      const parsed = flatBookmark(res);

      set({ bookmarks: parsed });
      const widgets: WidgetType<WidgetBookmarkType>[] = parsed.map((bookmark, index) => ({
        index,
        id: bookmark.id,
        title: bookmark.title,
        widgetType: 'bookmark',
        data: bookmark,
      }));
      await chrome.storage.sync.set({ widgets });

      return parsed;
    },
    searchBookmarks: search,
    createBookmark: createBookmark,
    updateBookmark: async (id, changes) => {
      const res = await update(id, changes);

      set((prev) => {
        const bookmarks = prev.bookmarks.map((bookmark) => {
          if (bookmark.id === id) {
            return { ...bookmark, ...changes };
          }
          return bookmark;
        });

        return { bookmarks };
      });
      return res;
    },
    removeBookmark: async (id) => {
      await remove(id);

      set((prev) => {
        const bookmarks = prev.bookmarks.filter((bookmark) => bookmark.id !== id);

        return { bookmarks };
      });
    },
    moveBookmark: async (id, newParentId) => {
      const res = await move(id, newParentId);

      return res;
    },
    refresh: async () => {
      const res = await getTree();
      const parsed = flatBookmark(res);

      set({ bookmarks: parsed });
    },
  },
}));

export default useBookmarkStore;
