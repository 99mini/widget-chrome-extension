import React from 'react';

import styled from '@emotion/styled';

import { getRecentlyVisitedSites } from '@/chrome/history';
import { getRecentlyClosedTabList } from '@/chrome/sessions';

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

const AdArea: React.FC = () => {
  return (
    <Container>
      <button
        onClick={() => {
          getRecentlyClosedTabList().then((tabs) => {
            console.log(tabs);
          });
        }}
      >
        recently tab
      </button>
      <button
        onClick={() => {
          getRecentlyVisitedSites().then((sites) => {
            console.log(sites);
          });
        }}
      >
        history
      </button>
    </Container>
  );
};

export default AdArea;
