import { create } from 'zustand';

import { getTree, search, create as createBookmark, update, remove, move } from '@/chrome/bookmarks';

import { flatBookmark } from '@/utils/bookmark';

type WidgetBookmarkType = Omit<chrome.bookmarks.BookmarkTreeNode, 'children'> & {
  imageUrl?: string;
  children?: WidgetBookmarkType[] | undefined;
};

type BookmarkStore = {
  bookmarks: WidgetBookmarkType[];
  actions: {
    getBookmarks: typeof getTree;
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

const bookmarks = useBookmarkStore.getState().bookmarks;
const actions = useBookmarkStore.getState().actions;

export { bookmarks, actions };

export default useBookmarkStore;