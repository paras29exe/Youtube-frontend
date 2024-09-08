import React from 'react'
import {SideBar, Videos} from './'

function Home() {

    return (
        <>
            <div className='h-full overflow-hidden flex'>
                <SideBar />
                <Videos />
            </div>
        </>
    )
}

export default Home