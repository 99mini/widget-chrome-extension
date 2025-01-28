import React from 'react';

import styled from '@emotion/styled';

import { pickCss } from '@/utils/style';

const Container = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  padding: 0 36px;
  margin-top: 16px;

  margin-bottom: ${({ theme }) => pickCss(theme.sizes.footer, 'height')};
`;

const AdArea = () => {
  return <Container></Container>;
};

export default AdArea;
