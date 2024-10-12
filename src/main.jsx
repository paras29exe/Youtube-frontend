import React from 'react'
import App from './App.jsx'
import './index.css'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import { ContextProvider } from './context/displayContext'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { VideoUpload, Signup, Videos,Login, NotFoundPage,VideoPlayerPage } from "./components"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} >
        <Route path="/" element={<Videos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user/upload-video" element={<VideoUpload />} />
      </Route>
      <Route path="/videos/play" element={<VideoPlayerPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </>

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
