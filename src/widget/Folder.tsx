import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import styled from '@emotion/styled';

import useClickAway from '@/hook/useClickAway';
import IconWidget from './Icon';
import EditableText from '@/components/EditableText';

type FolderProps = {
  children: React.ReactNode;
  id: string;
  title: string;
};

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
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;

  padding: 24px;

  background-color: #f0f0f0;
  border-radius: 8px;
`;

const Folder: React.FC<FolderProps> = ({ id, title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const ref = useClickAway<HTMLDivElement>(handleClose, 300);

  return (
    <>
      <IconWidget
        name={title}
        url={`#${id}`}
        image=""
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      />
      {isOpen &&
        createPortal(
          <ModalBackground>
            <ModalContainer ref={ref}>
              <ModalTitle>
                <EditableText text={title} onChange={console.log} />
              </ModalTitle>
              <Modal>{children}</Modal>
            </ModalContainer>
          </ModalBackground>,
          document.body
        )}
    </>
  );
};

export default Folder;
