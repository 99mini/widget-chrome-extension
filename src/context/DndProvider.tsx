import React from 'react';

import { DndProvider as ReactDndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { DefaultProviderProps } from './type';

const DndProvider: React.FC<DefaultProviderProps> = ({ children }) => {
  return <ReactDndProvider backend={HTML5Backend}>{children}</ReactDndProvider>;
};

export default DndProvider;
