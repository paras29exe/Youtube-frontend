import React, { useState, useEffect, useContext } from 'react';
import { displayContext } from "../context/displayContext"
import { useDispatch, useSelector } from 'react-redux';
import { getVideos } from '../store/ayncThunks/videosThunk';
import Skeleton from './Skeleton';
import { useNavigate } from 'react-router-dom';

function Videos() {
    // const videos = [11, 52, 3, 24, 50, 60, 77, 88, 100, 100 + 1, 100 + 2, 100 + 3, 100 + 4, 100 + 5 + 1, 100 + 6 + 1];
    const { sidebarSize } = useContext(displayContext)
    const [fourVideosInRow, setFourVideosInRow] = useState(false); // Add state for 4 videos in a row
    const { userData } = useSelector((state) => state.auth)
    const { videos, loading, error } = useSelector((state) => state.videos)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchVideos = async () => {
            await dispatch(getVideos())
            // if (res.type.includes("rejected")) throw res.error;
        }
        fetchVideos()
    }, [userData])

    useEffect(() => {

        const handleResize = () => {
            const screenWidth = window.innerWidth;

            // Check if showSidebar is false and screen width is between 1100px and 1600px
            if (sidebarSize === "small" && screenWidth >= 1300 && screenWidth <= 1600) {
                setFourVideosInRow(true);
            } else {
                setFourVideosInRow(false);
            }
        };

        // Initial check on component mount
        handleResize();

        // Listen for window resize events
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [sidebarSize]);

    const timeAgo = (timestamp) => {
        const now = new Date();
        const uploadDate = new Date(timestamp);
        const seconds = Math.floor((now - uploadDate) / 1000);
        
        let interval = Math.floor(seconds / 31536000); // 1 year = 31536000 seconds
        if (interval == 1) return `${interval} year ago`;
        if (interval > 1) return `${interval} years ago`;
      
        interval = Math.floor(seconds / 2592000); // 1 month = 2592000 seconds
        if (interval == 1) return `${interval} month ago`;
        if (interval > 1) return `${interval} months ago`;
      
        interval = Math.floor(seconds / 86400); // 1 day = 86400 seconds
        if (interval == 1) return `${interval} day ago`;
        if (interval > 1) return `${interval} days ago`;
      
        interval = Math.floor(seconds / 3600); // 1 hour = 3600 seconds
        if (interval == 1) return `${interval} hour ago`;
        if (interval > 1) return `${interval} hours ago`;
      
        interval = Math.floor(seconds / 60); // 1 minute = 60 seconds
        if (interval == 1) return `${interval} minute ago`;
        if (interval > 1) return `${interval} minutes ago`;
      
        return `${seconds} seconds ago`;
      };
      

    // Conditional rendering for loading and error
    if (loading) return <Skeleton />;
    if (error) return <div className='text-center text-3xl w-fit m-auto'>{error.message === "Cannot read properties of undefined (reading 'data')" ? "Server Error ! Can't connect to server." : error.message}</div>;

    return (
        <div className='w-full overflow-y-auto overflow-x-hidden px-2 flex flex-wrap content-start pb-20'>
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
                            <div className="relative overflow-hidden rounded-lg mb-2 flex-grow min-w-full max-w-full h-full object-cover">
                                <img
                                    className="object-cover w-full h-full"
                                    // src={`https://picsum.potos/id/${video}/1000/600`}
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
                                        // src={`https://picsum.potos/id/${video}/1000/600`}
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
                                        className="inline-block text-xl font-semibold mb-1"
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
                                        <span className="text-xs text-gray-400">{video.views} views</span>
                                        <span className='text-gray-400'> • </span>
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

export default Videos;