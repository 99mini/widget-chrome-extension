import React, { useEffect } from 'react';

import styled from '@emotion/styled';

import AdArea from '@/components/AdArea';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ClockWidget, FolderWidget, HistoryWidget, IconWidget } from '@/components/widget';
import { GoogleSearchWidget } from '@/components/widget/google';
import WidgetLayout from '@/components/widget/root/WidgetLayout';

import useWidget from '@/hook/useWidget';

import { isWidgetOf } from '@/utils/types';

import { ClockWidgetType, GoogleWidgetType, HistoryWidgetType, WidgetBookmarkType } from '@/types/Widget';

const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const Content = styled.main``;

const NewTab = () => {
  const {
    widgets,
    actions: { getWidgets },
  } = useWidget();

  useEffect(() => {
    getWidgets();
  }, [getWidgets]);

  return (
    <Container>
      <Header />
      <Content>
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
                    id: widget.id,
                    title: widget.title,
                    span: widget.span,
                  }}
                />
              );
            }
            if (isWidgetOf<GoogleWidgetType>(widget, 'google')) {
              if (widget.data.googleType === 'search') {
                return (
                  <GoogleSearchWidget
                    key={widget.id}
                    index={widget.index}
                    WidgetProps={{
                      id: widget.id,
                      title: widget.title,
                      span: widget.span,
                    }}
                  />
                );
              }
            }
            if (isWidgetOf<HistoryWidgetType>(widget, 'history')) {
              return (
                <HistoryWidget
                  key={widget.id}
                  index={widget.index}
                  maxResults={widget.data.maxResults}
                  WidgetProps={{
                    id: widget.id,
                    title: widget.title,
                    span: widget.span,
                  }}
                />
              );
            }
          })}
        </WidgetLayout>
        <AdArea />
      </Content>
      <Footer />
    </Container>
  );
};

export default NewTab;
