import React from 'react';

import GlobalStyle from './GlobalStyle';
import NewTab from './app/new-tab';
import RootProvider from './context';

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
