import React, { useCallback } from 'react';
import { createPortal } from 'react-dom';

import styled from '@emotion/styled';
import ActionModal from './common/ActionModal';
import Line from './common/Line';

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
  disabledClickAway?: boolean;
  children?: React.ReactNode;
};

const CreateWidgetModal: React.FC<CreateWidgetModalProps> = ({
  onClose,
  title,
  PreviewWidget,
  onConfirm,
  disabledClickAway,
  children,
}) => {
  const handleClickAway = useCallback(() => {
    if (!disabledClickAway) {
      onClose();
    }
  }, [disabledClickAway, onClose]);

  return createPortal(
    <ActionModal
      onClose={handleClickAway}
      title={title}
      onConfirm={onConfirm}
      confirmText="생성"
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
