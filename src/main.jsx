import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './components/HomePage'
import BoardPage from './components/BoardPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}>
        </Route>
        <Route path="/board" element={<BoardPage></BoardPage>}>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
