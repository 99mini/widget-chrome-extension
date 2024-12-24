import React, { useCallback, useState } from 'react';

import { InputContainer, InputLabelText } from '@/components/common/Modal';
import { Input } from '@/components/ui/input';
import IconWidget from '@/components/widget/IconWidget';

import useThemeStore from '@/hook/useTheme';
import useWidget from '@/hook/useWidget';

import { urlProtocol } from '@/utils/common';
import { i18n } from '@/utils/string';

import CreateWidgetModal from './_CreateWidgetModal';

type CreateBookmarkModalProps = {
  onClose: () => void;
  initialData?: {
    url: string;
    title: string;
    imageUrl?: string;
  };
};

const CreateBookmarkModal: React.FC<CreateBookmarkModalProps> = ({ onClose, initialData }) => {
  const [url, setUrl] = useState(initialData?.url ?? '');
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [imageUrl, setImageUrl] = useState<string | undefined>(initialData?.imageUrl);

  const {
    actions: { createWidget },
  } = useWidget();

  const { region } = useThemeStore();

  const handleConfirm = useCallback(
    async (url: string, title: string, imageUrl: string | undefined) => {
      await createWidget({
        id: 'bookmark',
        title: title,
        widgetType: 'bookmark',
        data: {
          id: 'bookmark',
          url: url,
          title: title,
          parentId: '1',
          imageUrl,
        },
      });
    },
    [createWidget]
  );

  return (
    <CreateWidgetModal
      onClose={onClose}
      title={i18n(region, {
        ko: '바로가기 추가',
        en: 'Add Bookmark',
      })}
      PreviewWidget={
        <IconWidget
          id="bookmark"
          index={-1}
          title={title}
          url={urlProtocol(url)}
          image={imageUrl || `${urlProtocol(url)}/favicon.ico`}
        />
      }
      onConfirm={() => handleConfirm(urlProtocol(url), title, imageUrl)}
      requireConfirm={title.length > 0 && url.length > 0}
    >
      <InputContainer>
        <InputLabelText required>
          {i18n(region, {
            ko: '위젯 이름',
            en: 'Widget Name',
          })}
        </InputLabelText>
        <Input
          type="text"
          placeholder={i18n(region, {
            ko: '위젯 이름',
            en: 'Widget Name',
          })}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </InputContainer>
      <InputContainer>
        <InputLabelText required>{'URL'}</InputLabelText>
        <Input type="text" placeholder={'URL'} value={url} onChange={(e) => setUrl(e.target.value)} required />
      </InputContainer>
      <InputContainer>
        <InputLabelText>
          {i18n(region, {
            ko: '아이콘 URL',
            en: 'Icon Url',
          })}
        </InputLabelText>
        <Input
          type="text"
          placeholder={i18n(region, {
            ko: '아이콘 URL',
            en: 'Icon Url',
          })}
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </InputContainer>
    </CreateWidgetModal>
  );
};

export default CreateBookmarkModal;
