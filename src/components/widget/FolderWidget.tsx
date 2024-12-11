import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

import styled from '@emotion/styled';

import useBookmarkStore from '@/hook/useBookmark';

import FolderModal from '@/components/FolderModal';
import FolderIcon from './FolderIcon';
import useWidget from '@/hook/useWidget';

const Clickable = styled.div`
  cursor: pointer;
`;

type FolderWidgetProps = {
  id: string;
  index: number;
  title: string;
  bookmarks: {
    id: string;
    imageUrl?: string | undefined;
  }[];

  children: React.ReactNode;
};

const FolderWidget: React.FC<FolderWidgetProps> = ({ id: folderId, index, title, bookmarks, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    actions: { moveBookmark },
  } = useBookmarkStore();

  const {
    actions: { refresh },
  } = useWidget();

  const [{ isOver, hovered }, drop] = useDrop({
    accept: 'BOOKMARK',
    drop: async (item: { id: string; folder: boolean }) => {
      if (!/^[0-9]*$/g.test(item.id) || item.folder || item.id === folderId) {
        return;
      }
      try {
        await moveBookmark(item.id, folderId);
        await refresh();
      } catch (error) {
        console.error('Failed to move bookmark:', error);
      }
    },
    collect: (monitor) => ({ isOver: monitor.isOver(), hovered: monitor.getItem() }),
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
          <FolderIcon
            id={folderId}
            index={index}
            title={title}
            bookmarks={bookmarks}
            isOver={isOver && /^[0-9]*$/g.test(hovered.id) && !hovered.folder}
          />
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

export default FolderWidget;
