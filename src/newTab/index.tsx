import React, { useEffect } from 'react';

import Header from '@/components/Header';
import Folder from '@/widget/Folder';
import IconWidget from '@/widget/Icon';
import WidgetLayout from '@/widget/WidgetLayout';
import Clock from '@/widget/Clock';

import useBookmarkStore from '@/hook/useBookmark';
import Footer from '@/components/Footer';

const NewTab: React.FC = () => {
  const {
    bookmarks,
    actions: { getBookmarks },
  } = useBookmarkStore();

  useEffect(() => {
    getBookmarks();
  }, [getBookmarks]);

  return (
    <main>
      <Header />
      <WidgetLayout>
        <Clock WidgetProps={{ span: { row: 1, column: 2 } }} />
        {/* TODO: 북마크와 커스텀 위젯 위치 조정 */}
        {/* 북마크 랜더링 */}
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
        <Clock />
        <Clock WidgetProps={{ span: { row: 1, column: 1 } }} format="HH:mm" />
      </WidgetLayout>
      <Footer />
    </main>
  );
};

export default NewTab;
