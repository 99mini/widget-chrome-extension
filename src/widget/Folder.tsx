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
    actions: { moveBookmark, refresh },
  } = useBookmarkStore();

  const [{ isOver }, drop] = useDrop({
    accept: 'BOOKMARK',
    drop: async (item: { id: string }) => {
      if (!/^[0-9]*$/g.test(item.id)) {
        return;
      }
      try {
        await moveBookmark(item.id, folderId);
        await refresh();
      } catch (error) {
        console.error('Failed to move bookmark:', error);
      }
    },

    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
      };
    },
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
          <FolderIcon id={folderId} title={title} bookmarks={bookmarks} isOver={isOver} />
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
