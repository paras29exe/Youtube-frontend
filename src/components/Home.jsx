import React from 'react'
import Videos from './Videos'
import SideBar from './SideBar'
import Navbar from './Navbar'

function Home() {

    return (
        <>
            <div className='h-screen overflow-hidden'>
                <Navbar />
                <main className='flex gap-4'>
                    <SideBar />
                    <Videos />
                </main>
            </div>
        </>
    )
}

export default Home