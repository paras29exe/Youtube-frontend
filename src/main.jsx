import React from 'react'
import App from './App.jsx'
import './index.css'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import { ContextProvider } from './context/displayContext'
import { store } from './store/store.js'
import { Provider, useSelector } from 'react-redux'
import { VideoUpload, Signup, Videos, Login, NotFoundPage, VideoPlayerPage,ServerDown } from "./components"

import { useDispatch } from 'react-redux'
import { autoLogin } from './store/ayncThunks/authThunk'
import { useEffect } from 'react'

function Main() {
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.auth)

  useEffect(() => {
    try {
      // Automatically log in the user from cookies stored when the app loads
      ; (async () => dispatch(autoLogin())
      )()
    } catch (error) {
      console.error('Error during auto login:', error)
    }
  }, [])


  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<App />} >
          <Route path="/" element={<Videos />} />
          <Route path="/auth/api/v1/login" element={<Login />} />
          <Route path="/auth/api/v1/signup" element={<Signup />} />
          <Route path="/user/upload-video" element={<VideoUpload />} />
        </Route>
        <Route path="/videos/play" element={<VideoPlayerPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </>

    )
  )

  if (error && error.message === "Cannot read properties of undefined (reading 'data')") return (
    <ServerDown />
  )

  return (
    <RouterProvider router={router} />
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <Main />
      </ContextProvider>
    </Provider>
  </React.StrictMode>
)
