import React from 'react';
import { createPortal } from 'react-dom';

import styled from '@emotion/styled';
import ActionModal from './common/ActionModal';

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
  children?: React.ReactNode;
};

const CreateWidgetModal: React.FC<CreateWidgetModalProps> = ({
  onClose,
  title,
  PreviewWidget,
  onConfirm,
  children,
}) => {
  return createPortal(
    <ActionModal onClose={onClose} title={title} onConfirm={onConfirm}>
      <PreviewContainer>
        <PreviewWrapper>{PreviewWidget}</PreviewWrapper>
        {children}
      </PreviewContainer>
    </ActionModal>,
    document.body
  );
};

export default CreateWidgetModal;
