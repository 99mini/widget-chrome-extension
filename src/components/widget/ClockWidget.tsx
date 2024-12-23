import React, { useEffect, useMemo, useState } from 'react';

import styled from '@emotion/styled';

import useThemeStore from '@/hook/useTheme';

import { formatDate } from '@/utils/day';
import { i18n } from '@/utils/string';

import { ClockWidgetType } from '@/types/widget';

import Widget, { WidgetProps } from './Widget';

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

const ID = 'clock' as const;

type ClockClockWidgetProps = {
  index?: number;
  WidgetProps?: Partial<Omit<WidgetProps, 'id'>>;
} & ClockWidgetType;

const ClockWidget: React.FC<ClockClockWidgetProps> = ({
  index,
  WidgetProps,
  format = 'yyyy년 MM월 dd일 a h:mm:ss',
}) => {
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

  const timeFormat = format
    .replace(/y/g, '')
    .replace(/M/g, '')
    .replace(/d/g, '')
    .replace(/년|월|일/g, '')
    .replace(/-/g, '');

  const dayFormat = format
    .replace(/[h|H]/g, '')
    .replace(/m/g, '')
    .replace(/s/g, '')
    .replace(/:/g, '')
    .replace(/a/g, '');

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [format]);

  return (
    <Widget
      id={`${ID}-${defalutWidgetProps.span?.row}-${defalutWidgetProps.span?.column}`}
      index={index ?? -1}
      title={
        defalutWidgetProps.title ??
        i18n(region, {
          ko: '시계',
          en: 'Clock',
        })
      }
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
    </Widget>
  );
};

export default ClockWidget;
