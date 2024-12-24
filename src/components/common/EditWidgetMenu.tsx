import React, { useState } from 'react';

import CreateBookmarkModal from '@/components/createModal/CreateBookmarkModal';
import CreateClockModal from '@/components/createModal/CreateClockModal';
import CreateGoogleModal from '@/components/createModal/CreateGoogleModal';
import {
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from '@/components/ui/context-menu';

import useThemeStore from '@/hook/useTheme';

import { i18n } from '@/utils/string';

import { WidgetOptionType } from '@/types/widget';

type EditWidgetMenuProps = {
  widgetType: WidgetOptionType;
};

const EditWidgetMenu: React.FC<EditWidgetMenuProps> = ({ widgetType }) => {
  const { region } = useThemeStore();

  const [openEditWidgetModal, setOpenEditWidgetModal] = useState(false);

  return (
    <>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onClick={() => setOpenEditWidgetModal(true)}>
          {i18n(region, { ko: '수정하기', en: 'Edit' })}
          <ContextMenuShortcut>{'⌘E'}</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset>
          {i18n(region, { ko: '삭제하기', en: 'Delete' })}
          <ContextMenuShortcut>{'⌘D'}</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          {i18n(region, { ko: '새로고침', en: 'Reload' })}
          <ContextMenuShortcut>{'⌘R'}</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>{i18n(region, { ko: '도구 더보기', en: 'More Tools' })}</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              {i18n(region, { ko: '페이지 저장...', en: 'Save Page As...' })}
              <ContextMenuShortcut>{'⇧⌘S'}</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>{i18n(region, { ko: '바로가기 만들기...', en: 'Create Shortcut...' })}</ContextMenuItem>
            <ContextMenuItem>{i18n(region, { ko: '창 이름 지정...', en: 'Name Window...' })}</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>{i18n(region, { ko: '개발자 도구', en: 'Developer Tools' })}</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuCheckboxItem checked>
          {i18n(region, { ko: '북마크 바 표시', en: 'Show Bookmarks Bar' })}
          <ContextMenuShortcut>{'⌘⇧B'}</ContextMenuShortcut>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>{i18n(region, { ko: '전체 URL 표시', en: 'Show Full URLs' })}</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="pedro">
          <ContextMenuLabel inset>{i18n(region, { ko: '사람들', en: 'People' })}</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuRadioItem value="pedro">
            {i18n(region, { ko: '페드로 두아르테', en: 'Pedro Duarte' })}
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">
            {i18n(region, { ko: '콜름 투이트', en: 'Colm Tuite' })}
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
      {openEditWidgetModal &&
        (widgetType === 'bookmark' ? (
          <CreateBookmarkModal onClose={() => setOpenEditWidgetModal(false)} />
        ) : widgetType === 'clock' ? (
          <CreateClockModal onClose={() => setOpenEditWidgetModal(false)} />
        ) : widgetType === 'google' ? (
          <CreateGoogleModal onClose={() => setOpenEditWidgetModal(false)} />
        ) : null)}
    </>
  );
};

export default EditWidgetMenu;
