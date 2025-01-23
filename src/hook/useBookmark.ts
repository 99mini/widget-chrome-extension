import { create } from 'zustand';

import { create as createBookmark, getTree, move, remove, search, update } from '@/chrome/bookmarks';

import { flatBookmark } from '@/utils/bookmark';
import { deepMerge } from '@/utils/object';

import { WidgetBookmarkType } from '@/types/Widget';

type BookmarkStoreType = {
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

const useBookmarkStore = create<BookmarkStoreType>((set) => ({
  bookmarks: [],
  actions: {
    getBookmarks: async () => {
      const res = await getTree();
      const parsed = flatBookmark(res);

      set({ bookmarks: parsed });

      return parsed;
    },
    searchBookmarks: search,
    createBookmark: async (bookmark) => {
      const res = await createBookmark({ ...bookmark, parentId: bookmark.parentId ?? '1' });

      set((prev) => {
        const bookmarks = [...prev.bookmarks, res];

        return { bookmarks };
      });

      return res;
    },
    updateBookmark: async (id, changes) => {
      const res = await update(id, {
        title: changes.title,
        url: changes.url,
      });

      set((prev) => {
        const bookmarks = prev.bookmarks.map((bookmark) => {
          if (bookmark.id === id) {
            return deepMerge(bookmark, changes);
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
