import styled from '@emotion/styled';
import React from 'react';

type FolderIconProps = {
  title: string;
  bookmarks: {
    id: string;
    imageUrl: string;
  }[];
  isOver?: boolean;
};

const Container = styled.div`
  width: 132px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  gap: 8px;
`;

const IconContainer = styled.div<{ isOver?: boolean }>`
  width: 44px;
  height: 44px;

  display: grid;

  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 4px;

  background-color: #f0f0f0;
  border-radius: 16px;

  padding: 8px;

  ${({ isOver }) =>
    isOver &&
    `
  scale: 1.1;
  transition: scale 237ms;
  `}
`;

const IconImage = styled.img`
  width: calc((44px - 8px) / 3);
  height: calc((44px - 8px) / 3);

  border-radius: 4px;
  object-fit: cover;
`;

const Name = styled.span<{ isOver?: boolean }>`
  font-size: 12px;
  font-weight: 500;

  ${({ isOver }) =>
    isOver &&
    `
    opacity: 0;
    transition: opacity 237ms;
  `}
`;

const FolderIcon: React.FC<FolderIconProps> = ({ title, bookmarks, isOver }) => {
  return (
    <Container>
      <IconContainer isOver={isOver}>
        {bookmarks.slice(0, 9).map(({ id, imageUrl }) => (
          <IconImage key={id} src={imageUrl} alt={title} />
        ))}
      </IconContainer>
      <Name isOver={isOver}>{title}</Name>
    </Container>
  );
};

export default FolderIcon;
