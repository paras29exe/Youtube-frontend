import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import VideoCard from '../VideoCard'
import { getChannelVideos } from '../../store/asyncThunks/channelThunk'
import { useLocation } from 'react-router-dom'
import Skeleton from '../Skeleton'


function ChannelVideos() {
    const dispatch = useDispatch()
    const path = window.location.pathname; 
    const match = path.match(/\/channel\/@([^/]+)/);

    const username = match ? match[1] : null

    const { channelVideos, videosLoading } = useSelector(state =>  state.channel)

    useEffect(() => {
      async function loadChannelVideos() {
        const res = await dispatch(getChannelVideos(username))
      }
      loadChannelVideos()
    }, [])
    
    if(videosLoading) return <div className='text-2xl'>Loading.........</div>

    if(channelVideos) return (
        <div className='w-full h-max overflow-y-auto overflow-x-hidden flex flex-wrap content-start '>
            {
                channelVideos?.map((video) => <VideoCard key={video._id} video={video} channelVideos padding={1} />)
            }
        </div>
    )
}

export default ChannelVideos