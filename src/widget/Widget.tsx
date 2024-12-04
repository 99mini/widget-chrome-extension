import React from 'react';
import { useDrag } from 'react-dnd';

import styled from '@emotion/styled';

import { SpanType } from '@/types/Widget';

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

  box-sizing: border-box;

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

type WidgetProps = {
  folder?: boolean;
  span?: SpanType;
  id: string;
  childrenProps?: { border?: boolean } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  title: string;
  TitleProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
  dragDisabled?: boolean;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Widget: React.FC<WidgetProps> = ({
  folder,
  span = {
    row: 1,
    column: 1,
  },
  id,
  childrenProps,
  title,
  TitleProps,
  dragDisabled,
  children,
  ...rest
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'BOOKMARK',
      item: { id, folder: Boolean(folder) },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, folder]
  );

  return (
    <Container span={span} isDragging={isDragging && !dragDisabled} {...rest}>
      <ChlidrenContainer ref={!dragDisabled ? drag : undefined} span={span} {...childrenProps}>
        {children}
      </ChlidrenContainer>
      <Name {...TitleProps}>{title}</Name>
    </Container>
  );
};

export default Widget;
