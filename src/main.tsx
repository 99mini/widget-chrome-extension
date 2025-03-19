import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import './index.css';
import mock from './lib/mock';

mock();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
