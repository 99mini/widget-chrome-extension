import { omit } from 'es-toolkit';

import React, { useMemo } from 'react';

import styled from '@emotion/styled';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import useThemeStore from '@/hook/useTheme';

import { formatDate } from '@/utils/day';
import { i18n } from '@/utils/string';
import { calcWidgetWidth } from '@/utils/style';

import { HistoryWidgetType, SpanType, WidgetType } from '@/types/Widget';

import Widget, { WidgetProps } from '../Widget';

const Container = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const HistoryItemList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;

  height: 100%;
`;

const HistoryItem = styled.li<{ span?: SpanType }>`
  width: ${({ span, theme }) => calcWidgetWidth(span?.column, theme)};

  padding: 0 16px;

  & > button {
    width: 100%;
  }
`;

const HistoryLink = styled.a`
  color: ${({ theme }) => theme.colors.text};

  display: flex;
  flex-direction: row;

  gap: 8px;
`;

const VisitedTime = styled.span`
  color: ${({ theme }) => theme.colors.textDisabled};
  font-size: 14px;
`;

const HistoryTitle = styled.span<{ full?: boolean }>`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;

  ${({ full, theme }) =>
    !full
      ? `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `
      : `
    color: ${theme.colors.white};
  `}
`;

const VistiedTooltipContent = styled(TooltipContent)`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  gap: 4px;
`;

const ID = 'history' as const;

type HistoryWidgetProps = {
  index: number;
  historyList: HistoryWidgetType['historyList'];
  WidgetProps?: Partial<Omit<WidgetProps, 'id'>>;
};

const HistoryWidget = ({ index, historyList, WidgetProps }: HistoryWidgetProps) => {
  const { region } = useThemeStore();
  const widgetData: WidgetType<HistoryWidgetType> = useMemo(
    () => ({
      ...WidgetProps,
      id: `${ID}-${WidgetProps?.span?.row}-${WidgetProps?.span?.column}`,
      index,
      title: WidgetProps?.title || i18n(region, { ko: '최근 방문한 사이트', en: 'Recently visited sites' }),
      widgetType: 'history',
      data: {
        historyList,
      },
      childrenProps: {
        border: true,
        scroll: true,
      },
    }),
    [WidgetProps, historyList, index, region]
  );
  return (
    <Widget {...omit(widgetData, ['data'])}>
      <TooltipProvider>
        <Container>
          <HistoryItemList>
            {historyList.map((history) => (
              <HistoryItem key={history.id} span={WidgetProps?.span}>
                <Tooltip>
                  <TooltipTrigger>
                    <HistoryLink href={history.url} target="_blank" rel="noreferrer">
                      <HistoryTitle>{history.title}</HistoryTitle>
                    </HistoryLink>
                  </TooltipTrigger>
                  {history.lastVisitTime && (
                    <VistiedTooltipContent>
                      <HistoryTitle full>{history.title}</HistoryTitle>
                      <VisitedTime>{formatDate(history.lastVisitTime, 'yy.MM.dd HH:mm:ss')}</VisitedTime>
                    </VistiedTooltipContent>
                  )}
                </Tooltip>
              </HistoryItem>
            ))}
          </HistoryItemList>
        </Container>
      </TooltipProvider>
    </Widget>
  );
};

export default HistoryWidget;
