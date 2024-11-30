import React, { useState } from 'react';
import styled from '@emotion/styled';

import Clock from '@/widget/Clock';
import Switch from './Switch';

import { mode, actions } from '@/hook/useTheme';

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 16px;
`;

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(mode === 'dark');

  return (
    <Container>
      <div></div>
      <Clock />
      <Switch
        InputProps={{
          checked: isDarkMode,
          onChange: async () => {
            setIsDarkMode((prev) => {
              actions.setMode(prev ? 'light' : 'dark');
              return !prev;
            });
          },
        }}
      />
    </Container>
  );
};

export default Header;
