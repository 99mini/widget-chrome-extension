import React, { useCallback, useState } from 'react';

import { Input } from './ui/input';

import IconWidget from '@/widget/Icon';
import { InputContainer, InputLabelText } from './common/Modal';
import CreateWidgetModal from './CreateWidgetModal';

import useWidget from '@/hook/useWidget';

import { urlProtocol } from '@/utils/common';

type CreateBookmarkModalProps = {
  onClose: () => void;
};

const CreateBookmarkModal: React.FC<CreateBookmarkModalProps> = ({ onClose }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const {
    actions: { createWidget },
  } = useWidget();

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
      title="바로가기 추가"
      PreviewWidget={
        <IconWidget
          id="bookmark"
          index={0}
          title={title}
          url={urlProtocol(url)}
          image={imageUrl || `${urlProtocol(url)}/favicon.ico`}
        />
      }
      onConfirm={() => handleConfirm(urlProtocol(url), title, imageUrl)}
      requireConfirm={title.length > 0 && url.length > 0}
    >
      <InputContainer>
        <InputLabelText required>{'위젯 이름'}</InputLabelText>
        <Input type="text" placeholder={'Title'} value={title} onChange={(e) => setTitle(e.target.value)} required />
      </InputContainer>
      <InputContainer>
        <InputLabelText required>{'URL'}</InputLabelText>
        <Input type="text" placeholder={'URL'} value={url} onChange={(e) => setUrl(e.target.value)} required />
      </InputContainer>
      <InputContainer>
        <InputLabelText>{'아이콘 이미지 URL'}</InputLabelText>
        <Input
          type="text"
          placeholder={'Icon Image URL'}
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </InputContainer>
    </CreateWidgetModal>
  );
};

export default CreateBookmarkModal;
