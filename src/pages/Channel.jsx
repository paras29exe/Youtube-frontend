import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function Channel() {
    

    return (
        <div className='h-screen w-screen overflow-y-auto box-border 2xl:px-28 xl:px-16 lg:px-5'>
            <div className="upper h-3/5 w-full bg-hite flex inset-0 flex-col gap-y-8 mb-1">
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
                    <NavLink to={""} end className={({ isActive }) => `${isActive ? "underline underline-offset-8 text-white" : "text-gray-400"} hover:underline-offset-8 hover:underline `}> Home </NavLink>
                    <NavLink to={"videos"} className={({ isActive }) => `${isActive ? "underline underline-offset-8 text-white" : "text-gray-400"} hover:underline-offset-8 hover:underline `}> Videos </NavLink>
                    <NavLink to={"playlists"} className={({ isActive }) => ` ${isActive ? "underline underline-offset-8 text-white" : "text-gray-400"} hover:underline-offset-8 hover:underline `}> Playlists </NavLink>
                </div>
                {/* dividor */}
                <div className='-mt-7 relative -left-28 w-screen h-0.5 border border-gray-500/40'></div>
            </div>
            {/* videos */}

            <div className='videos w-full pt-8 pb-16'>
                <Outlet />
            </div>
        </div>
    )
}

export default Channel