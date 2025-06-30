import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import './i18n';
import './index.css';

/**
 * Service Worker Registration
 * Registers the service worker for PWA functionality
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

/**
 * Application Entry Point
 * Renders the main App component with React StrictMode for development
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
