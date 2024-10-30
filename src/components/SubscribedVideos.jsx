import React, {  useEffect, } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getSubscribedVideos } from '../store/ayncThunks/videosThunk';
import VideoList from './Videolist';

function SubscribedVideos() {
    const dispatch = useDispatch()
    const { videos, loading, error } = useSelector((state) => state.videos);

    useEffect(() => {
        const fetchSubscribedVideos = async () => {
            await dispatch(getSubscribedVideos())
            // if (res.type.includes("rejected")) throw res.error;
        }
        fetchSubscribedVideos()
    }, [])

    if(videos && videos.length === 0) return <p className='text-3xl w-fit m-auto'>No Subscribed Videos available</p>

    return (
        <div className='w-full overflow-y-auto overflow-x-hidden px-2 flex flex-wrap content-start'>
            {
                videos.map((video) => <VideoList video={video} /> )
            }
        </div >
    )
}

export default SubscribedVideos;