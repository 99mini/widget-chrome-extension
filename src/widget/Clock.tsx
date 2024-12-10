import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { PropsOf } from '@emotion/react';

import Widget from './Widget';

import { formatDate } from '@/utils/day';

import useThemeStore from '@/hook/useTheme';

import { ClockWidgetType } from '@/types/Widget';

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

  font-family: 'Roboto Mono', monospace;
`;

const TimeContainer = styled.div<{ isColSpan?: boolean }>`
  font-size: ${({ isColSpan }) => (isColSpan ? '18px' : '14px')};
`;

const DateContainer = styled.div`
  font-size: 14px;
`;

const ID = 'clock' as const;

type ClockProps = {
  index?: number;
  WidgetProps?: Partial<Omit<PropsOf<typeof Widget>, 'id'>>;
} & ClockWidgetType;

const Clock: React.FC<ClockProps> = ({ index, WidgetProps, format = 'yyyy년 MM월 dd일 a h:mm:ss' }) => {
  const { region } = useThemeStore();

  const defalutWidgetProps: ClockProps['WidgetProps'] = useMemo(
    () => ({
      title: (WidgetProps?.title ?? region === 'ko') ? '시계' : 'Clock',
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
      title={(defalutWidgetProps.title ?? region === 'ko') ? '시계' : 'Clock'}
      childrenProps={{
        border: true,
      }}
      {...defalutWidgetProps}
    >
      <Container>
        <TimeContainer isColSpan={defalutWidgetProps.span?.column && defalutWidgetProps.span.column > 1}>
          {formatDate(time, timeFormat)}
        </TimeContainer>
        {hasDay && <DateContainer>{formatDate(time, dayFormat)}</DateContainer>}
      </Container>
    </Widget>
  );
};

export default Clock;
