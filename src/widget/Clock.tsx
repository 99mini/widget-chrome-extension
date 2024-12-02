import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { PropsOf } from '@emotion/react';

import Widget from './Widget';

import { formatDate } from '@/utils/day';

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

type TimeFormat = 'HH:mm:ss' | 'HH:mm' | 'a HH:mm:ss' | 'a HH:mm';
type DateFormat = 'yyyy-MM-dd' | 'yyyy년 MM월 dd일';

type DateTimeFormat = `${DateFormat} ${TimeFormat}` | `${DateFormat} ${Exclude<TimeFormat, 'a HH:mm:ss' | 'a HH:mm'>}`;

type Format = TimeFormat | DateTimeFormat;

type ClockProps = {
  WidgetProps?: Partial<Omit<PropsOf<typeof Widget>, 'id'>>;
  format?: Format;
};

const Clock: React.FC<ClockProps> = ({
  WidgetProps = {
    title: 'Clock',
    span: {
      row: 2,
      column: 2,
    },
  },
  format = 'yyyy년 MM월 dd일 a HH:mm:ss',
}) => {
  const [time, setTime] = useState<Date>(new Date());

  const hasDay = format[0] === 'y';

  const timeFormat = format
    .replace(/y/g, '')
    .replace(/M/g, '')
    .replace(/d/g, '')
    .replace(/년|월|일/g, '')
    .replace(/-/g, '');

  const dayFormat = format.replace(/H/g, '').replace(/m/g, '').replace(/s/g, '').replace(/:/g, '').replace(/a/g, '');

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [format]);

  return (
    <Widget
      id={`${ID}-${WidgetProps.span?.row}-${WidgetProps.span?.column}`}
      title={'시계'}
      childrenProps={{
        border: true,
      }}
      {...WidgetProps}
    >
      <Container>
        <TimeContainer isColSpan={WidgetProps.span?.column === 2}>{formatDate(time, timeFormat)}</TimeContainer>
        {hasDay && <DateContainer>{formatDate(time, dayFormat)}</DateContainer>}
      </Container>
    </Widget>
  );
};

export default Clock;
