import React from 'react';

import RootProvider from './context';

import NewTab from './newTab';

import GlobalStyle from './GlobalStyle';

function App() {
  return (
    <RootProvider>
      <GlobalStyle>
        <NewTab />
      </GlobalStyle>
    </RootProvider>
  );
}

export default App;
