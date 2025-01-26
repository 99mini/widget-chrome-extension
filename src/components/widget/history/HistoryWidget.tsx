import { omit } from 'es-toolkit';

import React, { useEffect, useMemo, useState } from 'react';

import styled from '@emotion/styled';

import { getRecentlyVisitedSites } from '@/chrome/history';

import EditWidgetMenu from '@/components/common/EditWidgetMenu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import useThemeStore from '@/hook/useTheme';

import { formatDate } from '@/utils/day';
import { i18n } from '@/utils/string';

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
  width: 100%;

  padding: 0 8px;
  box-sizing: border-box;

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

export const ID = 'history' as const;

type HistoryWidgetProps = {
  index: number;
  disabled?: boolean;
  maxResults?: number;
  WidgetProps?: Partial<WidgetProps>;
};

const HistoryWidget = ({ index, disabled, maxResults, WidgetProps }: HistoryWidgetProps) => {
  const { region } = useThemeStore();

  const [historyList, setHistoryList] = useState<HistoryWidgetType['historyList']>([]);

  const widgetData: WidgetType<HistoryWidgetType> = useMemo(
    () => ({
      ...WidgetProps,
      id: WidgetProps?.id ?? ID,
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

  useEffect(() => {
    const fetchHistoryList = async () => {
      const historyList = await getRecentlyVisitedSites({ maxResults });
      setHistoryList(historyList);
    };
    fetchHistoryList();
  }, [maxResults]);

  return (
    <Widget {...omit(widgetData, ['data'])}>
      <Container>
        <TooltipProvider>
          <HistoryItemList>
            {historyList.map((history) => (
              <HistoryItem key={history.id} span={WidgetProps?.span}>
                <Tooltip>
                  <TooltipTrigger>
                    <HistoryLink
                      href={history.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-disabled={disabled}
                      onClick={(e) => {
                        if (disabled) {
                          e.preventDefault();
                        }
                      }}
                    >
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
        </TooltipProvider>
      </Container>
      <EditWidgetMenu widget={widgetData} />
    </Widget>
  );
};

export default HistoryWidget;
