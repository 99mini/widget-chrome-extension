import React, { useState } from 'react';

import styled from '@emotion/styled';

import CustomWidgetModal from '@/components/createModal/CustomWidgetModal';

import useThemeStore from '@/hook/useTheme';

const AdArea = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  padding: 0 36px;
  margin-top: 16px;
  margin-bottom: 80px;
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

const AddWidgetButton = styled.button<{ en?: boolean }>`
  width: ${({ en }) => (en ? '132px' : '94px;')};

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

  const { region } = useThemeStore();

  return (
    <>
      <AdArea></AdArea>
      <FloatContainer>
        <AddWidgetButton onClick={() => setOpenAddWidget(true)} en={region === 'en'}>
          {region === 'ko' ? '+ 위젯 추가' : '+ Add Widget'}
        </AddWidgetButton>
      </FloatContainer>
      {openAddWidget && <CustomWidgetModal onClose={() => setOpenAddWidget(false)} />}
    </>
  );
};

export default Footer;
