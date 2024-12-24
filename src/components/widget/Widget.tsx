import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

import styled from '@emotion/styled';

import useWidget from '@/hook/useWidget';

import { SpanType, WidgetOptionType } from '@/types/widget';

const Container = styled.div<{ span: Required<WidgetProps['span']>; isDragging: boolean }>`
  width: ${({ span, theme }) => {
    if (span?.column === 4) {
      return `${theme.sizes.widget.icon * 4 + theme.sizes.widget.rowGap * 3}px`;
    }
    if (span?.column === 2) {
      return `${theme.sizes.widget.icon * 2 + theme.sizes.widget.rowGap}px`;
    }
    return `${theme.sizes.widget.icon}px`;
  }};
  height: ${({ span, theme }) => {
    if (span?.row === 4) {
      return `${theme.sizes.widget.icon * 4 + theme.sizes.widget.rowGap * 3 + theme.sizes.widget.textHeight + theme.sizes.widget.textGap}px`;
    }
    if (span?.row === 2) {
      return `${theme.sizes.widget.icon * 2 + theme.sizes.widget.rowGap + theme.sizes.widget.textHeight + theme.sizes.widget.textGap}px`;
    }
    return `${theme.sizes.widget.icon + theme.sizes.widget.textHeight + theme.sizes.widget.textGap}px`;
  }};

  ${({ span }) => (span?.row && span.row > 1 ? `grid-row: span ${span.row};` : '')}
  ${({ span }) => (span?.column && span.column > 1 ? `grid-column: span ${span.column};` : '')}

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  gap: 8px;

  text-decoration: none;
  color: inherit;

  ${({ isDragging }) => isDragging && 'opacity: 0.5;'}
  transition: opacity 237ms;
`;

const ChlidrenContainer = styled.div<{ span: WidgetProps['span']; border?: boolean }>`
  display: flex;

  align-items: center;
  justify-content: center;

  width: 100%;
  height: ${({ span, theme }) => {
    if (span?.row === 4) {
      return `${theme.sizes.widget.icon * 4 + theme.sizes.widget.rowGap * 3}px`;
    }
    if (span?.row === 2) {
      return `${theme.sizes.widget.icon * 2 + theme.sizes.widget.rowGap}px`;
    }
    return `${theme.sizes.widget.icon}px`;
  }};

  box-sizing: border-box;

  ${({ border, theme }) =>
    border
      ? `
    border-radius: 16px;
    padding: 8px;
    border: 1px solid ${theme.colors.background};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
  `
      : ''}
`;

const Name = styled.span`
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;

  width: inherit;
  min-width: ${({ theme }) => theme.sizes.widget.icon + theme.sizes.widget.rowGap - 4}px;
  height: 16px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export type WidgetProps = {
  id: string;
  index: number;
  title: string;
  widgetType: WidgetOptionType;
  span?: SpanType;
  childrenProps?: { border?: boolean } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  TitleProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
  dragDisabled?: boolean;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Widget: React.FC<WidgetProps> = ({
  id,
  index,
  title,
  widgetType,
  span = {
    row: 1,
    column: 1,
  },
  childrenProps,
  TitleProps,
  dragDisabled,
  children,
  ...rest
}) => {
  const {
    actions: { moveWidget },
  } = useWidget();

  const [{ isDragging }, drag] = useDrag<
    { id: string; folder: boolean; index: number },
    { id: string; folder: boolean; index: number },
    {
      isDragging: boolean;
    }
  >(
    () => ({
      type: 'BOOKMARK',
      item: { id, folder: widgetType === 'folder', index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, index, widgetType]
  );

  // TODO: folder drag and drop 과 위젯 drag and drop 이동 로직 분리
  // TODO: folder 자식 위젯 간 이동 로직 추가
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ isOver, hovered }, drop] = useDrop(
    {
      accept: 'BOOKMARK',
      drop: async (item: { id: string; index: number }) => {
        try {
          if (item.index === index) {
            return;
          }
          console.log(`moveBookmark ${item.index} to ${index}`);
          await moveWidget(item.id, item.index, index);
        } catch (error) {
          console.error('Failed to move bookmark:', error);
        }
      },
      hover: (item: { id: string; index: number }) => {
        console.log(`hoverBookmark ${item.index} to ${index}`);
      },
      collect: (monitor) => ({ isOver: monitor.isOver(), hovered: monitor.getItem() }),
    },
    [id]
  );

  return (
    <Container
      id={id}
      span={span}
      isDragging={isDragging && !dragDisabled}
      ref={!dragDisabled ? drop : undefined}
      aria-colspan={span.column}
      aria-rowspan={span.row}
      {...rest}
    >
      <ChlidrenContainer ref={!dragDisabled ? drag : undefined} span={span} {...childrenProps}>
        {children}
      </ChlidrenContainer>
      <Name {...TitleProps}>{title}</Name>
    </Container>
  );
};

export default Widget;
