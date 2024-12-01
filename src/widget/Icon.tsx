import React from 'react';
import styled from '@emotion/styled';
import { useDrag } from 'react-dnd';

import Widget from './Widget';

type IconWidgetProps = {
  id: string;
  title: string;
  url: string;
  image?: string | undefined;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

const Link = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  gap: 8px;

  text-decoration: none;
  color: inherit;
`;

const ImageWrapper = styled.div`
  width: calc(44px + 16px);
  height: calc(44px + 16px);

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.backgroundPalette[200]};
  border-radius: 16px;
`;

const Image = styled.img`
  width: max-content;
  height: max-content;

  max-width: 44px;
  max-height: 44px;

  border-radius: 16px;
  object-fit: cover;
`;

const IconWidget: React.FC<IconWidgetProps> = ({ id, title, url, image, onClick }) => {
  const [{ isDragging }] = useDrag(() => ({
    type: 'BOOKMARK',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Widget id={id} style={{ opacity: isDragging ? 0.5 : 1 }} title={title}>
      <Link href={url} onClick={onClick} title={title}>
        <ImageWrapper>
          <Image src={image} alt={title} />
        </ImageWrapper>
      </Link>
    </Widget>
  );
};

export default IconWidget;
