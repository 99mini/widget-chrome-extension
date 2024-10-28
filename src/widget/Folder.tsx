import React from 'react';
import styled from '@emotion/styled';

type FolderProps = {
  children: React.ReactNode;
};

// 3 by 3 grid
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;

  padding: 8px;

  background-color: #f0f0f0;
  border-radius: 8px;
`;

const Folder: React.FC<FolderProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Folder;
