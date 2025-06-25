import { VideoUpload, Signup, HomeVideos, Login, NotFoundPage, VideoPlayerPage, SubscribedVideos, Channel, DashBoard, EditAccount, UserVideosPage, EditVideo, SearchResults } from "./pages"
import App from './App.jsx'
import ProtectedComponent from './components/ProtectedComponet.jsx'
import ChannelHome from './pages/Channel/ChannelHome.jsx'
import ChannelVideos from './pages/Channel/ChannelVideos.jsx'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { useSelector } from "react-redux"
import ConfirmationPopup from "./utils/ConfirmationPopup.jsx"
import PlayUserVideo from "./pages/Dashboard/PlayUserVideo.jsx"
import WatchHistory from './pages/WatchHistory.jsx'
import ChannelPlaylists from "./pages/Channel/ChannelPlaylists.jsx"
import Playlists from "./pages/Dashboard/Playlists.jsx"
import PlaylistCard from "./components/cards/PlaylistCard.jsx"

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<App />}>
                <Route index element={<HomeVideos />} />
                <Route path="results" element={<SearchResults />} />
                <Route path="/auth/api/v1/login" element={<Login />} />
                <Route path="/auth/api/v1/signup" element={<Signup />} />
                <Route path='/channel/:username' element={<Channel />} >
                    <Route index element={<ChannelHome />} />
                    <Route path='videos' element={<ChannelVideos />} />
                    <Route path='playlists' element={<ChannelPlaylists />} />
                </Route>
                <Route path="/subscriptions"
                    element={
                        <ProtectedComponent>
                            <SubscribedVideos />
                        </ProtectedComponent>
                    }
                />
                <Route
                    path="/user/upload-video"
                    element={
                        <ProtectedComponent>
                            <VideoUpload />
                        </ProtectedComponent>
                    }
                />
                <Route path="/videos/play" element={<VideoPlayerPage />} />
                <Route path="/dashboard"
                    element={
                        <ProtectedComponent>
                            <DashBoard />
                        </ProtectedComponent>
                    }
                >
                    <Route path="edit-details" element={<EditAccount />} />
                    <Route path='videos' element={<UserVideosPage />} />
                    <Route path="videos/play" element={<PlayUserVideo />} />
                    <Route path='videos/edit' element={<EditVideo />} />
                    <Route path="playlists" element={<Playlists />} />
                </Route>
                <Route
                    path="/current-user/activity"
                    element={
                        <ProtectedComponent>
                            <WatchHistory />
                        </ProtectedComponent>
                    }
                />

            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </>
    ),
    {
        future: {
            v7_relativeSplatPath: true
        },
    }
);

const AppRouter = () => {

    return <RouterProvider router={router} future={{v7_startTransition: true}} />
};

export default AppRouter;
