import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { playVideo } from '../store/ayncThunks/videosThunk';
import VideoDescriptionBox from './DescriptionBox';
import ActionButtons from './ActionButtons';

const VideoPlayerPage = () => {
    const [searchParams] = useSearchParams();
    const v_id = searchParams.get('v_id');
    const { singleVideo, loading, error } = useSelector((state) => state.videos)

    const currentVideo = singleVideo?.videoDetails
    const subscribdByViewer = currentVideo?.channelDetails.subscribdByViewer
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (v_id) {
            const getVideo = async () => {
                await dispatch(playVideo(v_id))
            }
            getVideo()
        }
    }, [v_id])

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

    if (loading) return <div>Hello</div>

    if (singleVideo?.videoDetails) return (

        <div className="flex flex-col md2:flex-row w-11/12 py-12 m-auto min-h-screen">

            {/* Main Video Section */}
            <div className="flex-1 p-3 md2:w-3/5 flex flex-col gap-y-5">
                <div className="bg-black w-full aspect-video">
                    <ReactPlayer
                        url={currentVideo.videoFile}
                        width="100%"
                        height="100%"
                        controls
                        autoPlay
                    // playing

                    />
                </div>
                <p className="text-2xl font-bold -my-2.5 line-clamp-3">{currentVideo.title}</p>

                {/* action buttons */}
                <ActionButtons currentVideo={currentVideo} />

                {/* description box */}
                <VideoDescriptionBox currentVideo={currentVideo} />

                <div className="mt-6">
                    <h2 className="text-xl font-bold">Comments</h2>
                    <div className="mt-4">
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 rounded-full bg-gray-400"></div>
                            <div>
                                <p className="font-bold">User Name</p>
                                <p className="text-gray-700">This is a comment on the video.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Videos Sidebar */}
            <div className="md2:w-2/5 w-full p-4 ">
                <h2 className="text-xl font-bold mb-4">Related Videos</h2>

                <div className="space-y-4">
                    {singleVideo.randomVideos.map((video) => (
                        <div
                            key={video._id}
                            data-video-id={video._id}
                            className="flex gap-x-2 w-full"
                            onClick={(e) => {
                                e.stopPropagation()
                                navigate("/videos/play/?v_id=" + video._id)
                            }}
                        >
                            <div className="w-2/5 aspect-video bg-gray-300 rounded-lg relative">
                                <img className='w-full h-full object-cover rounded-lg' src={video.thumbnail} alt="Thumbnail" />
                                <div className="absolute bottom-1 right-1 bg-black/70 px-1.5 py-0.5 font-semibold text-xs rounded-sm tracking-wider">
                                    {video.duration}
                                </div>
                            </div>
                            <div className='w-3/5 flex flex-col gap-y-1.5'>
                                <h3 className="text-md font-bold line-clamp-2">{video.title} </h3>
                                <p className="text-gray-400 font-semibold text-xs">{video.channelName}</p>
                                <div className='flex gap-x-2 text-xs'>
                                    <p className="text-gray-400"> {video.views} views </p>
                                    <span className='text-gray-400'> • </span>
                                    <p className="text-gray-400"> {timeAgo(video.createdAt)} </p>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default VideoPlayerPage;