import React, { useContext, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { playVideo } from '../store/asyncThunks/videosThunk';
import timeAgo from '../utils/timeAgo';
import VideoDescriptionBox from '../components/playVideoPAge/DescriptionBox';
import ActionButtons from '../components/playVideoPAge/ActionButtons';
import Comments from '../components/playVideoPAge/Comments';
import formatViews from '../utils/formatViews';
import PlayVideoSkeleton from '../components/PlayVideoSkeleton';
import { getComments } from '../store/asyncThunks/commentThunk';
import { displayContext } from '../context/displayContext';

const VideoPlayerPage = () => {
    const [searchParams] = useSearchParams();
    const v_id = searchParams.get('v_id');

    const { singleVideo, loading, error } = useSelector((state) => state.videos)
    const { userData } = useSelector((state) => state.auth)
    const { setSidebarSize } = useContext(displayContext)
    const { showPopup } = useContext(displayContext)
    const video = singleVideo?.videoDetails

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        setSidebarSize("absolute")

        const getVideo = async () => {
            const res = await dispatch(playVideo(v_id))

            await dispatch(getComments(v_id))
        }
        v_id && getVideo()

    }, [v_id])

    if (loading) return <PlayVideoSkeleton />

    if (error?.message.toLowerCase().includes("this video is private or cannot be played")) {
        navigate(-1)
    }

    if (video) return (
        <div className='w-full overflow-y-auto overflow-x-hidden'>
            <div className='pb-20 flex max-lg:flex-col'>
                {/* Main Video Section */}
                <div className=" w-full lg:px-2 h-full lg:w-3/5 flex flex-col gap-y-4 xl:pl-20">
                    <div className="bg-black w-full aspect-video">
                        <ReactPlayer
                            className="outline-none aspect-video"
                            url={video.videoFile || ""}
                            width="100%"
                            height="100%"
                            controls
                            autoPlay
                            playing={!showPopup}
                        />
                    </div>
                    <div className='flex flex-col gap-y-4 px-3'>
                        <div>
                            <p className="text-2xl max-md:text-xl max-sm:text-lg font-bold line-clamp-3">{video.title}</p>
                        </div>

                        {/* action buttons */}
                        {video.ownerId != userData?.user?._id ? <ActionButtons currentVideo={video} /> : null}

                        {/* description box */}
                        <VideoDescriptionBox currentVideo={video} />

                        {/* comments */}
                        {video.ownerId != userData?.user?._id ? <Comments currentVideo={video} videoId={video._id} /> : null}
                    </div>
                </div>

                {/* Related Videos Sidebar */}
                <div className="lg:w-2/5 w-full lg:p-2">
                    <h1 className='text-2xl max-lg:hidden mb-4 font-bold'>Related Videos</h1>
                    <div className="space-y-4">
                        {singleVideo?.randomVideos?.map((video) => (
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
                                <div className="w-2/5 relative -z-10">
                                    <img className='aspect-video object-cover rounded-lg' src={video.thumbnail} alt="Thumbnail" />
                                    <div className="absolute bottom-1 right-1 bg-black/70 px-1.5 py-0.5 font-semibold text-xs rounded-sm tracking-wider">
                                        {video.duration}
                                    </div>
                                </div>
                                <div className='w-3/5 flex flex-col gap-y-1.5'>
                                    <h3 className="text-base max-lg:text-xl font-bold line-clamp-2">{video.title} </h3>
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

        </div>
    );
};

export default VideoPlayerPage;