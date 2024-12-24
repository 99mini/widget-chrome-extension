import React, { useCallback } from 'react';
import { createPortal } from 'react-dom';

import styled from '@emotion/styled';

import ActionModal from '@/components/common/ActionModal';
import Line from '@/components/common/Line';

import useThemeStore from '@/hook/useTheme';

import { i18n } from '@/utils/string';

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;

  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const PreviewWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 372px;
`;

type CreateWidgetModalProps = {
  onClose: () => void;
  title: string;
  PreviewWidget: React.ReactNode;
  onConfirm: () => void;
  isEdit?: boolean;
  disabledClickAway?: boolean;
  requireConfirm?: boolean;
  children?: React.ReactNode;
};

const CreateWidgetModal: React.FC<CreateWidgetModalProps> = ({
  onClose,
  title,
  PreviewWidget,
  onConfirm,
  isEdit,
  disabledClickAway,
  requireConfirm = true,
  children,
}) => {
  const { region } = useThemeStore();

  const handleClickAway = useCallback(() => {
    if (!disabledClickAway) {
      onClose();
    }
  }, [disabledClickAway, onClose]);

  return createPortal(
    <ActionModal
      onClose={handleClickAway}
      title={title}
      onConfirm={() => {
        if (requireConfirm) {
          onConfirm();
          onClose();
        }
      }}
      confirmText={i18n(region, {
        ko: isEdit ? '수정' : '생성',
        en: isEdit ? 'Edit' : 'Create',
      })}
      disabledClickAway={disabledClickAway}
    >
      <PreviewContainer>
        <PreviewWrapper>{PreviewWidget}</PreviewWrapper>
        <Line maxWidth="unset" />
        {children}
      </PreviewContainer>
    </ActionModal>,
    document.body
  );
};

export default CreateWidgetModal;
