import React from 'react';
import styled from '@emotion/styled';

type LayoutProps = {
  children: React.ReactNode;
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Layout;
