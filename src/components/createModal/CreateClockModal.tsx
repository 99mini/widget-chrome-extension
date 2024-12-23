import React, { useCallback, useState } from 'react';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from '@/components/ui/select';

import ClockWidget from '@/components/widget/ClockWidget';

import useWidget from '@/hook/useWidget';

import CreateWidgetModal from './_CreateWidgetModal';
import { InputContainer, InputLabelText } from '@/components/common/Modal';

import useThemeStore from '@/hook/useTheme';

import {
  CLOCK_FORMAT_OPTIONS,
  ClockFormatType,
  ClockWidgetType,
  SPAN_OPTIONS,
  SpanType,
  WidgetType,
} from '@/types/widget';

import { i18n } from '@/utils/string';

type CreateClockModalProps = {
  onClose: () => void;
};

const CreateClockModal: React.FC<CreateClockModalProps> = ({ onClose }) => {
  const {
    actions: { createWidget },
  } = useWidget();

  const { region } = useThemeStore();

  const [format, setFormat] = useState<ClockFormatType>('HH:mm');
  const [span, setSpan] = useState<SpanType>({ row: 1, column: 1 });
  const [title, setTitle] = useState(
    i18n(region, {
      ko: '시계',
      en: 'Clock',
    })
  );

  const [openSelectWidgetSize, setOpenSelectWidgetSize] = useState(false);
  const [openSelectClockFormat, setOpenSelectClockFormat] = useState(false);

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
      title={i18n(region, {
        ko: '시계 위젯 추가',
        en: 'Add Clock Widget',
      })}
      disabledClickAway={openSelectClockFormat || openSelectWidgetSize}
      PreviewWidget={
        <ClockWidget
          format={format}
          WidgetProps={{
            title:
              title ??
              i18n(region, {
                ko: '시계',
                en: 'Clock',
              }),
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
        <InputLabelText>
          {i18n(region, {
            ko: '위젯 이름',
            en: 'Widget Name',
          })}
        </InputLabelText>
        <Input type="text" placeholder={'Title'} value={title} onChange={(e) => setTitle(e.target.value)} />
      </InputContainer>
      <InputContainer>
        <InputLabelText>
          {i18n(region, {
            ko: '위젯 크기',
            en: 'Widget Size',
          })}
        </InputLabelText>
        <Select
          onValueChange={(e) => {
            const [row, column] = e.split('x').map((v) => parseInt(v));
            const selectedSpan = { row, column } as SpanType;
            setSpan(selectedSpan);

            if (row === 1) {
              if (column === 1 && format.endsWith('s')) {
                setFormat(
                  (prevFormat) =>
                    prevFormat
                      .replace(/y|[년|-]|M|[월|-]|d|[일|-]/g, '')
                      .replace(/s/g, '')
                      .replace(/:$/g, '')
                      .replace(/^\s*/g, '') as ClockFormatType
                );
              } else {
                setFormat(
                  (prevFormat) =>
                    prevFormat.replace(/y|[년|-]|M|[월|-]|d|[일|-]/g, '').replace(/^\s*/g, '') as ClockFormatType
                );
              }
            }
          }}
          onOpenChange={setOpenSelectWidgetSize}
          open={openSelectWidgetSize}
          value={`${span.row}x${span.column}`}
        >
          <SelectTrigger>
            <SelectValue placeholder={'1x1'} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>
                {i18n(region, {
                  ko: '위젯 크기',
                  en: 'Widget Size',
                })}
              </SelectLabel>
              {SPAN_OPTIONS.map((span) => (
                <SelectItem key={`${span.row}x${span.column}`} value={`${span.row}x${span.column}`}>
                  {`${span.row}x${span.column}`}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </InputContainer>
      <InputContainer>
        <InputLabelText>
          {i18n(region, {
            ko: '시간 형식',
            en: 'Clock Format',
          })}
        </InputLabelText>
        <Select
          onValueChange={(e) => {
            setFormat(e as ClockFormatType);
          }}
          onOpenChange={setOpenSelectClockFormat}
          open={openSelectClockFormat}
          value={format}
        >
          <SelectTrigger>
            <SelectValue placeholder={'HH:mm'} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>
                {i18n(region, {
                  ko: '시간 형식',
                  en: 'Clock Format',
                })}
              </SelectLabel>
              {CLOCK_FORMAT_OPTIONS.map((clockFormat) => {
                if (span.row === 1 && span.column === 1 && (clockFormat.startsWith('y') || clockFormat.endsWith('s'))) {
                  return null;
                }
                if (span.row === 1 && span.column === 2 && clockFormat.startsWith('y')) {
                  return null;
                }
                return (
                  <SelectItem key={clockFormat} value={clockFormat}>
                    {clockFormat}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </InputContainer>
    </CreateWidgetModal>
  );
};

export default CreateClockModal;
