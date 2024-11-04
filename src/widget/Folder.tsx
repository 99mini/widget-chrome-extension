import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import styled from '@emotion/styled';

import EditableText from '@/components/EditableText';
import useClickAway from '@/hook/useClickAway';
import FolderIcon from './FolderIcon';
import { useDrop } from 'react-dnd';
import { move } from '@/chrome/bookmarks';

type FolderProps = {
  id: string;
  title: string;
  imageUrls: string[];

  children: React.ReactNode;
};

const Clickable = styled.div`
  cursor: pointer;
`;

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
  border-radius: 16px;
`;

const Folder: React.FC<FolderProps> = ({ id: folderId, title, imageUrls, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [{ isOver }, drop] = useDrop({
    accept: 'BOOKMARK', // 드롭할 수 있는 아이템 타입 지정
    drop: async (item: { id: string }) => {
      try {
        await move(item.id, folderId);
      } catch (error) {
        console.error('Failed to move bookmark:', error);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleClose = () => setIsOpen(false);

  const onChangeTitle = (newTitle: string) => {
    console.log(newTitle);
  };

  const ref = useClickAway<HTMLDivElement>(handleClose, 300);

  return (
    <>
      <Clickable
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        <div ref={drop} style={{ backgroundColor: isOver ? '#e0e0e0' : 'transparent' }}>
          <FolderIcon title={title} imageUrls={imageUrls} />
        </div>
      </Clickable>
      {isOpen &&
        createPortal(
          <ModalBackground>
            <ModalContainer ref={ref}>
              <ModalTitle>
                <EditableText text={title} onChange={onChangeTitle} />
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
