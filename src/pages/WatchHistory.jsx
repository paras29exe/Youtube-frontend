import React from 'react'
import VideoCard from '../components/VideoCard'

function WatchHistory() {
    return (
        <div className='w-full'>
            <div>
                <h2 className='text-center '>Your Activity</h2>

                <div>
                    <div className='flex flex-col gap-y-2 w-1/5'>
                        <div className='w-full aspect-video rounded-md'>
                            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/bb/a3/97/predator-ride-in-the.jpg?w=900&h=500&s=1" alt="" className='w-full object-cover aspect-video rounded-md'/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default WatchHistory