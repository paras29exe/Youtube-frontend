import React from 'react'
import { useSelector } from 'react-redux'
import VideoCard from '../VideoCard'


function ChannelVideos() {
    const videos = [11, 52, 3, 24, 50, 60, 77, 88, 100, 100 + 1, 100 + 2, 100 + 3, 100 + 4, 100 + 5 + 1, 100 + 6 + 1];

    // const { videos } = useSelector((state) => state.videos)

    return (
        <div className='w-full h-max overflow-y-auto overflow-x-hidden flex flex-wrap content-start '>
            {
                videos?.map((video) => <VideoCard key={video._id} video={video} channelVideos padding={1} />)
            }
        </div>
    )
}

export default ChannelVideos