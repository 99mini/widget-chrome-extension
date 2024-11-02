import bookmarskMockData from './bookmarks.mock';

const bookmarks = {
  getTree: async (): Promise<chrome.bookmarks.BookmarkTreeNode[]> => {
    return bookmarskMockData;
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
};

export default bookmarks;
