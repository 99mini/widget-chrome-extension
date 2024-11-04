import React from 'react';
import NewTab from './newTab';
import RootProvider from './context';

function App() {
  return (
    <RootProvider>
      <NewTab />
    </RootProvider>
  );
}

export default App;
