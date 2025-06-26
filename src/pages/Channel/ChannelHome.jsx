import React from 'react'
import { useSelector } from 'react-redux'
import VideoCard from '../../components/cards/VideoCard'


function ChannelHome() {
    // const videos = [11, 52, 3, 24, 50,];

    const { channel } = useSelector((state) => state.channel)

    return (
        <div className='flex flex-col space-y-6'>
            <div>
                <p className='text-2xl md:text-3xl font-bold mb-4'>Popular Videos</p>
                <div className='w-full overflow-x-auto flex flex-wrap '>
                    {
                        channel?.popularVideos?.map((video) => <VideoCard key={video._id} video={video} channelHome padding={0.5} />)
                    }
                </div>
            </div>
            <div className=' w-screen h-0.5 bg-gray-500/40'></div>
            <div>
                <p className='text-3xl font-bold mb-4'>Recent Videos</p>
                <div className='w-full overflow-x-auto flex flex-wrap '>
                    {
                        channel?.recentVideos?.map((video) => <VideoCard key={video._id} video={video} channelHome padding={0.5}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default ChannelHome