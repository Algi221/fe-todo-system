import { createRoot } from 'react-dom/client'
import './index.css'    
import Route from './Route.tsx'
import { BrowserRouter } from "react-router";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Route />
  </BrowserRouter>,
)

