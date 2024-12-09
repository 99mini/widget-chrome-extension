import React, { useState } from 'react';

import styled from '@emotion/styled';
import CustomWidgetModal from './CustomWidgetModal';

const AdArea = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const FloatContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  ${({ theme }) => theme.sizes.footer}

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const AddWidgetButton = styled.button`
  width: 94px;

  padding: 8px 16px;

  box-sizing: border-box;

  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  border: none;
  border-radius: 8px;

  box-sizing: initial;
`;

const Footer: React.FC = () => {
  const [openAddWidget, setOpenAddWidget] = useState(false);

  return (
    <>
      <AdArea></AdArea>
      <FloatContainer>
        <AddWidgetButton onClick={() => setOpenAddWidget(true)}>{'+ 위젯 추가'}</AddWidgetButton>
      </FloatContainer>
      {openAddWidget && <CustomWidgetModal onClose={() => setOpenAddWidget(false)} />}
    </>
  );
};

export default Footer;
