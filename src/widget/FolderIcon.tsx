import styled from '@emotion/styled';
import React from 'react';

type FolderIconProps = {
  title: string;
  imageUrls: string[];
};

const Container = styled.div`
  width: 132px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  gap: 8px;
`;

const IconContainer = styled.div`
  width: 44px;
  height: 44px;

  display: grid;

  grid-template-columns: repeat(3, 1fr);
  gap: 4px;

  background-color: #f0f0f0;
  border-radius: 12px;

  padding: 8px;
`;

const IconImage = styled.img`
  width: calc((44px - 8px) / 3);
  height: calc((44px - 8px) / 3);

  border-radius: 4px;
  object-fit: cover;
`;

const Name = styled.span`
  font-size: 12px;
  font-weight: 500;
`;

const FolderIcon: React.FC<FolderIconProps> = ({ title, imageUrls }) => {
  return (
    <Container>
      <IconContainer>
        {imageUrls.map((imageUrl) => (
          <IconImage key={imageUrl} src={imageUrl} alt={title} />
        ))}
      </IconContainer>
      <Name>{title}</Name>
    </Container>
  );
};

export default FolderIcon;
