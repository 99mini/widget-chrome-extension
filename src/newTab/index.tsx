import React, { useEffect, useState } from 'react';

import Clock from '@/widget/Clock';
import IconWidget from '@/widget/Icon';
import Layout from '@/widget/Layout';
import Todo from '@/widget/Todo';
import Folder from '@/widget/Folder';
import Switch from '@/components/Switch';

import useBookmarkStore from '@/hook/useBookmark';
import { mode, actions } from '@/hook/useTheme';

const NewTab: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(mode === 'dark');

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
      <Switch
        InputProps={{
          checked: isDarkMode,
          onChange: async () => {
            setIsDarkMode((prev) => {
              actions.setMode(prev ? 'light' : 'dark');
              return !prev;
            });
          },
        }}
      >
        {isDarkMode ? 'Dark Mode' : 'Light Mode'}
      </Switch>
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
                  imageUrl: child.imageUrl,
                }))}
              >
                {bookmark.children.map((folderClild) => (
                  <IconWidget
                    key={folderClild.id}
                    id={folderClild.id}
                    title={folderClild.title}
                    url={folderClild.url ?? '#'}
                    image={folderClild.imageUrl}
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
              url={bookmark.url ?? '#'}
              image={bookmark.imageUrl}
            />
          );
        })}
      </Layout>
    </div>
  );
};

export default NewTab;
