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
import { GoogleSearchWidget } from '@/components/widget/google';

import useThemeStore from '@/hook/useTheme';
import useWidget from '@/hook/useWidget';

import { i18n } from '@/utils/string';

import { GoogleWidgetType, SPAN_OPTIONS, SpanType, WidgetType } from '@/types/widget';

import CreateWidgetModal from './_CreateWidgetModal';

type CreateGoogleModalProps = {
  onClose: () => void;
  initialData?: {
    span: SpanType;
    title: string;
  };
};

const CreateGoogleModal: React.FC<CreateGoogleModalProps> = ({ onClose, initialData }) => {
  const {
    actions: { createWidget },
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
        id: `google-search-${span.row}-${span.column}`,
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

  return (
    <CreateWidgetModal
      onClose={onClose}
      title={i18n(region, {
        ko: '구글 위젯 추가',
        en: 'Add Google Widget',
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
      onConfirm={async () => {
        await createGoogleWidget({ span, title });
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
                if ((span.row === 1 && span.column === 1) || span.row === 4) {
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
    </CreateWidgetModal>
  );
};

export default CreateGoogleModal;
