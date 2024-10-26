import React from 'react';
import styled from '@emotion/styled';

type IconWidgetProps = {
  name: string;
  url: string;
  image: string;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 80px;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  display: flex;
  gap: 8px;
  flex-direction: column;
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  object-fit: cover;
`;

const Name = styled.span`
  font-size: 12px;
  font-weight: 500;
`;

const IconWidget = ({ name, url, image }: IconWidgetProps) => {
  return (
    <Container>
      <Link href={url}>
        <Image src={image} alt={name} />
        <Name>{name}</Name>
      </Link>
    </Container>
  );
};

export default IconWidget;
