import React from 'react';
import styled from '@emotion/styled';
import { useDrag } from 'react-dnd';

const Container = styled.div<{ span: Required<WidgetProps['span']>; isDragging: boolean }>`
  width: ${({ span, theme }) =>
    span?.column === 2
      ? `${theme.sizes.widget.icon * 2 + theme.sizes.widget.rowGap}px`
      : `${theme.sizes.widget.icon}px`};
  height: ${({ span, theme }) =>
    span?.row === 2
      ? `${theme.sizes.widget.icon * 2 + theme.sizes.widget.rowGap + theme.sizes.widget.textHeight + theme.sizes.widget.textGap}px`
      : `${theme.sizes.widget.icon + theme.sizes.widget.textHeight + theme.sizes.widget.textGap}px`};

  ${({ span }) => (span?.row === 2 ? 'grid-row: span 2;' : '')}
  ${({ span }) => (span?.column === 2 ? 'grid-column: span 2;' : '')}

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
  height: ${({ span, theme }) =>
    span?.row === 2 ? `${theme.sizes.widget.icon * 2 + theme.sizes.widget.rowGap}px` : `${theme.sizes.widget.icon}px`};

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
  span?:
    | {
        row: 1;
        column: 1;
      }
    | {
        row: 1;
        column: 2;
      }
    | {
        row: 2;
        column: 2;
      };
  id: string;
  childrenProps?: { border?: boolean } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  title: string;
  TitleProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
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
    <Container ref={drag} span={span} isDragging={isDragging} {...rest}>
      <ChlidrenContainer span={span} {...childrenProps}>
        {children}
      </ChlidrenContainer>
      <Name {...TitleProps}>{title}</Name>
    </Container>
  );
};

export default Widget;
