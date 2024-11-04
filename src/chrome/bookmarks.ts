export async function getTree(): Promise<chrome.bookmarks.BookmarkTreeNode[]> {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
      resolve(bookmarkTreeNodes);
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
    });
  });
}

export async function search(query: string): Promise<chrome.bookmarks.BookmarkTreeNode[]> {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.search(query, (bookmarkTreeNodes) => {
      resolve(bookmarkTreeNodes);
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
    });
  });
}

export async function create(bookmark: chrome.bookmarks.BookmarkCreateArg): Promise<chrome.bookmarks.BookmarkTreeNode> {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.create(bookmark, (bookmarkTreeNode) => {
      resolve(bookmarkTreeNode);
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
    });
  });
}

export async function update(
  id: string,
  changes: chrome.bookmarks.BookmarkChangesArg
): Promise<chrome.bookmarks.BookmarkTreeNode> {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.update(id, changes, (bookmarkTreeNode) => {
      resolve(bookmarkTreeNode);
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
    });
  });
}

export async function remove(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.remove(id, () => {
      resolve();
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
    });
  });
}

export async function move(id: string, newParentId: string): Promise<chrome.bookmarks.BookmarkTreeNode> {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.move(id, { parentId: newParentId }, (bookmarkTreeNode) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(bookmarkTreeNode);
      }
    });
  });
}
