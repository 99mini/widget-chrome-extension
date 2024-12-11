import React, { useEffect } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

import { ClockWidget, FolderWidget, IconWidget } from '@/components/widget';

import WidgetLayout from '@/components/widget/WidgetLayout';

import useWidget from '@/hook/useWidget';

import { ClockWidgetType, WidgetBookmarkType } from '@/types/Widget';
import { isWidgetOf } from '@/utils/types';

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
          if (isWidgetOf<WidgetBookmarkType>(widget, 'bookmark')) {
            const bookmark = widget.data;
            if (!bookmark.url && bookmark.children) {
              return (
                <FolderWidget
                  key={`${bookmark.id}-${widget.index}`}
                  id={bookmark.id}
                  index={widget.index}
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
                      index={folderClild.index}
                      title={folderClild.title}
                      url={folderClild.url ?? '#'}
                      image={folderClild.imageUrl}
                    />
                  ))}
                </FolderWidget>
              );
            }
            return (
              <IconWidget
                key={`${bookmark.id}-${widget.index}`}
                id={bookmark.id}
                index={widget.index}
                title={bookmark.title}
                url={bookmark.url ?? '#'}
                image={bookmark.imageUrl}
              />
            );
          }
          if (isWidgetOf<ClockWidgetType>(widget, 'clock')) {
            return (
              <ClockWidget
                key={`${widget.id}-${widget.index}`}
                index={widget.index}
                format={widget.data.format}
                WidgetProps={{
                  title: widget.title,
                  span: widget.span,
                }}
              />
            );
          }
        })}
      </WidgetLayout>
      <Footer />
    </main>
  );
};

export default NewTab;
