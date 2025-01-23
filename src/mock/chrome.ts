import bookmarks from './bookmarks';
import history from './history';
import storage from './storage';

const mockChrome = {
  storage,
  bookmarks,
  history,
};

export default mockChrome;
