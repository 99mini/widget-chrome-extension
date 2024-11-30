import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

import styled from '@emotion/styled';

import useBookmarkStore from '@/hook/useBookmark';

import FolderModal from '@/components/FolderModal';
import FolderIcon from './FolderIcon';

const Clickable = styled.div`
  cursor: pointer;
`;

type FolderProps = {
  id: string;
  title: string;
  bookmarks: {
    id: string;
    imageUrl?: string | undefined;
  }[];

  children: React.ReactNode;
};

const Folder: React.FC<FolderProps> = ({ id: folderId, title, bookmarks, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    actions: { moveBookmark, getBookmarks },
  } = useBookmarkStore();

  const [{ isOver }, drop] = useDrop({
    accept: 'BOOKMARK', // 드롭할 수 있는 아이템 타입 지정
    drop: async (item: { id: string }) => {
      try {
        await moveBookmark(item.id, folderId);
        await getBookmarks();
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
        <div ref={drop}>
          <FolderIcon title={title} bookmarks={bookmarks} isOver={isOver} />
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
