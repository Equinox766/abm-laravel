import React from 'react'
import router from './router'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ProductoProvider } from './context/ProductoProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductoProvider>
      <RouterProvider router={router} />
    </ProductoProvider>
  </React.StrictMode>,
)
