import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import Switch from './common/Switch';
import SettingModal from './SettingModal';

import useThemeStore from '@/hook/useTheme';

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.sizes.header}
`;

const RighetArea = styled.div`
  display: flex;
  gap: 8px;

  justify-content: flex-end;
  align-items: center;
`;

const SettingtButton = styled.button`
  width: 56px;

  padding: 8px 16px;

  box-sizing: border-box;

  background-color: transparent;
  color: ${({ theme }) => theme.colors.text};

  border: none;
  border-radius: 8px;

  box-sizing: initial;
`;

const Header: React.FC = () => {
  const {
    mode,
    region,
    actions: { setMode, getMode, getRegion },
  } = useThemeStore();

  const [openSetting, setOpenSetting] = useState(false);

  useEffect(() => {
    getMode();
  }, [getMode]);

  useEffect(() => {
    getRegion();
  }, [getRegion]);

  return (
    // 3 children
    <Container>
      <div></div>
      <div></div>
      <RighetArea>
        <Switch
          InputProps={{
            checked: mode === 'dark',
            title: 'Dark Mode',
            onChange: () => setMode(mode === 'dark' ? 'light' : 'dark'),
          }}
        />
        <SettingtButton onClick={() => setOpenSetting(true)}>{region === 'ko' ? '설정' : 'setting'}</SettingtButton>
      </RighetArea>
      {openSetting && <SettingModal onClose={() => setOpenSetting(false)} />}
    </Container>
  );
};

export default Header;
