import { PropsOf } from '@emotion/react';
import React from 'react';

import styled from '@emotion/styled';

import useThemeStore from '@/hook/useTheme';

import { getIconPath } from '@/utils/icon';

import Widget from './Widget';

const Link = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  gap: 8px;

  text-decoration: none;
  color: inherit;

  border-radius: 16px;
`;

const ImageWrapper = styled.div`
  width: calc(44px + 16px);
  height: calc(44px + 16px);

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.backgroundPalette[200]};
  border-radius: inherit;
`;

const Image = styled.img`
  width: max-content;
  height: max-content;

  max-width: 44px;
  max-height: 44px;

  border-radius: inherit;
  object-fit: cover;

  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
`;

type IconWidgetProps = {
  id: string;
  index?: number;
  title: string;
  url?: string;
  image?: string | undefined;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  WidgetProps?: Partial<Omit<PropsOf<typeof Widget>, 'id'>>;
};

const IconWidget: React.FC<IconWidgetProps> = ({ id, index, title, url, image, onClick, WidgetProps }) => {
  const { mode } = useThemeStore();
  return (
    <Widget id={id} title={title} index={index ?? -1} {...WidgetProps}>
      <Link href={url} onClick={onClick} title={title} as={url ? 'a' : 'div'}>
        <ImageWrapper>
          <Image
            src={image}
            alt={title}
            onError={(e) => (e.currentTarget.src = getIconPath(mode === 'light' ? 'widgets_light_64' : 'widgets_64'))}
          />
        </ImageWrapper>
      </Link>
    </Widget>
  );
};

export default IconWidget;
