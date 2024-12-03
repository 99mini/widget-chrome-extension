import React, { useEffect } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Clock from '@/widget/Clock';
import Folder from '@/widget/Folder';
import IconWidget from '@/widget/Icon';
import WidgetLayout from '@/widget/WidgetLayout';

import useWidget from '@/hook/useWidget';

import { WidgetBookmarkType } from '@/types/Widget';
import { isWidget } from '@/utils/types';

const NewTab: React.FC = () => {
  const {
    widgets,
    actions: { getWidgets },
  } = useWidget();

  useEffect(() => {
    getWidgets();
  }, [getWidgets]);

  return (
    <main>
      <Header />
      <WidgetLayout>
        {widgets.map((widget) => {
          if (isWidget<WidgetBookmarkType>(widget, 'bookmark')) {
            const bookmark = widget.data;
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
          }
        })}
        <Clock WidgetProps={{ span: { row: 1, column: 2 } }} />
        {/* TODO: 북마크와 커스텀 위젯 위치 조정 */}
        {/* 북마크 랜더링 */}
        {/* {bookmarks.map((bookmark) => {
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
        })} */}
        <Clock />
        <Clock WidgetProps={{ span: { row: 4, column: 4 } }} format="yyyy년 MM월 dd일 a HH:mm:ss" />
        <Clock WidgetProps={{ span: { row: 2, column: 4 } }} format="yyyy년 MM월 dd일 a HH:mm:ss" />
        <Clock WidgetProps={{ span: { row: 1, column: 1 } }} format="a HH:mm" />
      </WidgetLayout>
      <Footer />
    </main>
  );
};

export default NewTab;
