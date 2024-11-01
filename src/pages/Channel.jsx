import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import VideoList from '../components/Videolist'

function Channel() {
    // const videos = [11, 52, 3, 24, 50, 60, 77, 88, 100, 100 + 1, 100 + 2, 100 + 3, 100 + 4, 100 + 5 + 1, 100 + 6 + 1];

    const { videos } = useSelector((state) => state.videos)

    return (
        <div className='h-screen w-screen overflow-y-auto px-28'>
            <div className="upper h-3/5 w-full bg-hite flex flex-col gap-y-8 mb-1">
                {/* cover  image */}
                <div className='coverimage w-full h-2/5'>
                    <img className='w-full h-full object-cover rounded-xl' src="https://yt3.googleusercontent.com/HyCEgMohPl_662tAM1JCmaTFIK7NmqEtDAG1kfoOTcDRlopscSz6XNP6AzD-OG7Qv1MFeqGa4Zw=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj" alt="" />
                </div>
                {/* profile info */}
                <div className="profile w-full h-2/5">
                    <div className='h-full flex gap-x-4'>
                        <img className='h-full aspect-square rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgPbd2MBbw3o5_yzYC_pPjoVNKUx7WCrMN3g&s" alt="" />
                        <div>
                            <h2 className='text-4xl font-extrabold' >Channel Name</h2>
                            <p className='text-gray-500'> 1,000,000</p>
                        </div>
                    </div>
                </div>
                {/* navigation */}
                <div className='navigation h-1/5 flex items-end gap-x-8'>
                    <NavLink to={"/featured"} className={({ isActive }) => `${isActive ? "underline underline-offset-8 text-white" : "text-gray-400"} hover:underline-offset-8 hover:underline `}> Home </NavLink>
                    <NavLink to={"/videos"} className={({ isActive }) => `${isActive ? "underline underline-offset-8 text-white" : "text-gray-400"} hover:underline-offset-8 hover:underline `}> Videos </NavLink>
                    <NavLink to={"/playlists"} className={({ isActive }) => ` ${isActive ? "underline underline-offset-8 text-white" : "text-gray-400"} hover:underline-offset-8 hover:underline `}> Playlists </NavLink>
                </div>
            </div>
            {/* dividor */}
            <div className='mt-1 relative -left-28 w-screen h-0.5 bg-gray-500/40'></div>

            {/* videos */}
            <div className='videos w-full py-4'>
                <div className='w-full overflow-y-auto overflow-x-hidden px-2 flex flex-wrap content-start'>

                    {
                        videos && videos.docs.map((video) => <VideoList key={video._id} video={video} isChannel={true} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default Channel