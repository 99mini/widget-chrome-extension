import styled from '@emotion/styled';
import React, { useEffect } from 'react';

import Switch from './Switch';

import useThemeStore from '@/hook/useTheme';

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.sizes.header}
`;

const Header: React.FC = () => {
  const {
    mode,
    actions: { setMode, getMode },
  } = useThemeStore();

  useEffect(() => {
    getMode();
  }, [getMode]);

  console.log(mode);

  return (
    // 3 children
    <Container>
      <div></div>
      <div></div>
      <Switch
        InputProps={{
          checked: mode === 'dark',
          title: 'Dark Mode',
          onChange: () => setMode(mode === 'dark' ? 'light' : 'dark'),
        }}
      />
    </Container>
  );
};

export default Header;
