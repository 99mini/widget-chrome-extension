import React from 'react';
import styled from '@emotion/styled';
import { useDrag } from 'react-dnd';

type IconWidgetProps = {
  id: string;
  title: string;
  url: string;
  image?: string | undefined;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

// TODO: IconWidget과 FolderIcon을 합쳐서 IconWidget으로 통합
const Container = styled.div`
  width: 132px;
`;

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

  background-color: #f5f5f5;
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

const Name = styled.span`
  font-size: 12px;
  font-weight: 500;

  width: 120px;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const IconWidget: React.FC<IconWidgetProps> = ({ id, title, url, image, onClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BOOKMARK',
    item: { id, url },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Container ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Link href={url} onClick={onClick}>
        <ImageWrapper>
          <Image src={image} alt={title} />
        </ImageWrapper>
        <Name>{title}</Name>
      </Link>
    </Container>
  );
};

export default IconWidget;
