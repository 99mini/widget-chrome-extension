import React from 'react';

import GlobalStyle from '@/GlobalStyle';
import RootProvider from '@/context';

import Popup from '.';

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
