import React from 'react';
import { createPortal } from 'react-dom';

import useClickAway from '@/hook/useClickAway';

import EditableText from './EditableText';
import { Glassmorphism, ModalBackground, ModalContainerCSS } from './Modal';

import styled from '@emotion/styled';

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;

  width: 50%;
  height: 50%;

  ${ModalContainerCSS}
`;

const ModalTitle = styled.div`
  text-align: center;

  font-size: 24px;
  font-weight: 500;
`;

const Modal = styled(Glassmorphism)`
  display: grid;
  justify-content: center;

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
      <ModalContainer ref={ref}>
        <ModalTitle>
          <EditableText text={title} onChange={onChangeTitle} />
        </ModalTitle>
        <Modal>{children}</Modal>
      </ModalContainer>
    </ModalBackground>,
    document.body
  );
};

export default FolderModal;
