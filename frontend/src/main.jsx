import { StrictMode, React } from 'react'
import { createRoot, ReactDom } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>
)
