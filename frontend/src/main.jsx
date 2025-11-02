import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './assets/css/rating.css';
import { AuthProvider } from "./components/AuthContext.jsx";


import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
