import React, { useEffect } from 'react';

import { getTree } from '@/chrome/bookmarks';
import { flat } from '@/utils/bookmark-tree-node-parser';
import Clock from '@/widget/Clock';
import IconWidget from '@/widget/Icon';
import Layout from '@/widget/Layout';
import Todo from '@/widget/Todo';

import bookmarksMockData from '@/mock/bookmarks.mock';
const NewTab: React.FC = () => {
  const [bookmarks, setBookmarks] = React.useState<chrome.bookmarks.BookmarkTreeNode[]>([]);

  useEffect(() => {
    const fetch = async () => {
      // const res = await getTree();
      console.log(bookmarksMockData);
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
      <Layout>
        {bookmarks.map((bookmark) => (
          <IconWidget
            key={bookmark.id}
            name={bookmark.title}
            url={bookmark.url ?? 'empty'}
            image={`https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png`}
          />
        ))}
      </Layout>
    </div>
  );
};

export default NewTab;
