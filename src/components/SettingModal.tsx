import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import useClickAway from '@/hook/useClickAway';
import useThemeStore from '@/hook/useTheme';
import useWidget from '@/hook/useWidget';

import ActionModal from './ActionModal';
import { ModalBackground, ModalContainerCSS, ModalTitle } from './Modal';
import Switch from './Switch';

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;

  padding: 24px;

  ${ModalContainerCSS}

  align-items: center;
`;

const SettingItemList = styled.ul`
  width: 100%;
  max-width: 360px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 0;
  margin: 0;
  list-style: none;
`;

const SettingItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const SettingItemLabelCSS = css`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
`;

const SettingItemLabel = styled.span`
  ${SettingItemLabelCSS}
  color: ${({ theme }) => theme.colors.text};
`;

const DangerButton = styled.button`
  ${SettingItemLabelCSS}

  color: ${({ theme }) => theme.colors.error};
  background-color: transparent;

  border: none;
  border-radius: 8px;

  cursor: pointer;
`;

type SettingModalProps = {
  onClose: () => void;
};
const SettingModal: React.FC<SettingModalProps> = ({ onClose }) => {
  const [openAgreement, setOpenAgreement] = useState(false);

  const {
    mode,
    actions: { setMode },
  } = useThemeStore();

  const {
    actions: { clearWidgets },
  } = useWidget();

  const ref = useClickAway<HTMLDivElement>(onClose, 300);

  return createPortal(
    <ModalBackground>
      <ModalContainer ref={ref}>
        <ModalTitle>{'설정'}</ModalTitle>
        <SettingItemList>
          <SettingItem>
            <SettingItemLabel>{'다크 모드'}</SettingItemLabel>
            <Switch
              InputProps={{
                checked: mode === 'dark',
                title: 'Dark Mode',
                onChange: () => setMode(mode === 'dark' ? 'light' : 'dark'),
              }}
            />
          </SettingItem>
          <SettingItem>
            <SettingItemLabel>{'데이터 초기화'}</SettingItemLabel>
            <DangerButton onClick={() => setOpenAgreement(true)}>{'초기화'}</DangerButton>
          </SettingItem>
        </SettingItemList>
      </ModalContainer>
      {openAgreement && (
        <ActionModal
          onClose={() => setOpenAgreement(false)}
          title="데이터 초기화"
          onConfirm={async () => await clearWidgets()}
          confirmText="초기화"
          confirmType="error"
        >
          <SettingItemList>
            <SettingItem>
              <SettingItemLabel>{'정말로 초기화 하시겠습니까?'}</SettingItemLabel>
            </SettingItem>
          </SettingItemList>
        </ActionModal>
      )}
    </ModalBackground>,
    document.body
  );
};

export default SettingModal;
