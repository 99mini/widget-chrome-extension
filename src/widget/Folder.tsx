import styled from '@emotion/styled';
import React, { useState } from 'react';

import { createPortal } from 'react-dom';
import IconWidget from './Icon';

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

  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Modal = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;

  aspect-ratio: 1;

  padding: 24px;

  background-color: #f0f0f0;
  border-radius: 8px;
`;

const Folder: React.FC<FolderProps> = ({ id, title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

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
            <ModalContainer>
              <Modal>{children}</Modal>
            </ModalContainer>
          </ModalBackground>,
          document.body
        )}
    </>
  );
};

export default Folder;
