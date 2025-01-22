import React, { useState } from 'react';

import styled from '@emotion/styled';

import CustomWidgetModal from '@/components/createModal/CustomWidgetModal';

import useThemeStore from '@/hook/useTheme';

import { i18n } from '@/utils/string';

const FloatContainer = styled.footer`
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
      <FloatContainer>
        <AddWidgetButton onClick={() => setOpenAddWidget(true)} en={region === 'en'}>
          {i18n(region, {
            ko: '+ 위젯 추가',
            en: '+ Add Widget',
          })}
        </AddWidgetButton>
      </FloatContainer>
      {openAddWidget && <CustomWidgetModal onClose={() => setOpenAddWidget(false)} />}
    </>
  );
};

export default Footer;
