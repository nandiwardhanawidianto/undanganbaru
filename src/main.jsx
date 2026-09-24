import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Hitam2Preview from './Hitam2Preview.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/preview/hitam2/:slugId" element={<Hitam2Preview />} />
        <Route path="/:slugId" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
