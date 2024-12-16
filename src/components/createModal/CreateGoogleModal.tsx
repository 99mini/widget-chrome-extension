import React, { useCallback, useState } from 'react';

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

import useWidget from '@/hook/useWidget';

import { InputContainer, InputLabelText } from '@/components/common/Modal';
import CreateWidgetModal from './_CreateWidgetModal';

import useThemeStore from '@/hook/useTheme';

import { GoogleWidgetType, SPAN_OPTIONS, SpanType, WidgetType } from '@/types/Widget';
import { GoogleSearchWidget } from '../widget/google';

type CreateGoogleModalProps = {
  onClose: () => void;
};

const CreateGoogleModal: React.FC<CreateGoogleModalProps> = ({ onClose }) => {
  const {
    actions: { createWidget },
  } = useWidget();

  const { region } = useThemeStore();

  const [span, setSpan] = useState<SpanType>({ row: 2, column: 2 });
  const [title, setTitle] = useState(region === 'ko' ? '구글 검색' : 'Google Search');

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
      title={region === 'ko' ? '구글 위젯 추가' : 'Add Google Widget'}
      disabledClickAway={openSelectWidgetSize}
      PreviewWidget={
        <GoogleSearchWidget
          index={-1}
          disabled
          WidgetProps={{
            title: title ?? (region === 'ko' ? '구글' : 'Google'),
            span,
          }}
        />
      }
      onConfirm={async () => {
        await createGoogleWidget({ span, title });
      }}
    >
      <InputContainer>
        <InputLabelText>{region === 'ko' ? '위젯 이름' : 'Widget Name'}</InputLabelText>
        <Input type="text" placeholder={'Title'} value={title} onChange={(e) => setTitle(e.target.value)} />
      </InputContainer>
      <InputContainer>
        <InputLabelText>{region === 'ko' ? '위젯 크기' : 'Widget Size'}</InputLabelText>
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
              <SelectLabel>{region === 'ko' ? '위젯 크기' : 'Widget Size'}</SelectLabel>
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