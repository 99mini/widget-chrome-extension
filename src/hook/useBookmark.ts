import { create } from 'zustand';

import { flatBookmark } from '@/utils/bookmark';

import { WidgetBookmarkType } from '@/types/widget';

import { create as createBookmark, getTree, move, remove, search, update } from '@/chrome/bookmarks';

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
