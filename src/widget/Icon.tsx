import React from 'react';
import styled from '@emotion/styled';

type IconWidgetProps = {
  name: string;
  url: string;
  image: string;
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
`;

const Image = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 12px;
  object-fit: cover;
`;

const Name = styled.span`
  font-size: 12px;
  font-weight: 500;
`;

const IconWidget: React.FC<IconWidgetProps> = ({ name, url, image, onClick }) => {
  return (
    <Container>
      <Link href={url} onClick={onClick}>
        <ImageWrapper>
          <Image src={image} alt={name} />
        </ImageWrapper>
        <Name>{name}</Name>
      </Link>
    </Container>
  );
};

export default IconWidget;
