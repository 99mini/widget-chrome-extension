import React from 'react';
import { DefaultProviderProps } from './type';

import DndProvider from './DndProvider';
import ThemeProvider from './ThemeProvider';

const RootProvider: React.FC<DefaultProviderProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <DndProvider>{children}</DndProvider>
    </ThemeProvider>
  );
};

export default RootProvider;
