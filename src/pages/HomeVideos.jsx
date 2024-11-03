import React, { useState, useEffect, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideos } from '../store/asyncThunks/videosThunk';
import VideoCard from '../components/VideoCard';
import Skeleton from '../components/Skeleton';
import { displayContext } from '../context/displayContext';

function Videos({ }) {
    // const videos = [11, 52, 3, 24, 50, 60, 77, 88, 100, 100 + 1, 100 + 2, 100 + 3, 100 + 4, 100 + 5 + 1, 100 + 6 + 1];
    const { userData } = useSelector((state) => state.auth)
    const { videos, loading, error } = useSelector((state) => state.videos)

    const dispatch = useDispatch()
    const {prevUserData} = useContext(displayContext)

    useEffect(() => {
        const fetchVideos = async () => {
            await dispatch(getVideos())
        }
        (!videos || prevUserData.current !== userData) && fetchVideos()

        prevUserData.current = userData;

    }, [userData]);

    if (loading) return <Skeleton />;

    if (videos && !videos.hasPrevPage && videos.totalDocs === 0) return <p className='text-3xl w-fit m-auto'>No Videos available</p>

    return (
        <div className='w-full h-max overflow-y-auto px-2 flex flex-wrap content-start'>
            {
                videos?.docs?.map((video) => <VideoCard key={video._id} video={video} />)
            }
        </div >
    )
}

export default Videos;