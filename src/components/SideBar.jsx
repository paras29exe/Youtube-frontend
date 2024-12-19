import React, { useContext, useEffect } from 'react'
import { NavBtn } from './'
import { displayContext } from '../context/displayContext'
import { useLocation } from 'react-router-dom';
import { MdHome, MdHistory, MdSubscriptions } from 'react-icons/md'

function SideBar() {
    const { sidebarSize, setSidebarSize } = useContext(displayContext);
    const { pathname } = useLocation()

    useEffect(() => {
        const screenWidth = window.innerWidth;

        if (sidebarSize === "" || sidebarSize === "absolute") {
            screenWidth >= 1150 ? setSidebarSize("large") : screenWidth >= 800 ? setSidebarSize("small") : setSidebarSize("absolute")
        }
    }, [pathname])

    return (
        <div
            id='sidebar'
            className={`max-sm:hidden z-20 pt-5 backdrop-blur-sm transition-all duration-200 ease-in-out h-screen overflow-y-auto px-1.5
                ${!pathname.includes("/videos/play") && "sm:min-w-52 sm:max-w-52 sm:bg-black/70 md2:bg-[rgb(16,16,16)] md2:relative md2:min-w-20 md2:max-w-20 lg2:min-w-52 lg2:max-w-52"}
                
                ${sidebarSize === "large" ? "relative left-0 min-w-52 max-w-52 max-md2:fixed"
                    : sidebarSize === "small" ? "relative left-0 !min-w-20 !max-w-20 max-md2:fixed max-md2:!min-w-52 max-md2:!max-w-52"
                        : sidebarSize === "absolute" ? "fixed -left-64 min-w-52 max-w-52 duration-500 bg-black/70"
                            : sidebarSize === "visible" ? "fixed min-w-52 max-w-52 left-0 duration-500 bg-black/70"
                                : ""}`}
        >
            <NavBtn
                to="/"
                icon={<MdHome className='text-2xl' />}
                name="Home"
                sidebarSize={sidebarSize}
            />
            <NavBtn
                to="/subscriptions"
                icon={<MdSubscriptions className='text-2xl' />}
                name="Subscription"
                sidebarSize={sidebarSize}
            />
            <div className={`my-4 w-full h-0.5 bg-gray-400/50 block md2:hidden lg2:block ${sidebarSize === "small" ? "!hidden max-md2:!block" : ""}`}></div>

            <div className={`select-none flex items-center gap-2 p-3 md2:hidden lg2:flex ${sidebarSize === "small" ? "!hidden max-md2:!flex" : ""}`}>
                <p className='text-2xl'>You</p>
                <svg xmlns="http://www.w3.org/2000/svg" className='bg-transparent' fill='currentColor' height="20" viewBox="0 0 16 16" width="20" focusable="false" aria-hidden="true" ><path d="M4.97 12.65 9.62 8 4.97 3.35l.71-.71L11.03 8l-5.35 5.35-.71-.7z"></path></svg>
            </div>

            <NavBtn
                to="/dashboard"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className=" bg-transparent bi bi-person-check" viewBox="0 0 16 16">
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                        <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                    </svg>
                }
                name="Your Channel"
                sidebarSize={sidebarSize}
            />
            <NavBtn
                to="/current-user/watch-history"
                icon={<MdHistory className='text-2xl' />}
                name="Watch History"
                sidebarSize={sidebarSize}
            />

        </div>
    )
}

export default SideBar