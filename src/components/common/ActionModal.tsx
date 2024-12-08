import React from 'react';
import { createPortal } from 'react-dom';

import styled from '@emotion/styled';

import { ModalBackground, ModalTitle } from './Modal';

import useClickAway from '@/hook/useClickAway';

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: center;

  gap: 16px;

  padding: 24px;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 480px;
  min-height: 360px;

  box-sizing: border-box;

  border-radius: 16px;

  background-color: ${({ theme }) => theme.colors.root};

  box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
`;

const ActionModalTitle = styled(ModalTitle)``;

const ActionModalTopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 100%;
`;

const ModalContent = styled.div`
  color: ${({ theme }) => theme.colors.text};
`;

const ModalButtonContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const ModalButton = styled.button<{ buttonType: 'default' | 'primary' | 'error' | 'warning' }>`
  padding: 8px 16px;

  background-color: ${({ buttonType, theme }) =>
    buttonType === 'default' ? theme.colors.background : theme.colors[buttonType]};
  color: ${({ buttonType, theme }) => (buttonType === 'default' ? theme.colors.text : theme.colors.text)};

  border: none;
  border-radius: 8px;

  cursor: pointer;

  transition: background-color 237ms;

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
};

const ActionModal: React.FC<ActionModalProps> = ({
  children,
  onClose,
  title,
  confirmText = '확인',
  confirmType = 'primary',
  onConfirm,
  cancelText = '취소',
  onCancel,
  cancelType = 'default',
  disabledClickAway,
}) => {
  const ref = useClickAway<HTMLDivElement>(!disabledClickAway ? onClose : () => {});

  return createPortal(
    <ModalBackground>
      <ModalContainer ref={ref}>
        <ActionModalTopSection>
          {title && <ActionModalTitle>{title}</ActionModalTitle>}
          <ModalContent>{children}</ModalContent>
        </ActionModalTopSection>
        <ModalButtonContainer>
          <ModalButton
            onClick={() => {
              if (onCancel) {
                onCancel();
              }
              onClose();
            }}
            buttonType={cancelType}
          >
            {cancelText}
          </ModalButton>
          <ModalButton
            onClick={() => {
              if (onConfirm) {
                onConfirm();
              }
              onClose();
            }}
            buttonType={confirmType}
          >
            {confirmText}
          </ModalButton>
        </ModalButtonContainer>
      </ModalContainer>
    </ModalBackground>,
    document.body
  );
};

export default ActionModal;
