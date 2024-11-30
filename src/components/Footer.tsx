import React, { useState } from 'react';

import styled from '@emotion/styled';
import CustomWidgetModal from './CustomWidgetModal';

const AdArea = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const FooterContainer = styled.footer`
  ${({ theme }) => theme.sizes.footer}

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const AddWidgetButton = styled.button`
  padding: 8px 16px;

  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};

  border: none;
  border-radius: 8px;

  cursor: pointer;
`;

const Footer: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AdArea></AdArea>
      <FooterContainer>
        <AddWidgetButton onClick={() => setOpen(true)}>{'위젯 추가'}</AddWidgetButton>
      </FooterContainer>
      {open && <CustomWidgetModal onClose={() => setOpen(false)} />}
    </>
  );
};

export default Footer;
