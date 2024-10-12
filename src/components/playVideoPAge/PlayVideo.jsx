import React, { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { redirect, useNavigate, useSearchParams } from 'react-router-dom';
import { playVideo } from '../../store/ayncThunks/videosThunk';
import timeAgo from '../../utils/timeAgo';
import VideoDescriptionBox from './DescriptionBox';
import ActionButtons from './ActionButtons';
import Comments from './Comments';
import Navbar from '../Navbar';
import formatViews from '../../utils/formatViews';
import { current } from '@reduxjs/toolkit';
import VideoSkeleton from '../VideoSkeleton';

const VideoPlayerPage = () => {
    const [searchParams] = useSearchParams();
    const v_id = searchParams.get('v_id');
    const { register, handleSubmit, formState: { errors } } = useForm()

    const { singleVideo, loading, error } = useSelector((state) => state.videos)
    const { userdata } = useSelector((state) => state.auth)
    const currentVideo = singleVideo?.videoDetails

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (v_id) {
            const getVideo = async () => {
                const res = await dispatch(playVideo(v_id))
            }
            getVideo()
        }
    }, [])

    const addComment = async (data) => {

    }

    if (loading) return (
        <>
            <Navbar />
            <VideoSkeleton />
        </>
    )

    if (error?.message.toLowerCase().includes("this video is private or cannot be played")) {
        navigate("/")
    }

    if (singleVideo?.videoDetails) return (
        <>
            <Navbar />
            <div className="flex flex-col md2:flex-row w-11/12 m-auto min-h-screen">
                {/* Main Video Section */}
                <div className="flex-1 p-3 md2:w-3/5 flex flex-col gap-y-5">
                    <div className="bg-black w-full aspect-video">
                        <ReactPlayer
                            url={currentVideo.videoFile || ""}
                            width="100%"
                            height="100%"
                            controls
                            autoPlay
                            playing
                        />

                    </div>
                    <p className="text-2xl font-bold -my-2.5 line-clamp-3">{currentVideo.title}</p>

                    {/* action buttons */}
                    <ActionButtons currentVideo={currentVideo} />

                    {/* description box */}
                    <VideoDescriptionBox currentVideo={currentVideo} />

                    <div className="mt-6">
                        <h2 className="text-xl font-bold">Comments</h2>
                        <form onSubmit={handleSubmit(addComment)} className="flex items-start mt-4 space-x-4">

                            <div className="w-12 h-11 rounded-full bg-gray-400">
                                <img className="w-full h-full rounded-full object-cover" src={userdata?.avatar || "https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1"} alt="Channel Thumbnail" />
                            </div>
                            <div className='flex w-full'>
                                <input
                                    placeholder="Add a comment..."
                                    className={`form-input w-full h-12 bg-transparent border border-gray-500 border-r-0 px-4 rounded-l-lg ${errors.comment && 'border-red-500'}`}
                                    {...register('comment', { required: true })}
                                    autoComplete='off'
                                />
                                <button type='submit' className='h-12 text-center w-2/12 text-xl border border-gray-500 border-l-0 bg-gray-500/40 rounded-r-lg'>Add</button>
                            </div>

                        </form>
                        {/* comments */}
                        <Comments currentVideo={currentVideo} />
                    </div>
                </div>

                {/* Related Videos Sidebar */}
                <div className="md2:w-2/5 w-full p-4 ">

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
                                        <p className="text-gray-400"> {formatViews(video.views)} views </p>
                                        <span className='text-gray-400'> • </span>
                                        <p className="text-gray-400"> {timeAgo(video.createdAt)} </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </>
    );
};

export default VideoPlayerPage;