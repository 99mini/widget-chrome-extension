import styled from '@emotion/styled';
import React from 'react';

import Widget from './Widget';

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

type FolderIconProps = {
  id: string;
  title: string;
  bookmarks: {
    id: string;
    imageUrl?: string | undefined;
  }[];
  isOver?: boolean;
};

const FolderIcon: React.FC<FolderIconProps> = ({ id, title, bookmarks, isOver }) => {
  return (
    <Widget
      id={id}
      title={title}
      TitleProps={{
        style: isOver ? { opacity: 0, transition: 'opacity 237ms' } : undefined,
      }}
    >
      <IconContainer isOver={isOver}>
        {bookmarks.slice(0, 9).map(({ id, imageUrl }) => (
          <IconImage key={id} src={imageUrl} alt={title} />
        ))}
      </IconContainer>
    </Widget>
  );
};

export default FolderIcon;
