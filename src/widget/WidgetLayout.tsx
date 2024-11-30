import React from 'react';
import styled from '@emotion/styled';

type WidgetLayoutProps = {
  children: React.ReactNode;
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  gap: 36px;

  padding: 36px;
`;

const WidgetLayout: React.FC<WidgetLayoutProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default WidgetLayout;
