import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthContextProvider from "./context/Auth";
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthContextProvider>
)
