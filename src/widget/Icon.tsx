import React from 'react';

import styled from '@emotion/styled';
import { PropsOf } from '@emotion/react';

import Widget from './Widget';

type IconWidgetProps = {
  id: string;
  title: string;
  url: string;
  image?: string | undefined;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  WidgetProps?: Partial<Omit<PropsOf<typeof Widget>, 'id'>>;
};

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
`;

const IconWidget: React.FC<IconWidgetProps> = ({ id, title, url, image, onClick, WidgetProps }) => {
  return (
    <Widget id={id} title={title} {...WidgetProps}>
      <Link href={url} onClick={onClick} title={title}>
        <ImageWrapper>
          <Image src={image} alt={title} />
        </ImageWrapper>
      </Link>
    </Widget>
  );
};

export default IconWidget;
