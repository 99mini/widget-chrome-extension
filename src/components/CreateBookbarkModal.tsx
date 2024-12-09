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

  const {
    actions: { createWidget },
  } = useWidget();

  const handleConfirm = useCallback(
    async (url: string, title: string) => {
      console.log(`createWidget: ${title} ${url}`);
      // TODO: bookmark 추가 로직
      await createWidget({
        id: 'bookmark',
        title: title,
        widgetType: 'bookmark',
        data: {
          id: 'bookmark',
          url: url,
          title: title,
          parentId: '0',
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
          image={`${urlProtocol(url)}/favicon.ico`}
        />
      }
      onConfirm={() => handleConfirm(urlProtocol(url), title)}
    >
      <InputContainer>
        <InputLabelText>{'위젯 이름'}</InputLabelText>
        <Input type="text" placeholder={'Title'} value={title} onChange={(e) => setTitle(e.target.value)} />
      </InputContainer>
      <InputContainer>
        <InputLabelText>{'URL'}</InputLabelText>
        <Input type="text" placeholder={'URL'} value={url} onChange={(e) => setUrl(e.target.value)} />
      </InputContainer>
    </CreateWidgetModal>
  );
};

export default CreateBookmarkModal;
