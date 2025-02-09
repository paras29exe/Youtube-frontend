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
                className={`
                    flex flex-col basis-full h-fit aspect-video box-border p-1.5
                    ${(!channelHome && !channelVideos)
                        ? "sm:basis-1/2 lg2:basis-1/3 3xl:basis-1/4 4xl:basis-1/5"
                        : (channelVideos)
                            ? "md:basis-1/2 lg:basis-1/3 xl:basis-1/4 3xl:basis-1/5 "
                            : "sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 3xl:basis-1/6"
                    }
                    ${fourVideosInRow && !channelHome && !channelVideos ? "2xl:basis-1/4" : null}`}

                onClick={(e) => {
                    e.stopPropagation()
                    const videoId = video?._id
                    navigate(`/videos/play?v_id=${videoId}`);
                }}
            >
                <div className="relative -z-10 aspect-video w-full">
                    <img
                        className="object-cover aspect-video w-full rounded-lg"
                        // src={`https://picsum.photos/id/${video}/1000/600`}
                        src={video?.thumbnail}
                        alt="Video thumbnail"
                    />
                    <div className="absolute select-none bottom-1 right-3 bg-black/70 px-1.5 py-0.5 font-semibold text-xs rounded-sm tracking-widest">
                        {video?.duration || "10:10"}
                    </div>
                </div>
                <div className='py-3 flex gap-x-4 p-1.5'>
                    {
                        !channelHome && !channelVideos && <div className='overflow-hidden cursor-pointer'>
                            <img
                                data-channel-id={video?.ownerId}
                                className='w-12 aspect-square rounded-full object-cover'
                                // src={`https://picsum.photos/id/${video}/1000/600`}
                                src={video?.ownerAvatar}
                                alt="Channel Avatar"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    navigate(`/channel/${"@" + video?.ownerUsername}`)
                                }}
                            />

                        </div>
                    }

                    <div className='text-left w-full'>
                        <h2
                            className="line-clamp-2 text-base font-semibold max-sm:text-[12px]  mb-1"
                        > {String(video?.title).trim()}
                        </h2>
                        {
                            !channelHome && !channelVideos &&
                            <p
                                data-channel-id={video?.ownerId}
                                className="text-xs text-gray-400 w-fit cursor-pointer -mb-1 hover:text-white"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    navigate(`/channel/${"@" + video?.ownerUsername}`)
                                }}
                            >
                                {video?.ownerChannelName || "Channel Name"}
                            </p>
                        }
                        <p>
                            <span className="text-xs text-gray-400">{formatViews(video?.views)} views</span>
                            <span className='text-xs text-gray-400'> • </span>
                            <span className="text-xs text-gray-400">{timeAgo(video?.createdAt)}</span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoCard