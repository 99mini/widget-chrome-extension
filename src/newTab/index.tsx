import React, { useEffect } from 'react';

import { getTree } from '@/chrome/bookmarks';
import { flatBookmark } from '@/utils/bookmark';

import Clock from '@/widget/Clock';
import IconWidget from '@/widget/Icon';
import Layout from '@/widget/Layout';
import Todo from '@/widget/Todo';
import Folder from '@/widget/Folder';

const NewTab: React.FC = () => {
  const [bookmarks, setBookmarks] = React.useState<chrome.bookmarks.BookmarkTreeNode[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getTree();
      const parsed = flatBookmark(res);

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
              <Folder
                key={bookmark.id}
                id={bookmark.id}
                title={bookmark.title}
                bookmarks={bookmark.children.map((child) => ({
                  id: child.id,
                  imageUrl: child.url ?? 'empty',
                }))}
              >
                {bookmark.children.map((folderClild) => (
                  <IconWidget
                    key={folderClild.id}
                    id={folderClild.id}
                    title={folderClild.title}
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
              id={bookmark.id}
              title={bookmark.title}
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
