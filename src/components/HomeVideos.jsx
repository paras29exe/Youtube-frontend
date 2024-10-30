import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideos } from '../store/ayncThunks/videosThunk';
import VideoList from './Videolist';


function Videos({}) {
    // const videos = [11, 52, 3, 24, 50, 60, 77, 88, 100, 100 + 1, 100 + 2, 100 + 3, 100 + 4, 100 + 5 + 1, 100 + 6 + 1];
    const { userData } = useSelector((state) => state.auth)
    const { videos, loading, error } = useSelector((state) => state.videos)

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchVideos = async () => {
            await dispatch(getVideos())
            // if (res.type.includes("rejected")) throw res.error;
        }
        fetchVideos()
    }, [userData])

    if(videos && videos.length === 0) return <p className='text-3xl w-fit m-auto'>No Videos available</p>

    return (
        <div className='w-full overflow-y-auto overflow-x-hidden px-2 flex flex-wrap content-start'>
            {
                videos.map((video) => <VideoList video={video} loading={loading} /> )
            }
        </div >
    )
}

export default Videos;