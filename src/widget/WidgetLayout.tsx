import React from 'react';
import styled from '@emotion/styled';

type WidgetLayoutProps = {
  children: React.ReactNode;
};

const Container = styled.div`
  display: grid;
  justify-content: center;

  gap: ${({ theme }) => `${theme.sizes.widget.columnGap}px ${theme.sizes.widget.rowGap}px `};

  padding: 36px;

  grid-template-columns: repeat(auto-fill, 60px);
`;

const WidgetLayout: React.FC<WidgetLayoutProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default WidgetLayout;
