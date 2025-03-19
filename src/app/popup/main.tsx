import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import mock from '@/lib/mocks';

import '@/index.css';

import App from '.';
import './index.css';

mock();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
