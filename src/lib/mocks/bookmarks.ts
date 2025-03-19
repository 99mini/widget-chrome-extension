import bookmarskMockData from './bookmarks.mock';

const bookmarks = {
  getTree: async (callback: (results: chrome.bookmarks.BookmarkTreeNode[]) => void): Promise<void> => {
    return callback(bookmarskMockData);
  },
  search: async (): Promise<chrome.bookmarks.BookmarkTreeNode[]> => {
    return [
      {
        id: '2',
        title: 'Example',
        url: 'https://example.com',
      },
    ];
  },
  create: async (): Promise<chrome.bookmarks.BookmarkTreeNode> => {
    return {
      id: '3',
      title: 'New bookmark',
      url: 'https://example.com',
    };
  },
  update: async (): Promise<chrome.bookmarks.BookmarkTreeNode> => {
    return {
      id: '3',
      title: 'Updated bookmark',
      url: 'https://example.com',
    };
  },
  remove: async (): Promise<void> => {
    return;
  },
  move: async (
    id: string,
    destination: chrome.bookmarks.BookmarkDestinationArg
  ): Promise<chrome.bookmarks.BookmarkTreeNode> => {
    console.log(`Move bookmark: ${id} to ${destination.parentId}`);

    return {
      id: destination.parentId ?? '0',
      title: 'Moved bookmark',
      url: 'https://example.com',
    };
  },
};

export default bookmarks;
