import React from 'react'
import NavBtn from "./NavBtn"

function SideBar() {
    return (
        <div className="bg-black min-w-64 h-screen overflow-y-auto pl-3"> 
            <NavBtn
            to="/"
                icon={
                    <svg className='bg-transparent' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" fill="currentColor"><g><path d="M4 21V10.08l8-6.96 8 6.96V21h-6v-6h-4v6H4z"></path></g></svg>
                }
                name="Home"
            />
            <NavBtn
            to="/subscriptions"
                icon={
                    <svg className='bg-transparent' xmlns="http://www.w3.org/2000/svg" fill='currentColor' height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true"><path d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z"></path></svg>
                }
                name="Subscription"
            />

            <div className='my-4 w-full h-0.5 bg-gray-400'></div>

            <NavBtn
            to="/dashboard"
                icon="You"
                name={<svg xmlns="http://www.w3.org/2000/svg" className='bg-transparent' fill='currentColor' height="20" viewBox="0 0 16 16" width="20" focusable="false" aria-hidden="true" ><path d="M4.97 12.65 9.62 8 4.97 3.35l.71-.71L11.03 8l-5.35 5.35-.71-.7z"></path></svg>}
                className="text-xl items-end gap-1"
            />
            <NavBtn
                to="/channel/user"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className=" bg-transparent bi bi-person-check" viewBox="0 0 16 16">
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                        <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                    </svg>
                }
                name="Your Channel"
            />
            
        </div>
    )
}

export default SideBar