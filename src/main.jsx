import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SearchProvider } from './context/SearchContext';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <AuthProvider>
   <SearchProvider>
      <Toaster
  position="bottom-left"
  toastOptions={{
    style: {
      fontSize: '1rem',
      fontWeight: '600',
      padding: '14px 18px',
      borderRadius: '8px',
      background: '#fef3c7', // soft yellow bg
      color: '#92400e',       // dark amber text
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
    },
    success: {
      style: {
        background: '#d1fae5', // soft green
        color: '#065f46',
      },
    },
    error: {
      style: {
        background: '#fee2e2', // soft red
        color: '#7f1d1d',
      },
    },
  }}
/>
    <App />
    </SearchProvider>
     </AuthProvider>
  </BrowserRouter>
);
