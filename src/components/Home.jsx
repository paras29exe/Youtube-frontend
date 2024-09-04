import React from 'react'
import Videos from './Videos'
import SideBar from './SideBar'
import Navbar from './Navbar'

function Home() {

    return (
        <>
            <div className='h-full overflow-hidden flex gap-4'>
                <SideBar />
                <Videos />
            </div>
        </>
    )
}

export default Home