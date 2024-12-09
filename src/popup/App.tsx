import React from 'react';

import RootProvider from '@/context';

import Popup from '.';

import GlobalStyle from '@/GlobalStyle';

function App() {
  return (
    <RootProvider>
      <GlobalStyle>
        <Popup />
      </GlobalStyle>
    </RootProvider>
  );
}

export default App;
