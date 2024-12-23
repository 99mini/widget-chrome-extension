import React from 'react';
import { createPortal } from 'react-dom';

import styled from '@emotion/styled';

import useClickAway from '@/hook/useClickAway';

import EditableText from './common/EditableText';
import { Glassmorphism, ModalBackground, ModalContainerCSS, ModalTitle } from './common/Modal';

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;

  height: 50%;

  ${ModalContainerCSS}
`;

const ModalContent = styled.div``;

const Modal = styled(Glassmorphism)`
  display: grid;

  gap: ${({ theme }) => `${theme.sizes.widget.columnGap}px ${theme.sizes.widget.rowGap}px `};

  grid-template-columns: repeat(auto-fill, 60px);

  padding: 24px;

  border-radius: 16px;
`;

type FolderModalProps = {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const FolderModal: React.FC<FolderModalProps> = ({ onClose, title, children }) => {
  const ref = useClickAway<HTMLDivElement>(onClose, 300);

  const onChangeTitle = (newTitle: string) => {
    console.log(newTitle);
  };

  return createPortal(
    <ModalBackground>
      <ModalContainer>
        <ModalContent ref={ref}>
          <ModalTitle>
            <EditableText text={title} onChange={onChangeTitle} />
          </ModalTitle>
          <Modal>{children}</Modal>
        </ModalContent>
      </ModalContainer>
    </ModalBackground>,
    document.body
  );
};

export default FolderModal;
