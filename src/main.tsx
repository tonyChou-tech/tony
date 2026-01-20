import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import './i18n/config'

// 動態載入 Google AdSense
const adsenseClientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;
if (adsenseClientId && import.meta.env.PROD) {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter basename="/tony">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
