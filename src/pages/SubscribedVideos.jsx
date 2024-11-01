import React, {  useEffect, } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getSubscribedVideos } from '../store/asyncThunks/subscriptionThunk';
import VideoCard from '../components/VideoCard';
import Skeleton from '../components/Skeleton';

function SubscribedVideos() {
    const dispatch = useDispatch()
    const { subscribedVideos, loading, error } = useSelector((state) => state.subscriptions);

    useEffect(() => {
        const fetchSubscribedVideos = async () => {
            const res = await dispatch(getSubscribedVideos())
            
        }
        fetchSubscribedVideos()
    }, [])

    if (loading) return <Skeleton />;

    if(subscribedVideos && !subscribedVideos.hasPrevPage && subscribedVideos.totalDocs === 0) return <p className='text-3xl w-fit m-auto'>No Subscribed Videos available</p>

    return (
        <div className='w-full overflow-y-auto overflow-x-hidden px-2 flex flex-wrap gap-2 content-start'>
            {
                subscribedVideos?.docs.map((video) => <VideoCard key={video._id} video={video} /> )
            }
        </div >
    )
}

export default SubscribedVideos;