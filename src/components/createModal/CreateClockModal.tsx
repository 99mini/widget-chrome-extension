import React, { useCallback, useState } from 'react';

import { DropDownSelect, TextInput } from '@/components/common/input';
import ClockWidget, { ID } from '@/components/widget/clock/ClockWidget';

import useThemeStore from '@/hook/useTheme';
import useWidget from '@/hook/useWidget';

import {
  CLOCK_FORMAT_OPTIONS,
  ClockFormatType,
  ClockWidgetType,
  SPAN_OPTIONS,
  SpanType,
  WidgetType,
} from '@/lib/types/Widget';
import { i18n } from '@/lib/utils/string';

import CreateWidgetModal from './_CreateWidgetModal';

type CreateClockModalProps = {
  onClose: () => void;
  initialData?: {
    id: string;
    format?: ClockFormatType;
    span?: SpanType;
    title: string;
  };
};

const CreateClockModal: React.FC<CreateClockModalProps> = ({ onClose, initialData }) => {
  const {
    actions: { createWidget, updateWidget },
  } = useWidget();

  const { region } = useThemeStore();

  const [format, setFormat] = useState<ClockFormatType>(initialData?.format ?? 'HH:mm');
  const [span, setSpan] = useState<SpanType>(initialData?.span ?? { row: 1, column: 1 });
  const [title, setTitle] = useState(
    initialData?.title ??
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
        id: ID,
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

  const updateClockWidget = useCallback(
    async ({ format, span, title }: { format: ClockFormatType; span: SpanType; title: string }, id: string) => {
      updateWidget(id, {
        title,
        span,
        data: {
          format,
        },
      });
    },
    [updateWidget]
  );

  return (
    <CreateWidgetModal
      onClose={onClose}
      title={i18n(region, {
        ko: `시계 위젯 ${initialData ? '편집' : '추가'}`,
        en: `Clock Widget ${initialData ? 'Edit' : 'Add'}`,
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
      onConfirm={async () => {
        if (initialData) {
          await updateClockWidget(
            {
              format,
              span,
              title,
            },
            initialData.id
          );
        } else {
          await createClockWidget({
            format,
            span,
            title,
          });
        }
      }}
      isEdit={Boolean(initialData)}
      requireConfirm={title.length > 0}
    >
      <TextInput
        label={i18n(region, {
          ko: '위젯 이름',
          en: 'Widget Name',
        })}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <DropDownSelect
        label={i18n(region, {
          ko: '위젯 크기',
          en: 'Widget Size',
        })}
        onValueChange={(e) => {
          const [row, column] = e.split('x').map((v) => parseInt(v));
          const selectedSpan = { row, column } as SpanType;
          setSpan(selectedSpan);

          if (row === 1) {
            if (column === 1 && format.endsWith('s')) {
              setFormat(
                (prevFormat) =>
                  prevFormat
                    .replace(/y|-|M|-|d|-/g, '')
                    .replace(/s/g, '')
                    .replace(/:$/g, '')
                    .replace(/^\s*/g, '') as ClockFormatType
              );
            } else {
              setFormat((prevFormat) => prevFormat.replace(/y|-|M|-|d|-/g, '').replace(/^\s*/g, '') as ClockFormatType);
            }
          }
        }}
        onOpenChange={setOpenSelectWidgetSize}
        open={openSelectWidgetSize}
        value={`${span.row}x${span.column}`}
        placeholder="1x1"
        options={SPAN_OPTIONS.map((span) => `${span.row}x${span.column}`)}
      />
      <DropDownSelect
        label={i18n(region, {
          ko: '시간 형식',
          en: 'Clock Format',
        })}
        onValueChange={(e) => {
          setFormat(e as ClockFormatType);
        }}
        onOpenChange={setOpenSelectClockFormat}
        open={openSelectClockFormat}
        value={format}
        placeholder={'HH:mm'}
        options={CLOCK_FORMAT_OPTIONS.filter((clockFormat) => {
          if (span.row === 1 && span.column === 1 && (clockFormat.startsWith('y') || clockFormat.endsWith('s'))) {
            return false;
          }
          if (span.row === 1 && span.column === 2 && clockFormat.startsWith('y')) {
            return false;
          }
          return true;
        })}
      />
    </CreateWidgetModal>
  );
};

export default CreateClockModal;
