import React, { useEffect } from 'react';

import Clock from '@/widget/Clock';
import IconWidget from '@/widget/Icon';
import Layout from '@/widget/Layout';
import Todo from '@/widget/Todo';
import Folder from '@/widget/Folder';
import { getIconPath } from '@/assets/Icon';

import useBookmarkStore from '@/hook/useBookmark';

const NewTab: React.FC = () => {
  const {
    bookmarks,
    actions: { getBookmarks },
  } = useBookmarkStore();

  useEffect(() => {
    getBookmarks();
  }, [getBookmarks]);

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
                  imageUrl: child.imageUrl ?? getIconPath('widgets_24'),
                }))}
              >
                {bookmark.children.map((folderClild) => (
                  <IconWidget
                    key={folderClild.id}
                    id={folderClild.id}
                    title={folderClild.title}
                    url={folderClild.url ?? getIconPath('widgets_64')}
                    image={folderClild.imageUrl ?? getIconPath('widgets_64')}
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
              url={bookmark.url ?? getIconPath('widgets_64')}
              image={bookmark.imageUrl ?? getIconPath('widgets_64')}
            />
          );
        })}
      </Layout>
    </div>
  );
};

export default NewTab;
