import React from 'react';
import styled from '@emotion/styled';
import { useDrag } from 'react-dnd';

const Container = styled.div<{ span: WidgetProps['span'] }>`
  width: ${({ span }) => `calc(132 * ${span?.coloumn})px`};

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  gap: 8px;

  text-decoration: none;
  color: inherit;
`;

const Name = styled.span`
  font-size: 12px;
  font-weight: 500;

  width: 120px;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

type WidgetProps = {
  span?:
    | {
        row: 1;
        coloumn: 1;
      }
    | {
        row: 1;
        coloumn: 2;
      }
    | {
        row: 2;
        coloumn: 2;
      };
  id: string;
  title: string;
  TitleProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Widget: React.FC<WidgetProps> = ({
  span = {
    row: 1,
    coloumn: 1,
  },
  id,
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
      {children}
      <Name {...TitleProps}>{title}</Name>
    </Container>
  );
};

export default Widget;
