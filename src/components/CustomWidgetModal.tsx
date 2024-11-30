import styled from '@emotion/styled';
import React from 'react';
import { createPortal } from 'react-dom';

import { ModalBackground, ModalContainerCSS } from './Modal';

import useClickAway from '@/hook/useClickAway';
import Clock from '@/widget/Clock';

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;

  width: 80%;
  height: 80%;

  padding: 24px;

  ${ModalContainerCSS}
`;

const WidgetList = styled.div`
  display: grid;
  gap: ${({ theme }) => `${theme.sizes.widget.columnGap}px ${theme.sizes.widget.rowGap}px `};
  justify-content: center;

  grid-template-columns: repeat(auto-fill, 60px);
`;

const ClickableWidget = styled.button<{ rowSpan?: boolean; colSpan?: boolean }>`
  grid-row: ${({ rowSpan }) => (rowSpan ? 'span 2' : 'span 1')};
  grid-column: ${({ colSpan }) => (colSpan ? 'span 2' : 'span 1')};

  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

type CustomWidgetModalProps = {
  onClose: () => void;
};

const CustomWidgetModal: React.FC<CustomWidgetModalProps> = ({ onClose }) => {
  const ref = useClickAway<HTMLDivElement>(onClose, 300);

  return createPortal(
    <ModalBackground>
      <ModalContainer ref={ref}>
        <WidgetList>
          <ClickableWidget rowSpan colSpan>
            <Clock />
          </ClickableWidget>
        </WidgetList>
      </ModalContainer>
    </ModalBackground>,
    document.body
  );
};

export default CustomWidgetModal;
