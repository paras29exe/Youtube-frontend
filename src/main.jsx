import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import { ContextProvider } from './context/displayContext'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { VideoUpload, Signup, Videos } from "./components"
import App from './App.jsx'
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path="/" element={<Videos />} />
      <Route path="/login" element={<login />} /> 
      <Route path="/signup" element={<Signup />} />
      <Route path="/upload" element={<VideoUpload />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>

        <RouterProvider router={router} />

      </ContextProvider>
    </Provider>
  </React.StrictMode>
)
