import { StrictMode } from 'react'
// import React from 'react'
// import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'

import { RouterProvider } from 'react-router-dom'
import { router } from './app/router.tsx'

import './index.css'
// import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
