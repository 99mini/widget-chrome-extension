import React from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

import { ModalBackground, ModalContainerCSS } from './Modal';

import useClickAway from '@/hook/useClickAway';

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;

  width: 50%;
  height: 50%;

  ${ModalContainerCSS}
`;

type CustomWidgetModalProps = {
  onClose: () => void;
};

const CustomWidgetModal: React.FC<CustomWidgetModalProps> = ({ onClose }) => {
  const ref = useClickAway<HTMLDivElement>(onClose, 300);

  return createPortal(
    <ModalBackground>
      <ModalContainer ref={ref}></ModalContainer>
    </ModalBackground>,
    document.body
  );
};

export default CustomWidgetModal;
