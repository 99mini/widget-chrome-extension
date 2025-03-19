import React from 'react';
import { createPortal } from 'react-dom';

import styled from '@emotion/styled';

import useClickAway from '@/hook/useClickAway';
import useThemeStore from '@/hook/useTheme';

import { i18n } from '@/lib/utils/string';

import { ModalBackground, ModalTitle } from './Modal.style';

const ModalContainer = styled.div<{ size: 'small' | 'medium' | 'large' }>`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: center;

  gap: 16px;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${({ size }) => {
    if (size === 'small') {
      return `min-width: 360px;`;
    } else if (size === 'medium') {
      return `min-width: 540px; aspect-ratio: 3 / 4;`;
    } else if (size === 'large') {
      return `min-width: 720px; aspect-ratio: 3 / 4;`;
    }
  }}

  min-height: 360px;

  box-sizing: border-box;

  border-radius: 16px;

  background-color: ${({ theme }) => theme.colors.root};

  box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
`;

const ActionModalTitle = styled(ModalTitle)`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;

  padding-top: 24px;
  padding-bottom: 16px;

  background-color: ${({ theme }) => theme.colors.root};

  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const ActionModalTopSection = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

const ModalContent = styled.div`
  color: ${({ theme }) => theme.colors.text};
  height: calc(100% - 64px - 72px);

  padding-bottom: 36px;

  overflow-y: auto;
`;

const ModalContentContainer = styled.div`
  padding: 0 24px;
`;

const ModalButtonContainer = styled.div<{ size?: 'small' | 'medium' | 'large' }>`
  position: fixed;

  bottom: 0;
  left: 0;
  right: 0;

  width: 100%;

  display: flex;
  justify-content: flex-end;
  gap: 8px;

  padding: 16px 24px;
  background-color: ${({ theme }) => theme.colors.root};

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;

  ${({ size }) => {
    if (size !== 'small') {
      return `box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.2);`;
    }
  }}
`;

const ModalButton = styled.button<{ buttonType: 'default' | 'primary' | 'error' | 'warning' }>`
  padding: 8px 16px;

  background-color: ${({ buttonType, theme }) =>
    buttonType === 'default' ? theme.colors.background : theme.colors[buttonType]};
  color: ${({ buttonType, theme }) => (buttonType === 'default' ? theme.colors.text : theme.colors.text)};

  border: none;
  border-radius: 8px;

  cursor: pointer;

  &:hover {
    background-color: ${({ buttonType, theme }) =>
      buttonType === 'default' ? theme.colors.backgroundHover : theme.colors[`${buttonType}Hover`]};
  }

  &:active {
    background-color: ${({ buttonType, theme }) =>
      buttonType === 'default' ? theme.colors.backgroundActive : theme.colors[`${buttonType}Active`]};
  }
`;

type ActionModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
  confirmText?: string;
  confirmType?: 'default' | 'primary' | 'error' | 'warning';
  onConfirm?: () => void;
  cancelText?: string;
  cancelType?: 'default' | 'primary' | 'error' | 'warning';
  onCancel?: () => void;
  disabledClickAway?: boolean;
  size?: 'small' | 'medium' | 'large';
};

const ActionModal: React.FC<ActionModalProps> = ({
  children,
  onClose,
  title,
  confirmText,
  confirmType = 'primary',
  onConfirm,
  cancelText,
  onCancel,
  cancelType = 'default',
  disabledClickAway,
  size = 'medium',
}) => {
  const { region } = useThemeStore();

  const ref = useClickAway<HTMLDivElement>(!disabledClickAway ? onClose : () => {});

  return createPortal(
    <ModalBackground>
      <ModalContainer ref={ref} size={size}>
        <ActionModalTopSection>
          {title && <ActionModalTitle>{title}</ActionModalTitle>}
          <ModalContent>
            <ModalContentContainer>{children}</ModalContentContainer>
          </ModalContent>
        </ActionModalTopSection>
        <ModalButtonContainer size={size}>
          <ModalButton
            onClick={() => {
              if (onCancel) {
                onCancel();
              }
              onClose();
            }}
            buttonType={cancelType}
          >
            {cancelText ??
              i18n(region, {
                ko: '취소',
                en: 'Cancel',
              })}
          </ModalButton>
          <ModalButton
            onClick={() => {
              if (onConfirm) {
                onConfirm();
              }
            }}
            buttonType={confirmType}
          >
            {confirmText ??
              i18n(region, {
                ko: '확인',
                en: 'Confirm',
              })}
          </ModalButton>
        </ModalButtonContainer>
      </ModalContainer>
    </ModalBackground>,
    document.body
  );
};

export default ActionModal;
