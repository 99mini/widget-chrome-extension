import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

import styled from '@emotion/styled';

import { move } from '@/chrome/bookmarks';

import FolderModal from '@/components/FolderModal';
import FolderIcon from './FolderIcon';

const Clickable = styled.div`
  cursor: pointer;
`;

type FolderProps = {
  id: string;
  title: string;
  imageUrls: string[];

  children: React.ReactNode;
};

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
      {isOpen && (
        <FolderModal onClose={handleClose} title={title}>
          {children}
        </FolderModal>
      )}
    </>
  );
};

export default Folder;
