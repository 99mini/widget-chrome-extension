import React from 'react';
import NewTab from './newTab';
import RootProvider from './context';

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
