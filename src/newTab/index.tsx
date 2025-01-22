import React, { useEffect } from 'react';

import styled from '@emotion/styled';

import AdArea from '@/components/AdArea';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ClockWidget, FolderWidget, IconWidget } from '@/components/widget';
import WidgetLayout from '@/components/widget/WidgetLayout';
import { GoogleSearchWidget } from '@/components/widget/google';

import useWidget from '@/hook/useWidget';

import { pickCss } from '@/utils/style';
import { isWidgetOf } from '@/utils/types';

import { ClockWidgetType, GoogleWidgetType, WidgetBookmarkType } from '@/types/Widget';

const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  height: ${({ theme }) => `calc(100vh - ${pickCss(theme.sizes.header, 'height')})`};
`;

const NewTab: React.FC = () => {
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
                    WidgetProps={{ title: widget.title, span: widget.span }}
                  />
                );
              }
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
