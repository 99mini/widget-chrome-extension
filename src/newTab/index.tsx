import React, { useEffect } from 'react';

import Header from '@/components/Header';
import Folder from '@/widget/Folder';
import IconWidget from '@/widget/Icon';
import WidgetLayout from '@/widget/WidgetLayout';
import Clock from '@/widget/Clock';

import useBookmarkStore from '@/hook/useBookmark';
import Footer from '@/components/Footer';
import useWidgetStore, { CustomWidget } from '@/hook/useWidget';
import { WidgetType } from '@/types/Widget';
import { WidgetBookmarkType } from '@/types/Bookmarks';

const NewTab: React.FC = () => {
  const {
    actions: { getBookmarks },
  } = useBookmarkStore();

  const {
    widgets,
    actions: { getWidgets },
  } = useWidgetStore();

  useEffect(() => {
    getBookmarks();
  }, [getBookmarks]);

  useEffect(() => {
    setTimeout(() => {
      getWidgets();
    }, 1000);
  }, [getWidgets]);

  const isWidget = <T extends CustomWidget>(
    widget: WidgetType<CustomWidget>,
    widgetType: WidgetType<T>['widgetType']
  ): widget is WidgetType<T> => {
    return widget.widgetType === widgetType;
  };

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
        <Clock WidgetProps={{ span: { row: 1, column: 1 } }} format="HH:mm" />
      </WidgetLayout>
      <Footer />
    </main>
  );
};

export default NewTab;
