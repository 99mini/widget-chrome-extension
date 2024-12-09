import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '.';
import mock from '@/mock';

import '@/index.css';
import './index.css';

mock();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
