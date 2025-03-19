import React from 'react';

import styled from '@emotion/styled';

import useThemeStore from '@/hook/useTheme';

import { getIconPath } from '@/lib/utils/icon';

import Widget from '../root/Widget';

const IconContainer = styled.div<{ isOver?: boolean }>`
  width: 44px;
  height: 44px;

  display: grid;

  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 4px;

  background-color: ${({ theme }) => theme.colors.backgroundPalette[200]};
  border-radius: 16px;

  padding: 8px;

  box-sizing: initial;

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
  index: number;
  title: string;
  bookmarks: {
    id: string;
    imageUrl?: string | undefined;
  }[];
  isOver?: boolean;
};

const FolderIcon: React.FC<FolderIconProps> = ({ id, index, title, bookmarks, isOver }) => {
  const { mode } = useThemeStore();

  return (
    <Widget
      id={id}
      index={index}
      title={title}
      widgetType="folder"
      TitleProps={{
        style: isOver ? { opacity: 0, transition: 'opacity 237ms' } : undefined,
      }}
    >
      <IconContainer isOver={isOver}>
        {bookmarks.slice(0, 9).map(({ id, imageUrl }) => (
          <IconImage
            key={id}
            src={imageUrl}
            alt={title}
            onError={(e) => (e.currentTarget.src = getIconPath(mode === 'light' ? 'widgets_light_64' : 'widgets_64'))}
          />
        ))}
      </IconContainer>
    </Widget>
  );
};

export default FolderIcon;
