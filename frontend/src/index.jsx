import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ContextProvider } from './Context';

const app = document.getElementById('app');
const root = createRoot(app);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
