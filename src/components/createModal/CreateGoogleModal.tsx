import React, { useCallback, useState } from 'react';

import { TextInput } from '@/components/common/input';
import { GoogleSearchWidget } from '@/components/widget/google';

import useThemeStore from '@/hook/useTheme';
import useWidget from '@/hook/useWidget';

import { i18n } from '@/utils/string';

import { GoogleWidgetType, SpanType, WidgetType } from '@/types/Widget';

import { ID } from '../widget/google/GoogleSearchWidget';
import CreateWidgetModal from './_CreateWidgetModal';
import WidgetSizeSelect from './common/WidgetSizeSelect';

type CreateGoogleModalProps = {
  onClose: () => void;
  initialData?: {
    id: string;
    span?: SpanType;
    title?: string;
  };
};

const CreateGoogleModal: React.FC<CreateGoogleModalProps> = ({ onClose, initialData }) => {
  const {
    actions: { createWidget, updateWidget },
  } = useWidget();

  const { region } = useThemeStore();

  const [span, setSpan] = useState<SpanType>(initialData?.span ?? { row: 2, column: 2 });
  const [title, setTitle] = useState(
    initialData?.title ??
      i18n(region, {
        ko: '구글 검색',
        en: 'Google Search',
      })
  );

  const [openSelectWidgetSize, setOpenSelectWidgetSize] = useState(false);

  const createGoogleWidget = useCallback(
    async ({ span, title }: { span: SpanType; title: string }) => {
      const newGoogleWidget: Omit<WidgetType<GoogleWidgetType>, 'index'> = {
        id: ID,
        title,
        widgetType: 'google',
        span,
        data: {
          googleType: 'search',
        },
      };
      createWidget(newGoogleWidget);
    },
    [createWidget]
  );

  const updateGoogleWidget = useCallback(
    async ({ id, span, title }: { id: string; span: SpanType; title: string }) => {
      const newGoogleWidget: Omit<WidgetType<GoogleWidgetType>, 'index'> = {
        id,
        title,
        widgetType: 'google',
        span,
        data: {
          googleType: 'search',
        },
      };

      await updateWidget(id, newGoogleWidget);
    },
    [updateWidget]
  );

  return (
    <CreateWidgetModal
      onClose={onClose}
      title={i18n(region, {
        ko: `구글 위젯 ${initialData ? '수정' : '추가'}`,
        en: `${initialData ? 'Edit' : `Add`} Google Widget`,
      })}
      disabledClickAway={openSelectWidgetSize}
      PreviewWidget={
        <GoogleSearchWidget
          index={-1}
          disabled
          WidgetProps={{
            title:
              title ??
              i18n(region, {
                ko: '구글',
                en: 'Google',
              }),
            span,
          }}
        />
      }
      requireConfirm={title.length > 0}
      isEdit={Boolean(initialData)}
      onConfirm={async () => {
        if (initialData) {
          await updateGoogleWidget({ id: initialData.id, span, title });
        } else {
          await createGoogleWidget({ span, title });
        }
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
          return !((span.row === 1 && span.column === 1) || span.row === 4);
        }}
      />
    </CreateWidgetModal>
  );
};

export default CreateGoogleModal;
