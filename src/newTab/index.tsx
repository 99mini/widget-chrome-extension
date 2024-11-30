import React, { useEffect } from 'react';

import Header from '@/components/Header';
import Folder from '@/widget/Folder';
import IconWidget from '@/widget/Icon';
import WidgetLayout from '@/widget/WidgetLayout';

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
      <Header />
      <WidgetLayout>
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
      </WidgetLayout>
    </div>
  );
};

export default NewTab;
