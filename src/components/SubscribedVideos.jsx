import React, {  useEffect, useContext } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getSubscribedVideos } from '../store/ayncThunks/videosThunk';
import timeAgo from '../utils/timeAgo';
import Skeleton from './Skeleton';
import { useNavigate } from 'react-router-dom';
import formatViews from '../utils/formatViews';
import { displayContext } from '../context/displayContext';

function SubscribedVideos() {
    const {fourVideosInRow} = useContext(displayContext)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { videos, loading, error } = useSelector((state) => state.videos);

    useEffect(() => {
        const fetchSubscribedVideos = async () => {
            await dispatch(getSubscribedVideos())
            // if (res.type.includes("rejected")) throw res.error;
        }
        fetchSubscribedVideos()
    }, [])

    // Conditional rendering for loading and error
    if (loading) return <Skeleton />;

    if(videos && videos.length === 0) return <p className='text-3xl w-fit m-auto'>No Subscribed Videos available</p>

    return (
        <div className='w-full overflow-y-auto overflow-x-hidden px-2 flex flex-wrap content-start'>
            {
                videos.map((video) => {
                    return (
                        <div
                            data-video-id={video._id}
                            key={video._id}
                            className={`flex flex-col w-full aspect-video sm:w-1/2 lg2:w-1/3 3xl:w-1/4 4xl:w-1/5 p-2 max-lg2:px-4 box-border ${fourVideosInRow ? "min-w-1/4 max-w-1/4" : null}`}
                            onClick={(e) => {
                                console.log("Clicked")
                                const videoId = e.currentTarget.dataset.videoId
                                // console.log(e.currentTarget.dataset.videoId)
                                navigate(`/videos/play?v_id=${videoId}`);
                            }}
                        >
                            <div className="relative overflow-hidden rounded-lg mb-2 flex-grow w-full aspect-video ">
                                <img
                                    className="object-cover w-full h-full"
                                    // src={`https://picsum.photos/id/${video}/1000/600`}
                                    src={video.thumbnail}
                                    alt="Video thumbnail"
                                />
                                <div className="absolute bottom-1 right-3 bg-black/70 px-1.5 py-0.5 font-semibold text-xs rounded-sm tracking-widest">
                                    {video.duration}
                                </div>
                            </div>
                            <div className='py-3 flex gap-x-4'>
                                <div className='overflow-hidden cursor-pointer'>
                                    <img
                                        data-channel-id={video.ownerId}
                                        className='w-12 h-11 rounded-full object-cover'
                                        // src={`https://picsum.photos/id/${video}/1000/600`}
                                        src={video.ownerAvatar}
                                        alt="Channel Avatar"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            console.log("image clicked")
                                            console.log(e.target.dataset.channelId)
                                        }}
                                    />

                                </div>
                                <div className='text-left w-full'>
                                    <h3
                                        className="inline-block text-xl md2:text-lg font-semibold line-clamp-2"
                                    > {String(video.title).trim()}
                                    </h3>
                                    <p
                                        data-channel-id={video.ownerId}
                                        className="text-xs text-gray-400 w-fit cursor-pointer -mb-1"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            console.log("Channel clicked")
                                            console.log(e.target.dataset.channelId)
                                        }}
                                    >
                                        {video.ownerChannelName}
                                    </p>
                                    <p>
                                        <span className="text-xs text-gray-400">{formatViews(video.views)} views</span>
                                        <span className='text-xs text-gray-400'> • </span>
                                        <span className="text-xs text-gray-400">{timeAgo(video.createdAt)}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </div >
    )
}

export default SubscribedVideos;