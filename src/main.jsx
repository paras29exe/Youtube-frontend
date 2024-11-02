import React from 'react'
import App from './App.jsx'
import './index.css'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import { ContextProvider } from './context/displayContext'
import { store } from './store/store.js'
import { Provider, useSelector } from 'react-redux'
import { VideoUpload, Signup, HomeVideos, Login, NotFoundPage, VideoPlayerPage, ServerDown, SubscribedVideos, Channel } from "./pages"
import ProtectedComponent from './components/ProtectedComponet.jsx'
import { useDispatch } from 'react-redux'
import { autoLogin } from './store/asyncThunks/authThunk.js'
import InitialSkeleton from './components/InitialSkeleton.jsx'
import ChannelHome from './components/channelPage/ChannelHome.jsx'
import ChannelVideos from './components/channelPage/ChannelVideos.jsx'

function Main() {
    const dispatch = useDispatch();
    const { userData, error } = useSelector(state => state.auth);
    const [initialLoading, setInitialLoading] = React.useState(true);

      React.useEffect(() => {
          const initiateAutoLogin = async () => {
              try {
                  await dispatch(autoLogin()); // use .unwrap() to handle any errors
              } catch (error) {
                  console.error('Error during auto login:', error);
              } finally {
                  setInitialLoading(false); // Stop loading once auto-login completes
              }
          };

          initiateAutoLogin();
      }, []);

      if (initialLoading) return <InitialSkeleton />

    if (error && error.message === "Cannot read properties of undefined (reading 'status')") {
        return <ServerDown />;
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<App />}>
                    <Route index element={<HomeVideos />} />
                    <Route path="/auth/api/v1/login" element={<Login />} />
                    <Route path="/auth/api/v1/signup" element={<Signup />} />
                    <Route path='/channel/:username' element={<Channel />} >
                        <Route index element={<ChannelHome />} />
                        <Route path='videos' element={<ChannelVideos />} />
                    </ Route>
                    <Route path="/subscriptions"
                        element={
                            <ProtectedComponent user={userData}>
                                <SubscribedVideos />
                            </ProtectedComponent>
                        }
                    />
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
