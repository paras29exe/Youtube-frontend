import React from 'react'
import { useSelector } from 'react-redux'
import VideoCard from '../VideoCard'


function ChannelHome({ popularVideos, recentVideos }) {
    const videos = [11, 52, 3, 24, 50,];

    // const { videos } = useSelector((state) => state.videos)

    return (
        <div className='flex flex-col space-y-6'>
            <div>
                <p className='text-3xl font-bold mb-4'>Popular Videos</p>
                <div className='w-full overflow-x-auto flex flex-wrap '>
                    {
                        videos?.map((video) => <VideoCard key={video._id} video={video} channelHome padding={0.5} />)
                    }
                </div>
            </div>
            <div>
                <p className='text-3xl font-bold mb-4'>Recent Videos</p>
                <div className='w-full overflow-x-auto flex flex-wrap '>
                    {
                        videos?.map((video) => <VideoCard key={video._id} video={video} channelHome padding={0.5}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default ChannelHome