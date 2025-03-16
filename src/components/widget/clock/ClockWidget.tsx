import React, { useEffect, useMemo, useState } from 'react';

import styled from '@emotion/styled';

import EditWidgetMenu from '@/components/common/EditWidgetMenu';

import useThemeStore from '@/hook/useTheme';

import { formatDate } from '@/utils/day';
import { i18n } from '@/utils/string';

import { ClockWidgetType, WidgetType } from '@/types/Widget';

import Widget, { WidgetProps } from '../root/Widget';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 4px;

  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  text-align: center;

  box-sizing: border-box;
`;

const TimeContainer = styled.div<{ isColSpan?: boolean }>`
  font-size: ${({ isColSpan }) => (isColSpan ? '18px' : '14px')};
`;

const DateContainer = styled.div`
  font-size: 14px;
`;

export const ID = 'clock' as const;

type ClockClockWidgetProps = {
  index?: number;
  WidgetProps?: Partial<WidgetProps>;
} & ClockWidgetType;

const ClockWidget: React.FC<ClockClockWidgetProps> = ({ index, WidgetProps, format = 'yyyy-MM-dd a h:mm:ss' }) => {
  const { region } = useThemeStore();

  const defalutWidgetProps: ClockClockWidgetProps['WidgetProps'] = useMemo(
    () => ({
      title: WidgetProps?.title ?? i18n(region, { ko: '시계', en: 'Clock' }),
      span: WidgetProps?.span ?? {
        row: 2,
        column: 2,
      },
      ...WidgetProps,
    }),
    [WidgetProps, region]
  );

  const [time, setTime] = useState<Date>(new Date());

  const hasDay = format[0] === 'y';

  const timeFormat = format.replace(/y/g, '').replace(/M/g, '').replace(/d/g, '').replace(/-/g, '');

  const dayFormat = format
    .replace(/[h|H]/g, '')
    .replace(/m/g, '')
    .replace(/s/g, '')
    .replace(/:/g, '')
    .replace(/a/g, '');

  const widgetData: WidgetType<ClockWidgetType> = useMemo(
    () => ({
      ...WidgetProps,
      id: WidgetProps?.id ?? ID,
      index: index ?? -1,
      title: defalutWidgetProps.title ?? i18n(region, { ko: '시계', en: 'Clock' }),
      widgetType: 'clock',
      span: defalutWidgetProps.span,
      data: {
        format,
      },
    }),
    [WidgetProps, defalutWidgetProps.span, defalutWidgetProps.title, format, index, region]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [format]);

  return (
    <Widget
      id={widgetData.id}
      index={widgetData.index}
      title={widgetData.title}
      widgetType="clock"
      childrenProps={{
        border: true,
      }}
      {...defalutWidgetProps}
    >
      <Container>
        <TimeContainer isColSpan={defalutWidgetProps.span?.column && defalutWidgetProps.span.column > 1}>
          {formatDate(time, timeFormat, region)}
        </TimeContainer>
        {hasDay && <DateContainer>{formatDate(time, dayFormat, region)}</DateContainer>}
      </Container>
      <EditWidgetMenu widget={widgetData} />
    </Widget>
  );
};

export default ClockWidget;
