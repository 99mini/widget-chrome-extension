import { omit } from 'es-toolkit';

import React, { useMemo } from 'react';

import { HistoryWidgetType, WidgetType } from '@/types/Widget';

import Widget, { WidgetProps } from '../Widget';

const ID = 'history' as const;

type HistoryWidgetProps = {
  index: number;
  historyList: HistoryWidgetType['historyList'];
  WidgetProps?: Partial<Omit<WidgetProps, 'id'>>;
};

const HistoryWidget = ({ index, historyList, WidgetProps }: HistoryWidgetProps) => {
  const widgetData: WidgetType<HistoryWidgetType> = useMemo(
    () => ({
      ...WidgetProps,
      id: `${ID}-${WidgetProps?.span?.row}-${WidgetProps?.span?.column}`,
      index,
      title: 'History',
      widgetType: 'history',
      data: {
        historyList,
      },
    }),
    [WidgetProps, historyList, index]
  );
  return (
    <Widget {...omit(widgetData, ['data'])}>
      <ul>
        {historyList.map((history) => (
          <li key={history.id}>
            <a href={history.url} target="_blank" rel="noreferrer">
              {history.title}
            </a>
          </li>
        ))}
      </ul>
    </Widget>
  );
};

export default HistoryWidget;
