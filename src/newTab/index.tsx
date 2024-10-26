import React, { useEffect } from 'react';

import { getTree } from '@/chrome/bookmarks';
import Clock from '@/widget/Clock';
import IconWidget from '@/widget/Icon';
import Todo from '@/widget/Todo';
import { flat } from '@/utils/bookmark-tree-node-parser';
import bookmarksMockData from '@/mock/bookmarks.mock';
const NewTab: React.FC = () => {
  const [bookmarks, setBookmarks] = React.useState<chrome.bookmarks.BookmarkTreeNode[]>([]);

  useEffect(() => {
    const fetch = async () => {
      // const res = await getTree();
      const parsed = flat(bookmarksMockData);
      console.log(parsed);
      setBookmarks(parsed);
    };

    fetch();
  }, []);

  return (
    <div>
      <Todo />
      <Clock />
      <IconWidget
        name="Youtube"
        url="https://youtube.com"
        image="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png"
      />
    </div>
  );
};

export default NewTab;
