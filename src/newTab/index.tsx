import React, { useEffect } from 'react';

import { getTree } from '@/chrome/bookmarks';
import { flat } from '@/utils/bookmark-tree-node-parser';
import Clock from '@/widget/Clock';
import IconWidget from '@/widget/Icon';
import Layout from '@/widget/Layout';
import Todo from '@/widget/Todo';

import bookmarksMockData from '@/mock/bookmarks.mock';
import Folder from '@/widget/Folder';
const NewTab: React.FC = () => {
  const [bookmarks, setBookmarks] = React.useState<chrome.bookmarks.BookmarkTreeNode[]>([]);

  useEffect(() => {
    const fetch = async () => {
      // TODO: 주석 해제
      // const res = await getTree();
      // const parsed = flat(res);

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
        {bookmarks.map((bookmark) => {
          if (!bookmark.url && bookmark.children) {
            return (
              <Folder key={bookmark.id}>
                {bookmark.children.map((folderClild) => (
                  <IconWidget
                    key={folderClild.id}
                    name={folderClild.title}
                    url={folderClild.url ?? 'empty'}
                    image={`https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png`}
                  />
                ))}
              </Folder>
            );
          }
          return (
            <IconWidget
              key={bookmark.id}
              name={bookmark.title}
              url={bookmark.url ?? 'empty'}
              image={`https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png`}
            />
          );
        })}
      </Layout>
    </div>
  );
};

export default NewTab;
