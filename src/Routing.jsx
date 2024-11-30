import { VideoUpload, Signup, HomeVideos, Login, NotFoundPage, VideoPlayerPage, SubscribedVideos, Channel, DashBoard, EditAccount, UserVideosPage, EditVideo } from "./pages"
import App from './App.jsx'
import ProtectedComponent from './components/ProtectedComponet.jsx'
import ChannelHome from './components/channelPage/ChannelHome.jsx'
import ChannelVideos from './components/channelPage/ChannelVideos.jsx'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { useSelector } from "react-redux"

const AppRouter = () => {
    const { userData } = useSelector(state => state.auth);

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
                    </Route>
                    <Route path="/subscriptions"
                        element={
                            <ProtectedComponent user={userData}>
                                <SubscribedVideos />
                            </ProtectedComponent>
                        }
                    />
                    <Route
                        path="/users/current-user/dashboard"
                        element={
                            <ProtectedComponent user={userData}>
                                <DashBoard />
                            </ProtectedComponent>
                        }
                    >
                        <Route path="edit-details" element={<EditAccount />} />
                        <Route path='videos' element={<UserVideosPage />} />
                    </Route>
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
    return <RouterProvider router={router} />
};

export default AppRouter;