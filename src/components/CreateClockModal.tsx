import React, { useCallback, useState } from 'react';

import Clock from '@/widget/Clock';

import useWidget from '@/hook/useWidget';

import { ClockFormatType, ClockWidgetType, SpanType, WidgetType } from '@/types/Widget';
import CreateWidgetModal from './CreateWidgetModal';
import { InputContainer, InputLabelText } from './common/Modal';

type CreateClockModalProps = {
  onClose: () => void;
};

const CreateClockModal: React.FC<CreateClockModalProps> = ({ onClose }) => {
  const [format, setFormat] = useState<ClockFormatType>('HH:mm');
  const [span, setSpan] = useState<SpanType>({ row: 1, column: 1 });
  const [title, setTitle] = useState('시계');

  const {
    actions: { createWidget },
  } = useWidget();

  const createClockWidget = useCallback(
    async ({ format, span, title }: { format: ClockFormatType; span: SpanType; title: string }) => {
      const newClockWidget: Omit<WidgetType<ClockWidgetType>, 'index'> = {
        id: `clock-${span.row}-${span.column}`,
        title,
        widgetType: 'clock',
        span,
        data: {
          format,
        },
      };
      createWidget(newClockWidget);
    },
    [createWidget]
  );
  return (
    <CreateWidgetModal
      onClose={onClose}
      title="시계 위젯 추가"
      PreviewWidget={
        <Clock
          format={format}
          WidgetProps={{
            title: title || '시계',
            span,
          }}
        />
      }
      onConfirm={async () =>
        await createClockWidget({
          format,
          span,
          title,
        })
      }
    >
      <InputContainer>
        <InputLabelText>{'위젯 이름'}</InputLabelText>
        {/* TODO: 공용 input 위젯 구현  */}
        <input type="text" placeholder={'Title'} value={title} onChange={(e) => setTitle(e.target.value)} />
      </InputContainer>
      <InputContainer>
        <InputLabelText>{'시간 형식'}</InputLabelText>
        {/* TODO: 공용 select 위젯 구현 */}
        <select
          value={format}
          onChange={(e) => {
            setFormat(e.target.value as ClockFormatType);
          }}
        >
          {['HH:mm:ss', 'HH:mm', 'a h:mm:ss', 'a h:mm', 'yyyy년 MM월 dd일 a h:mm:ss', 'yyyy년 MM월 dd일 a h:mm'].map(
            (clockFormat) => {
              if (span.row === 1 && span.column === 1 && (clockFormat.startsWith('y') || clockFormat.endsWith('s'))) {
                return null;
              }
              return (
                <option key={clockFormat} value={clockFormat}>
                  {clockFormat}
                </option>
              );
            }
          )}
        </select>
      </InputContainer>
      <InputContainer>
        <InputLabelText>{'위젯 크기'}</InputLabelText>
        <select
          value={`${span.row}x${span.column}`}
          onChange={(e) => {
            const [row, column] = e.target.value.split('x').map((v) => parseInt(v));
            const selectedSpan = { row, column } as SpanType;
            setSpan(selectedSpan);
          }}
        >
          <option value={'1x1'}>{'1x1'}</option>
          <option value={'1x2'}>{'1x2'}</option>
          <option value={'2x2'}>{'2x2'}</option>
          <option value={'2x4'}>{'2x4'}</option>
          <option value={'4x4'}>{'4x4'}</option>
        </select>
      </InputContainer>
    </CreateWidgetModal>
  );
};

export default CreateClockModal;
