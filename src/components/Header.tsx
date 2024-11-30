import React, { useState } from 'react';
import styled from '@emotion/styled';

import Switch from './Switch';

import useThemeStore from '@/hook/useTheme';

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 16px;
`;

const Header: React.FC = () => {
  const {
    mode,
    actions: { setMode },
  } = useThemeStore();
  const [isDarkMode, setIsDarkMode] = useState(mode === 'dark');

  return (
    // 3 children
    <Container>
      <div></div>
      <div></div>
      <Switch
        InputProps={{
          checked: isDarkMode,
          onChange: async () => {
            setIsDarkMode((prev) => {
              setMode(prev ? 'light' : 'dark');
              return !prev;
            });
          },
        }}
      />
    </Container>
  );
};

export default Header;
