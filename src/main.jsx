import React from 'react'
import App from './App.jsx'
import './index.css'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import { ContextProvider } from './context/displayContext'
import { store } from './store/store.js'
import { Provider, useSelector } from 'react-redux'
import { VideoUpload, Signup, HomeVideos, Login, NotFoundPage, VideoPlayerPage, ServerDown, ProtectedComponent, SubscribedVideos } from "./components"

import { useDispatch } from 'react-redux'
import { autoLogin } from './store/asyncThunks/authThunk.js'

function Main() {
  const dispatch = useDispatch();
  const { userData, error } = useSelector(state => state.auth);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
      const initiateAutoLogin = async () => {
          try {
              await dispatch(autoLogin()); // use .unwrap() to handle any errors
          } catch (error) {
              console.error('Error during auto login:', error);
          } finally {
              setLoading(false); // Stop loading once auto-login completes
          }
      };

      initiateAutoLogin();
  }, [dispatch]);

  if (loading) return

  if (error && error.message === "Cannot read properties of undefined (reading 'status')") {
      return <ServerDown />;
  }

  const router = createBrowserRouter(
      createRoutesFromElements(
          <>
              <Route path="/" element={<App />}>
                  <Route path="/" element={<HomeVideos />} />

                  <Route
                      path="/subscriptions"
                      element={
                          <ProtectedComponent user={userData}>
                              <SubscribedVideos />
                          </ProtectedComponent>
                      }
                  />

                  <Route path="/auth/api/v1/login" element={<Login />} />
                  <Route path="/auth/api/v1/signup" element={<Signup />} />

                  <Route
                      path="/user/upload-video"
                      element={
                          <ProtectedComponent user={userData}>
                              <VideoUpload />
                          </ProtectedComponent>
                      }
                  />

                  <Route path="/videos/play" element={<VideoPlayerPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
          </>
      )
  );

  return <RouterProvider router={router} />;
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
