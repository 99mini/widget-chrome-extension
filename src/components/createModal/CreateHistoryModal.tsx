import React, { useCallback, useState } from 'react';

import { InputContainer, InputLabelText } from '@/components/common/modal/Modal.style';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import HistoryWidget, { ID } from '@/components/widget/history/HistoryWidget';

import useThemeStore from '@/hook/useTheme';
import useWidget from '@/hook/useWidget';

import { i18n } from '@/utils/string';

import { HistoryWidgetType, SPAN_OPTIONS, SpanType, WidgetType } from '@/types/Widget';

import CreateWidgetModal from './_CreateWidgetModal';

type CreateHistoryModalProps = {
  onClose: () => void;
  initialData?: {
    span?: SpanType;
    title?: string;
    maxResults?: number;
  };
};

const CreateHistoryModal = ({ onClose, initialData }: CreateHistoryModalProps) => {
  const {
    actions: { createWidget },
  } = useWidget();

  const { region } = useThemeStore();

  const [span, setSpan] = useState<SpanType>(initialData?.span ?? { row: 2, column: 2 });
  const [title, setTitle] = useState(
    initialData?.title ??
      i18n(region, {
        ko: '최근 방문한 사이트',
        en: 'Recently Visited Sites',
      })
  );
  const [maxResults, setMaxResults] = useState(initialData?.maxResults ?? 10);

  const [openSelectWidgetSize, setOpenSelectWidgetSize] = useState(false);

  const createHistoryWidget = useCallback(
    async ({ span, title, maxResults }: { span: SpanType; title: string; maxResults?: number }) => {
      const newHistoryWidget: Omit<WidgetType<HistoryWidgetType>, 'index'> = {
        id: `${ID}-${span.row}-${span.column}`,
        title,
        widgetType: 'history',
        span,
        data: {
          historyList: [],
          maxResults,
        },
      };
      createWidget(newHistoryWidget);
    },
    [createWidget]
  );

  return (
    <CreateWidgetModal
      onClose={onClose}
      title={i18n(region, {
        ko: '최근 방문 사이트 위젯 추가',
        en: 'Add Recently Visited Sites Widget',
      })}
      disabledClickAway={openSelectWidgetSize}
      PreviewWidget={
        <HistoryWidget
          index={-1}
          disabled
          maxResults={maxResults}
          WidgetProps={{
            title:
              title ??
              i18n(region, {
                ko: '최근 방문한 사이트',
                en: 'Recently Visited Sites',
              }),
            span,
          }}
        />
      }
      onConfirm={async () => {
        await createHistoryWidget({ span, title, maxResults });
      }}
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
          }}
          onOpenChange={setOpenSelectWidgetSize}
          open={openSelectWidgetSize}
          value={`${span.row}x${span.column}`}
        >
          <SelectTrigger>
            <SelectValue placeholder={'2x2'} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>
                {i18n(region, {
                  ko: '위젯 크기',
                  en: 'Widget Size',
                })}
              </SelectLabel>
              {SPAN_OPTIONS.map((span) => {
                if (span.row === 1 && span.column === 1) {
                  return null;
                }
                return (
                  <SelectItem key={`${span.row}x${span.column}`} value={`${span.row}x${span.column}`}>
                    {`${span.row}x${span.column}`}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </InputContainer>
      <InputContainer>
        <InputLabelText>
          {i18n(region, {
            ko: '표시할 최대 사이트 수',
            en: 'Maximum number of sites to display',
          })}
        </InputLabelText>
        <Input
          type="number"
          placeholder={'maxResults'}
          value={maxResults}
          onChange={(e) => {
            setMaxResults(parseInt(e.target.value));
          }}
        />
      </InputContainer>
    </CreateWidgetModal>
  );
};

export default CreateHistoryModal;
