import React, { useEffect } from 'react';

import styled from '@emotion/styled';

import { getRecentlyVisitedSites } from '@/chrome/history';

import { pickCss } from '@/utils/style';

import HistoryWidget from './widget/history/HistoryWidget';

const Container = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  padding: 0 36px;
  margin-top: 16px;

  margin-bottom: ${({ theme }) => pickCss(theme.sizes.footer, 'height')};
`;

// TODO: remove historyList
const AdArea: React.FC = () => {
  const [historyList, setHistoryList] = React.useState<chrome.history.HistoryItem[]>([]);
  useEffect(() => {
    getRecentlyVisitedSites().then((historyList) => {
      setHistoryList(historyList);
      console.log(historyList);
    });
  }, []);
  return (
    <Container>
      <HistoryWidget
        index={0}
        historyList={historyList}
        WidgetProps={{
          title: '최근 방문한 사이트',
          span: {
            row: 2,
            column: 4,
          },
        }}
      />
    </Container>
  );
};

export default AdArea;
