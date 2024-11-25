import React from 'react'
import { FaEdit, FaVideo, FaUsers } from 'react-icons/fa';
import { MdQueueMusic, MdSubscriptions } from 'react-icons/md'
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { getChannelStats } from '../../store/asyncThunks/accountThunk';
import { useDispatch, useSelector } from 'react-redux';

function DashBoard() {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const { stats } = useSelector(state => state.account)

    React.useEffect(() => {
        if(location.pathname.endsWith("/dashboard") || location.pathname.endsWith("/dashboard/")) navigate("edit-details")
            
        async function getStats() {
            try {
                const res = await dispatch(getChannelStats()).unwrap();
            } catch (error) {
                console.error(error);
            }
        }
        !stats && getStats()
    }, [])

    if (stats) return (
        <div className='w-full h-full overflow-auto relative'>
            <div className='absolute right-0 top-2 z-50'>
                <p className='flex items-center gap-x-2 px-3 py-1 rounded-full bg-red-600'>
                    <FaUsers />
                    <span className="text-sm text-gray-300">{stats.totalSubscribers} Subs</span>
                </p>
            </div>
            <h1 className=' text-3xl font-bold font-sans text-center mb-2 '>Dashboard</h1>

            <div className='flex gap-x-0.5 border sticky top-0 z-10 bg-black'>
                <NavLink
                    to={"edit-details"}
                    className={({ isActive }) =>
                        `${isActive ? "fill-black text-black bg-white" : "fill-white text-white"} bg-inherit w-1/4 p-2 flex items-center justify-center gap-x-2 cursor-pointer  transition-all duration-300border-r hover:bg-white hover:text-black hover:fill-black`
                    }
                >
                    <p className="text-sm text-inherit">Edit Details</p>
                    <FaEdit className="fill-inherit text-xl" />
                </NavLink>

                <NavLink
                    to="videos"
                    className={({ isActive }) =>
                        `${isActive ? "fill-black text-black bg-white" : "fill-white text-white"} bg-inherit w-1/4 p-2 flex items-center justify-center gap-x-2 cursor-pointer transition-all duration-200 border-r hover:bg-white hover:text-black hover:fill-black`
                    }
                >
                    <p className="text-sm text-inherit">({stats.totalVideos}) Videos</p>
                    <FaVideo className="fill-inherit text-xl" />
                </NavLink>

                <NavLink
                    to="playlists"
                    className={({ isActive }) =>
                        `${isActive ? "fill-black text-black bg-white" : "fill-white text-white"} bg-inherit w-1/4 p-2 flex items-center justify-center gap-x-2 cursor-pointer transition-all duration-200 border-r hover:bg-white hover:text-black hover:fill-black`
                    }
                >
                    <p className="text-sm text-inherit">({stats.totalPlaylists}) Playlists</p>
                    <MdQueueMusic className="fill-inherit text-2xl" />
                </NavLink>

                <NavLink
                    to="/subscribed-channels"
                    className={({ isActive }) =>
                        `${isActive ? "fill-black text-black bg-white" : "fill-white text-white"} bg-inherit w-1/4 p-2 flex items-center justify-center gap-x-2 cursor-pointer transition-all duration-200 hover:bg-white hover:text-black hover:fill-black`
                    }
                >
                    <p className="text-sm text-inherit">Subscribed Channels</p>
                    <MdSubscriptions className="fill-inherit text-2xl" />
                </NavLink>

            </div>
            <div className='pt-6 px-10'>
                <Outlet />
            </div>
        </div>
    )
}

export default DashBoard