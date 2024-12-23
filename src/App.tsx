import React from 'react';

import GlobalStyle from './GlobalStyle';
import RootProvider from './context';
import NewTab from './newTab';

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
