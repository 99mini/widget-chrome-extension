import React, { useState } from 'react';

import styled from '@emotion/styled';

import CreateBookmarkModal from '@/components/createModal/CreateBookmarkModal';
import CreateClockModal from '@/components/createModal/CreateClockModal';
import CreateGoogleModal from '@/components/createModal/CreateGoogleModal';
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
} from '@/components/ui/context-menu';

import { Colors } from '@/context/theme';

import useThemeStore from '@/hook/useTheme';
import useWidget from '@/hook/useWidget';

import {
  ClockWidgetType,
  CustomWidgetType,
  GoogleWidgetType,
  HistoryWidgetType,
  WidgetBookmarkType,
  WidgetType,
} from '@/lib/types/Widget';
import { i18n } from '@/lib/utils/string';
import { rgbWithAlpha } from '@/lib/utils/style';
import { isWidgetOf } from '@/lib/utils/types';

import CreateHistoryModal from '../createModal/CreateHistoryModal';
import ActionModal from './modal/ActionModal';

const MenuItem = styled(ContextMenuItem)<{ color?: keyof Colors }>`
  cursor: pointer;

  ${({ theme, color }) =>
    color &&
    `
  color: ${theme.colors[color]}; 
  &:focus {
    color: ${theme.colors[color]};
  }

  & > span { 
    color: ${rgbWithAlpha(theme.colors[color] as string, 0.88)} 
  }
  `}
`;

type EditWidgetMenuProps = {
  widget: WidgetType<CustomWidgetType>;
};

const EditWidgetMenu = ({ widget }: EditWidgetMenuProps) => {
  const { region } = useThemeStore();

  const {
    actions: { removeWidget },
  } = useWidget();

  const [openEditWidgetModal, setOpenEditWidgetModal] = useState(false);
  const [openDeleteWidgetModal, setOpenDeleteWidgetModal] = useState(false);

  return (
    <>
      <ContextMenuContent className="w-64">
        <MenuItem inset onClick={() => setOpenEditWidgetModal(true)}>
          {i18n(region, { ko: '수정하기', en: 'Edit' })}
          <ContextMenuShortcut>{'⌘E'}</ContextMenuShortcut>
        </MenuItem>
        <ContextMenuSeparator />
        <MenuItem inset color="error" onClick={() => setOpenDeleteWidgetModal(true)}>
          {i18n(region, { ko: '삭제하기', en: 'Delete' })}
          <ContextMenuShortcut>{'⌘D'}</ContextMenuShortcut>
        </MenuItem>
      </ContextMenuContent>
      {openEditWidgetModal &&
        (() => {
          if (isWidgetOf<WidgetBookmarkType>(widget, 'bookmark')) {
            return (
              <CreateBookmarkModal
                onClose={() => setOpenEditWidgetModal(false)}
                initialData={{
                  id: widget.id,
                  url: widget.data.url,
                  title: widget.title,
                  imageUrl: widget.data.imageUrl,
                }}
              />
            );
          }
          if (isWidgetOf<ClockWidgetType>(widget, 'clock')) {
            return (
              <CreateClockModal
                onClose={() => setOpenEditWidgetModal(false)}
                initialData={{
                  id: widget.id,
                  format: widget.data.format,
                  span: widget.span,
                  title: widget.title,
                }}
              />
            );
          }
          if (isWidgetOf<GoogleWidgetType>(widget, 'google')) {
            return (
              <CreateGoogleModal
                onClose={() => setOpenEditWidgetModal(false)}
                initialData={{
                  id: widget.id,
                  span: widget.span,
                  title: widget.title,
                }}
              />
            );
          }
          if (isWidgetOf<HistoryWidgetType>(widget, 'history')) {
            return (
              <CreateHistoryModal
                onClose={() => setOpenEditWidgetModal(false)}
                initialData={{
                  id: widget.id,
                  span: widget.span,
                  title: widget.title,
                  maxResults: widget.data.maxResults,
                }}
              />
            );
          }
        })()}
      {openDeleteWidgetModal && (
        <ActionModal
          title={i18n(region, { ko: '위젯 삭제', en: 'Delete Widget' })}
          onConfirm={async () => {
            await removeWidget(widget.id);
            setOpenDeleteWidgetModal(false);
          }}
          confirmText={i18n(region, { ko: '삭제', en: 'Delete' })}
          confirmType="error"
          onClose={() => setOpenDeleteWidgetModal(false)}
          size="small"
        >
          {i18n(region, { ko: '정말로 삭제하시겠습니까?', en: 'Are you sure you want to delete?' })}
        </ActionModal>
      )}
    </>
  );
};

export default EditWidgetMenu;
