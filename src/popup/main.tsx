import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@/index.css';
import mock from '@/mock';

import App from '.';
import './index.css';

mock();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
