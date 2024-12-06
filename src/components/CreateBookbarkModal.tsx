import React, { useCallback, useState } from 'react';
import ActionModal from './ActionModal';
import { createPortal } from 'react-dom';
import { ModalTitle } from './Modal';
import useWidget from '@/hook/useWidget';

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

  return createPortal(
    <ActionModal
      onClose={onClose}
      onConfirm={async () => {
        if (url && title) {
          await handleConfirm(url, title);
        }
      }}
    >
      <ModalTitle>{'바로가기 추가'}</ModalTitle>
      <input type="text" placeholder={'URL'} value={url} onChange={(e) => setUrl(e.target.value)} />
      <input type="text" placeholder={'Title'} value={title} onChange={(e) => setTitle(e.target.value)} />
    </ActionModal>,
    document.body
  );
};

export default CreateBookmarkModal;
