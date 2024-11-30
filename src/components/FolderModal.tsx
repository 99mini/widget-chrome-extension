import React from 'react';
import { createPortal } from 'react-dom';

import useClickAway from '@/hook/useClickAway';

import EditableText from './EditableText';

import styled from '@emotion/styled';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;

  width: 50%;
  height: 50%;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalTitle = styled.div`
  text-align: center;

  font-size: 24px;
  font-weight: 500;
`;

const Modal = styled.div`
  display: grid;
  justify-content: center;

  gap: ${({ theme }) => `${theme.sizes.widget.columnGap}px ${theme.sizes.widget.rowGap}px `};

  grid-template-columns: repeat(auto-fill, 60px);

  padding: 24px;

  background-color: #f0f0f0;
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
