import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { playVideo } from '../../store/ayncThunks/videosThunk';
import timeAgo from '../../utils/timeAgo';
import VideoDescriptionBox from './DescriptionBox';
import ActionButtons from './ActionButtons';
import Comments from './Comments';
import Navbar from '../Navbar';
import formatViews from '../../utils/formatViews';
import VideoSkeleton from '../VideoSkeleton';
import { getComments } from '../../store/ayncThunks/commentThunk';

const VideoPlayerPage = () => {
    const [searchParams] = useSearchParams();
    const v_id = searchParams.get('v_id');

    const { singleVideo, loading, error } = useSelector((state) => state.videos)
    const currentVideo = singleVideo?.videoDetails

    const dispatch = useDispatch()
    const navigate = useNavigate()

     useEffect(() => {
        if (v_id) {
            const getVideo = async () => {
                 dispatch(playVideo(v_id))
                 dispatch(getComments())
            }
            getVideo()
        }
    }, [v_id])



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
                            className="outline-none"
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

                    {/* comments */}
                    <Comments currentVideo={currentVideo} />

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
                                    navigate("/videos/play/?v_id=" + video._id)
                                    e.stopPropagation()
                                    console.log("hello world!")
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