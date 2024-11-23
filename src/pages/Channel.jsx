import React, { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import { getChannel } from '../store/asyncThunks/channelThunk'
import { displayContext } from '../context/displayContext'
import { toggleSubscribe } from '../store/asyncThunks/likeSubscribeThunk'
import { FaBell } from 'react-icons/fa'
import Popup from '../utils/Popup'
import defaultCover from '../assets/CoverImage.png'
import NotFoundPage from './NotFoundPage'

function Channel() {
    const path = window.location.pathname;
    const match = path.match(/\/channel\/@([^/]+)/);

    const username = match ? match[1] : null;
    const dispatch = useDispatch()

    const { userData } = useSelector(state => state.auth)
    const { channel, loading, error } = useSelector((state) => state.channel)
    const user = channel?.channelDetails

    const [subscriberCount, setSubscriberCount] = React.useState(user?.subscribers)
    const [isSubscribed, setIsSubscribed] = React.useState(user?.subscribedByViewer)
    const { showPopup, togglePopup, setNotFound } = useContext(displayContext)

    useEffect(() => {
        async function fetchChannel() {
            const res = await dispatch(getChannel(username))

            if (res.error?.message.toLowerCase() === "channel not found") setNotFound(true)
            else setNotFound(false)
        }
        fetchChannel()
    }, [username])

    useEffect(() => {
        if (user) {
            setSubscriberCount(user.subscribers);
            setIsSubscribed(user.subscribedByViewer)
        }
    }, [user]);

    if (loading ) return 

    if (user && !error) return (
        <div className='h-screen w-screen overflow-x-hidden overflow-y-auto box-border 2xl:px-28 xl:px-16 lg:px-5'>
            <div className="upper h-3/5 w-full bg-hite flex inset-0 flex-col gap-y-8 mb-1">
                {/* cover  image */}
                <div className='coverimage w-full h-2/5'>
                    <img className='w-full h-full object-cover rounded-xl' src={user.coverImage || defaultCover} alt="Cover Image" />
                </div>
                {/* profile info */}
                <div className="profile w-full h-2/5">
                    <div className='h-full flex gap-x-4'>
                        <img className='h-full aspect-square rounded-full object-cover' src={user.avatar} alt="Profile" />
                        <div className='pt-2'>
                            <h2 className='text-4xl font-extrabold' >{user.channelName}</h2>
                            <div className='flex gap-x-1'>
                                <p className='text-gray-500'>@{user.username}</p>
                                <p className='text-gray-500'>•</p>
                                <p className='text-gray-500'> {subscriberCount} subscribers </p>
                                <p className='text-gray-500'>•</p>
                                <p className="text-gray-500"> {user.totalVideos} videos</p>
                            </div>
                            <div className='mt-5'>
                                <button
                                    onClick={() => {
                                        if (userData) {
                                            dispatch(toggleSubscribe(user._id))
                                            setIsSubscribed(prev => !prev)
                                            setSubscriberCount(isSubscribed ? subscriberCount - 1 : subscriberCount + 1)
                                        } else {
                                            togglePopup()
                                        }

                                    }}
                                    className={`px-3 py-1.5 text-sm rounded-full flex items-center transition-all duration-300 ${isSubscribed && userData ? "bg-gray-600/35" : "bg-white text-black"}`}
                                >
                                    <FaBell className={` ${isSubscribed && userData ? "fill-white" : "fill-black "}`} />
                                    <span className="ml-1 font-sans font-bold text-inherit">{isSubscribed && userData ? "Subscribed" : "Subscribe"}</span>
                                </button>

                            </div>
                            {
                                showPopup &&
                                <Popup
                                    onClose={() => togglePopup()}
                                    onConfirm={() => togglePopup()}
                                />
                            }
                        </div>
                    </div>

                </div>
                {/* navigation */}
                <div className='navigation h-1/5 flex items-end gap-x-8'>
                    <NavLink to={""} end className={({ isActive }) => `${isActive ? "underline underline-offset-8 text-white" : "text-gray-400"} hover:underline-offset-8 hover:underline `}> Home </NavLink>
                    <NavLink to={"videos"} className={({ isActive }) => `${isActive ? "underline underline-offset-8 text-white" : "text-gray-400"} hover:underline-offset-8 hover:underline `}> Videos </NavLink>
                    <NavLink to={"playlists"} className={({ isActive }) => ` ${isActive ? "underline underline-offset-8 text-white" : "text-gray-400"} hover:underline-offset-8 hover:underline `}> Playlists </NavLink>
                </div>
                {/* dividor */}
                <div className='-mt-7 relative -left-28 w-screen h-0.5 flex-none bg-gray-500/40'></div>
            </div>
            {/* videos */}

            <div className='videos w-full pt-8 pb-16'>
                <Outlet />
            </div>
        </div>
    )
}

export default Channel