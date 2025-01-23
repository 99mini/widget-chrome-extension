import React, { useCallback, useState } from 'react';

import { TextInput } from '@/components/common/input';
import HistoryWidget, { ID } from '@/components/widget/history/HistoryWidget';

import useThemeStore from '@/hook/useTheme';
import useWidget from '@/hook/useWidget';

import { i18n } from '@/utils/string';

import { HistoryWidgetType, SpanType, WidgetType } from '@/types/Widget';

import CreateWidgetModal from './_CreateWidgetModal';
import WidgetSizeSelect from './common/WidgetSizeSelect';

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
      requireConfirm={title.length > 0}
      onConfirm={async () => {
        await createHistoryWidget({ span, title, maxResults });
      }}
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
      <WidgetSizeSelect
        placeholder={i18n(region, {
          ko: '위젯 크기',
          en: 'Widget Size',
        })}
        span={span}
        setSpan={setSpan}
        onOpenChange={setOpenSelectWidgetSize}
        open={openSelectWidgetSize}
        filter={(span) => {
          return !(span.row === 1 && span.column === 1);
        }}
      />
      <TextInput
        label={i18n(region, {
          ko: '표시할 최대 사이트 수',
          en: 'Maximum number of sites to display',
        })}
        placeholder="10"
        type="number"
        value={maxResults}
        onChange={(e) => setMaxResults(parseInt(e.target.value))}
      />
    </CreateWidgetModal>
  );
};

export default CreateHistoryModal;
