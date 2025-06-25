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
        if (location.pathname.endsWith("/dashboard") || location.pathname.endsWith("/dashboard/")) navigate("edit-details")

        async function getStats() {
            try {
                const res = await dispatch(getChannelStats()).unwrap();
            } catch (error) {
                console.error(error);
            }
        }
        !stats && getStats()
    }, [location.pathname])

    return (
        <div className="w-full h-full pb-20 overflow-auto relative">
            {/* Subscribers Badge */}
            <div className="absolute right-0 top-2 z-50">
                <p className="flex items-center gap-x-2 px-3 py-1 rounded-full bg-red-600">
                    <FaUsers />
                    <span className="text-xs xs:text-sm md2:text-base text-gray-300">{stats?.totalSubscribers || 0} Subs</span>
                </p>
            </div>

            {/* Dashboard Title */}
            <h1 className="text-lg xs:text-xl md2:text-2xl lg2:text-3xl font-bold font-sans text-center mb-2">
                Dashboard
            </h1>

            {/* Navigation Links */}
            <div className="flex flex-wrap border sticky top-0 z-10 bg-black">
                <NavLink
                    to={"edit-details"}
                    className={({ isActive }) =>
                        `${isActive ? "fill-black text-black bg-white" : "fill-white text-white"
                        } bg-inherit max-sm:w-1/2 max-sm:border-b w-1/4 p-2 flex items-center justify-center gap-x-2 whitespace-nowrap cursor-pointer transition-all duration-300 border-r hover:bg-white hover:text-black hover:fill-black`
                    }
                >
                    <p className="text-xs xs:text-sm md2:text-base text-inherit">Edit Details</p>
                    <FaEdit className="fill-inherit text-sm xs:text-lg md2:text-xl" />
                </NavLink>

                <NavLink
                    to="videos"
                    className={({ isActive }) =>
                        `${isActive ? "fill-black text-black bg-white" : "fill-white text-white"
                        } bg-inherit max-sm:w-1/2 max-sm:border-b w-1/4 p-2 flex items-center justify-center gap-x-2 whitespace-nowrap cursor-pointer transition-all duration-200 border-r hover:bg-white hover:text-black hover:fill-black`
                    }
                >
                    <p className="text-xs xs:text-sm md2:text-base text-inherit">({stats?.totalVideos || 0}) Videos</p>
                    <FaVideo className="fill-inherit text-sm xs:text-lg md2:text-xl" />
                </NavLink>

                <NavLink
                    to="playlists"
                    className={({ isActive }) =>
                        `${isActive ? "fill-black text-black bg-white" : "fill-white text-white"
                        } bg-inherit max-sm:w-1/2 w-1/4 p-2 flex items-center justify-center gap-x-2 whitespace-nowrap cursor-pointer transition-all duration-200 border-r hover:bg-white hover:text-black hover:fill-black`
                    }
                >
                    <p className="text-xs xs:text-sm md2:text-base text-inherit">({stats?.totalPlaylists || 0}) Playlists</p>
                    <MdQueueMusic className="fill-inherit text-base xs:text-lg md2:text-2xl" />
                </NavLink>

                <NavLink
                    to="/subscribed-channels"
                    className={({ isActive }) =>
                        `${isActive ? "fill-black text-black bg-white" : "fill-white text-white"
                        } bg-inherit max-sm:w-1/2 w-1/4 p-2 flex items-center justify-center gap-x-2 whitespace-nowrap cursor-pointer transition-all duration-200 hover:bg-white hover:text-black hover:fill-black`
                    }
                >
                    <p className="text-xs xs:text-sm md2:text-base text-inherit">Subscribed Channels</p>
                    <MdSubscriptions className="fill-inherit text-base xs:text-lg md2:text-2xl" />
                </NavLink>
            </div>

            {/* Main Content */}
            <div className="pt-6 ">
                <Outlet />
            </div>
        </div>

    )
}

export default DashBoard