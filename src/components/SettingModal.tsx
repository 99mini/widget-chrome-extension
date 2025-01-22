import { css } from '@emotion/react';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import styled from '@emotion/styled';

import Line from '@/components/common/Line';
import Switch from '@/components/common/Switch';
import ActionModal from '@/components/common/modal/ActionModal';
import { Glassmorphism, ModalBackground, ModalContainerCSS, ModalTitle } from '@/components/common/modal/Modal.style';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import useClickAway from '@/hook/useClickAway';
import useThemeStore from '@/hook/useTheme';
import useWidget from '@/hook/useWidget';

import { i18n } from '@/utils/string';

import { RegionType } from '@/types/theme';

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

  & > :last-child {
    width: fit-content;
  }
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
  const [openSelectRegion, setOpenSelectRegion] = useState(false);

  const {
    mode,
    region,
    actions: { setMode, setRegion },
  } = useThemeStore();

  const {
    actions: { clearWidgets },
  } = useWidget();

  const ref = useClickAway<HTMLDivElement>(!openSelectRegion ? onClose : () => {}, 300);

  return createPortal(
    <ModalBackground>
      <ModalContainer>
        <ModalTitle>{i18n(region, { ko: '설정', en: 'setting' })}</ModalTitle>
        <SettingContainer ref={ref}>
          <SettingItemList>
            <SettingItem>
              <SettingItemLabel>
                {i18n(region, {
                  ko: '다크 모드',
                  en: 'dark mode',
                })}
              </SettingItemLabel>
              <Switch
                InputProps={{
                  checked: mode === 'dark',
                  title: 'Dark Mode',
                  onChange: () => setMode(mode === 'dark' ? 'light' : 'dark'),
                }}
              />
            </SettingItem>
            <SettingItem>
              <SettingItemLabel>
                {i18n(region, {
                  ko: '언어',
                  en: 'language',
                })}
              </SettingItemLabel>
              <Select
                onValueChange={(e) => {
                  setRegion(e as RegionType);
                  setOpenSelectRegion(false);
                }}
                onOpenChange={setOpenSelectRegion}
                open={openSelectRegion}
                value={region}
              >
                <SelectTrigger>
                  <SelectValue placeholder={'1x1'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      {i18n(region, {
                        ko: '언어',
                        en: 'language',
                      })}
                    </SelectLabel>
                    {Object.entries({ ko: '한국어', en: 'English' }).map(([key, language]) => (
                      <SelectItem key={key} value={key}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </SettingItem>
          </SettingItemList>
          <Line />
          <SettingItemList>
            <SettingItem>
              <SettingItemLabel>
                {i18n(region, {
                  ko: '데이터 초기화',
                  en: 'reset data',
                })}
              </SettingItemLabel>
              <DangerButton onClick={() => setOpenAgreement(true)}>
                {i18n(region, {
                  ko: '초기화',
                  en: 'reset',
                })}
              </DangerButton>
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
          title={i18n(region, {
            ko: '데이터 초기화',
            en: 'Reset Data',
          })}
          size="small"
          onConfirm={async () => {
            await clearWidgets();
            onClose();
          }}
          confirmText={i18n(region, {
            ko: '초기화',
            en: 'Reset',
          })}
          confirmType="error"
        >
          <h4>
            {i18n(region, {
              ko: '데이터를 초기화하시겠습니까?',
              en: 'Are you sure you want to reset the data?',
            })}
          </h4>
          <p>
            {i18n(region, {
              ko: '위젯의 모든 데이터가 초기화 됩니다. 이 작업은 되돌릴 수 없습니다',
              en: 'All data in the widget will be reset. This operation cannot be undone.',
            })}
          </p>
        </ActionModal>
      )}
    </ModalBackground>,
    document.body
  );
};

export default SettingModal;
