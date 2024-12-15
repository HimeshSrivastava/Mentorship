import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import { AuthContextProvider } from './components/contex/AuthContex.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
    <AuthContextProvider>
    <App />
  </AuthContextProvider>
  </Router>
  </StrictMode>,
)
