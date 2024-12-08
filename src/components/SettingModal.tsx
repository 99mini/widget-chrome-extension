import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import useClickAway from '@/hook/useClickAway';
import useThemeStore from '@/hook/useTheme';
import useWidget from '@/hook/useWidget';

import ActionModal from './common/ActionModal';
import { Glassmorphism, ModalBackground, ModalContainerCSS, ModalTitle } from './common/Modal';
import Switch from './common/Switch';

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;

  padding: 24px;

  ${ModalContainerCSS}

  align-items: center;
`;

const SettingContainer = styled(Glassmorphism)`
  width: 100%;
  padding: 36px 24px 16px 24px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 8px;

  border-radius: 16px;
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
  font-size: 16px;
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

  padding: 0;

  cursor: pointer;
`;

const Line = styled.hr`
  width: 100%;
  max-width: 360px;
  height: 2px;

  margin: 4px 0;
  padding: 0;

  border: none;
  background-color: ${({ theme }) => theme.colors.background};
`;

const FooterContainer = styled.footer`
  ${({ theme }) => theme.sizes.footer}

  margin-top: 24px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CopyRightContainer = styled.div`
  display: flex;
  flex-direction: row;

  gap: 2px;

  justify-content: center;
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;

  align-items: center;
`;

const Link = styled.a<{ isPrimary?: boolean }>`
  color: ${({ isPrimary, theme }) => (isPrimary ? theme.colors.primary : theme.colors.text)};

  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;

  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const FooterSpan = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;

  color: ${({ theme }) => theme.colors.text};
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
      <ModalContainer>
        <ModalTitle>{'설정'}</ModalTitle>
        <SettingContainer ref={ref}>
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
          </SettingItemList>
          <Line />
          <SettingItemList>
            <SettingItem>
              <SettingItemLabel>{'데이터 초기화'}</SettingItemLabel>
              <DangerButton onClick={() => setOpenAgreement(true)}>{'초기화'}</DangerButton>
            </SettingItem>
          </SettingItemList>
          <FooterContainer>
            <FooterColumn>
              <CopyRightContainer>
                <FooterSpan>{`© ${new Date().getFullYear()}.`}</FooterSpan>
                <Link title="https://github.com/99mini" href="https://github.com/99mini">
                  {'99mini.'}
                </Link>
                <FooterSpan>{` All rights reserved.`}</FooterSpan>
              </CopyRightContainer>
              <LinkContainer>
                <Link
                  title="https://github.com/99mini/widget-chrome-extension"
                  href="https://github.com/99mini/widget-chrome-extension"
                  isPrimary
                >
                  {'Github'}
                </Link>
                <Link
                  title="https://github.com/99mini/widget-chrome-extension/blob/main/LICENSE"
                  href="https://github.com/99mini/widget-chrome-extension/blob/main/LICENSE"
                >
                  {'MIT License'}
                </Link>
                <Link
                  title="https://github.com/99mini/widget-chrome-extension/releases"
                  href="https://github.com/99mini/widget-chrome-extension/releases"
                >
                  {'Release Notes'}
                </Link>
                {/* eslint-disable-next-line no-undef */}
                <FooterSpan>{`version: ${APP_VERSION}`}</FooterSpan>
              </LinkContainer>
            </FooterColumn>
          </FooterContainer>
        </SettingContainer>
      </ModalContainer>
      {openAgreement && (
        <ActionModal
          onClose={() => setOpenAgreement(false)}
          title="데이터 초기화"
          onConfirm={async () => await clearWidgets()}
          confirmText="초기화"
          confirmType="error"
        >
          <h4>{'데이터를 초기화하시겠습니까?'}</h4>
          <p>{'위젯의 모든 데이터가 초기화 됩니다. 이 작업은 되돌릴 수 없습니다'}</p>
        </ActionModal>
      )}
    </ModalBackground>,
    document.body
  );
};

export default SettingModal;
