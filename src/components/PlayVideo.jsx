import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { playVideo } from '../store/ayncThunks/videosThunk';

const VideoPlayerPage = () => {
    const [searchParams] = useSearchParams();
    const v_id = searchParams.get('v_id');
    const { singleVideo, loading, error } = useSelector((state) => state.videos)
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        if(v_id) {
            const getVideo = async () => {
                await dispatch(playVideo(v_id))
            }
            getVideo()
        }
    },[v_id])


    if (loading) return ""

    console.log(singleVideo.videoDetails.videoFile);
    

    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-100">
            {/* Main Video Section */}
            <div className="flex-1 p-4">
                <div className="bg-black w-full aspect-w-16 aspect-h-9">
                    <ReactPlayer
                        url={singleVideo.videoDetails.videoFile}
                        width="100%"
                        height="100%"
                        controls
                    />
                </div>
                <div className="mt-4">
                    <h1 className="text-2xl font-bold">Video Title</h1>
                    <p className="text-gray-600">Published on: Date</p>
                    <p className="mt-2">Video description goes here. This can be a longer text providing details about the video content.</p>
                </div>
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
            <div className="w-full lg:w-1/3 p-4 bg-white">
                <h2 className="text-xl font-bold mb-4">Related Videos</h2>
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-32 h-20 bg-gray-300"></div>
                        <div>
                            <h3 className="text-lg font-bold">Related Video Title</h3>
                            <p className="text-gray-600">Channel Name</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="w-32 h-20 bg-gray-300"></div>
                        <div>
                            <h3 className="text-lg font-bold">Related Video Title</h3>
                            <p className="text-gray-600">Channel Name</p>
                        </div>
                    </div>
                    {/* Add more related videos as needed */}
                </div>
            </div>
        </div>
    );
};

export default VideoPlayerPage;