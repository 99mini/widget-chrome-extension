import React from 'react';
import styled from '@emotion/styled';
import { useDrag } from 'react-dnd';

import { DefaultTheme } from '@/context/theme';

/**
 * @decryption 84
 */
const rowSpan1 =
  DefaultTheme.sizes.widget.icon + DefaultTheme.sizes.widget.textHeight + DefaultTheme.sizes.widget.textGap;

/**
 * @decryption 180
 */
const rowSpan2 =
  DefaultTheme.sizes.widget.icon * 2 +
  DefaultTheme.sizes.widget.rowGap +
  DefaultTheme.sizes.widget.textHeight +
  DefaultTheme.sizes.widget.textGap;

/**
 * @description 60
 */
const columnSpan1 = DefaultTheme.sizes.widget.icon;

/**
 * @description 156
 */
const columnSpan2 = DefaultTheme.sizes.widget.icon * 2 + DefaultTheme.sizes.widget.rowGap;

const Container = styled.div<{ span: Required<WidgetProps['span']> }>`
  width: ${({ span }) =>
    span?.column === 2
      ? // `calc(${theme.sizes.widget.icon}px * 2 + ${theme.sizes.widget.rowGap}px)`
        `${columnSpan2}px`
      : `${columnSpan1}px`};
  height: ${({ span }) =>
    span?.row === 2
      ? // `calc(${theme.sizes.widget.icon}px * 2 + ${theme.sizes.widget.rowGap}px + ${theme.sizes.widget.textHeight}px + ${theme.sizes.widget.textGap}px)`
        `${rowSpan2}px`
      : // `calc(${theme.sizes.widget.icon}px + ${theme.sizes.widget.textHeight}px + ${theme.sizes.widget.textGap}px)`}
        `${rowSpan1}px`};

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
`;

const ChlidrenContainer = styled.div<{ span: WidgetProps['span']; border?: boolean }>`
  display: flex;

  align-items: center;
  justify-content: center;

  width: 100%;
  height: ${({ span }) =>
    span?.row === 2
      ? // `calc(${theme.sizes.widget.icon}px * 2 + ${theme.sizes.widget.rowGap}px + ${theme.sizes.widget.textHeight}px + ${theme.sizes.widget.textGap}px)`
        `${columnSpan2}px`
      : `${columnSpan1}px`};

  box-sizing: border-box;

  ${({ border, theme }) =>
    border
      ? `
    border-radius: 16px;
    padding: 8px;
    border: 1px solid ${theme.colors.background};
    background-color: ${theme.colors.primary};
    color: ${theme.colors.text};
  `
      : ''}
`;

const Name = styled.span`
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;

  width: 84px;
  height: 16px;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

type WidgetProps = {
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
  const [, drag] = useDrag(() => ({
    type: 'BOOKMARK',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Container ref={drag} span={span} {...rest}>
      <ChlidrenContainer span={span} {...childrenProps}>
        {children}
      </ChlidrenContainer>
      <Name {...TitleProps}>{title}</Name>
    </Container>
  );
};

export default Widget;
