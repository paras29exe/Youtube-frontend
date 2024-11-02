import React, { useContext } from 'react'
import timeAgo from '../utils/timeAgo';
import { displayContext } from "../context/displayContext"
import { useNavigate } from 'react-router-dom';
import formatViews from '../utils/formatViews';

function VideoCard({ video, channelHome = false, channelVideos = false }) {
    const { fourVideosInRow } = useContext(displayContext); // Add state for 4 videos in a row
    const navigate = useNavigate()
    // Conditional rendering for loading and error

    return (
        <>
            <div
                data-video-id={video._id}
                className={`
                    flex flex-col w-full aspect-video box-border
                    ${(!channelHome && !channelVideos) ? "sm:w-1/2 lg2:w-1/3 3xl:w-1/4 4xl:w-1/5 p-1.5"
                        : channelVideos ? "md:w-1/2 lg:w-1/3 xl:w-1/4 3xl:w-1/5 p-1"
                            : "sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 3xl:w-1/6 p-0.5"}
                    ${fourVideosInRow && !channelHome && !channelVideos ? "2xl:min-w-1/4 2xl:max-w-1/4" : null}
                    `}

                onClick={(e) => {
                    console.log("Clicked")
                    const videoId = e.currentTarget.dataset.videoId
                    // console.log(e.currentTarget.dataset.videoId)
                    navigate(`/videos/play?v_id=${videoId}`);
                }}
            >
                <div className="relative mb-2 -z-10 aspect-video w-full">
                    <img
                        className="object-cover aspect-video w-full rounded-lg"
                        // src={`https://picsum.photos/id/${video}/1000/600`}
                        src={video.thumbnail}
                        alt="Video thumbnail"
                    />
                    <div className="absolute bottom-1 right-3 bg-black/70 px-1.5 py-0.5 font-semibold text-xs rounded-sm tracking-widest">
                        {video.duration || "10:10"}
                    </div>
                </div>
                <div className='py-3 flex gap-x-4'>
                    {
                        !channelHome && !channelVideos && <div className='overflow-hidden cursor-pointer'>
                            <img
                                data-channel-id={video.ownerId}
                                className='w-12 aspect-square rounded-full object-cover'
                                // src={`https://picsum.photos/id/${video}/1000/600`}
                                src={video.ownerAvatar}
                                alt="Channel Avatar"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    navigate(`/channel/${"@" + video.ownerUsername}`)
                                }}
                            />

                        </div>
                    }

                    <div className='text-left w-full'>
                        <h3
                            className="inline-block text-xl md2:text-lg font-semibold line-clamp-2"
                        > {String(video.title).trim()}
                        </h3>
                        {
                            !channelHome && !channelVideos && <p
                                data-channel-id={video.ownerId}
                                className="text-xs text-gray-400 w-fit cursor-pointer -mb-1"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    navigate(`/channel/${"@" + video.ownerUsername}`)
                                }}
                            >
                                {video.ownerChannelName || "Channel Name" }
                            </p>
                        }
                        <p>
                            <span className="text-xs text-gray-400">{formatViews(video.views)} views</span>
                            <span className='text-xs text-gray-400'> • </span>
                            <span className="text-xs text-gray-400">{timeAgo(video.createdAt)}</span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoCard