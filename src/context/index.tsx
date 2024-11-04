import React from 'react';
import { DefaultProviderProps } from './type';
import DndProvider from './DndProvider';

const RootProvider: React.FC<DefaultProviderProps> = ({ children }) => {
  return <DndProvider>{children}</DndProvider>;
};

export default RootProvider;
