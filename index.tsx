import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { WalletProvider } from './context/WalletContext';
import { CartProvider } from './context/CartContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <WalletProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </WalletProvider>
  </React.StrictMode>
);
