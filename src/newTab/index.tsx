import React, { useEffect } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Clock from '@/widget/Clock';
import Folder from '@/widget/Folder';
import IconWidget from '@/widget/Icon';
import WidgetLayout from '@/widget/WidgetLayout';

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
                <Folder
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
                      index={widget.index}
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
              <Clock
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
