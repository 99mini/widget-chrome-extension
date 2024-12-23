import React from 'react';

import DndProvider from './DndProvider';
import ThemeProvider from './ThemeProvider';
import { DefaultProviderProps } from './type';

const RootProvider: React.FC<DefaultProviderProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <DndProvider>{children}</DndProvider>
    </ThemeProvider>
  );
};

export default RootProvider;
