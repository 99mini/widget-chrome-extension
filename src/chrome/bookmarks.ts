export const getTree = async (): Promise<chrome.bookmarks.BookmarkTreeNode[]> => {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
      resolve(bookmarkTreeNodes);
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
    });
  });
};

export const search = async (query: string): Promise<chrome.bookmarks.BookmarkTreeNode[]> => {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.search(query, (bookmarkTreeNodes) => {
      resolve(bookmarkTreeNodes);
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
    });
  });
};

export const create = async (
  bookmark: chrome.bookmarks.BookmarkCreateArg
): Promise<chrome.bookmarks.BookmarkTreeNode> => {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.create(bookmark, (bookmarkTreeNode) => {
      resolve(bookmarkTreeNode);
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
    });
  });
};

export const update = async (
  id: string,
  changes: chrome.bookmarks.BookmarkChangesArg
): Promise<chrome.bookmarks.BookmarkTreeNode> => {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.update(id, changes, (bookmarkTreeNode) => {
      resolve(bookmarkTreeNode);
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
    });
  });
};

export const remove = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.remove(id, () => {
      resolve();
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
    });
  });
};
