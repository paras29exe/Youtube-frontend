import React from 'react'
import formatViews from '../utils/formatViews'
import timeAgo from '../utils/timeAgo'
import { useNavigate } from 'react-router-dom'

function SearchedVideoCard({ video }) {
    const navigate = useNavigate()

    return (
        <div className="w-full flex flex-col md2:flex-row gap-y-4 md2:gap-y-0 gap-x-4 p-3">
            {/* Video Thumbnail */}
            <div
                onClick={() => {
                    navigate(`/videos/play/?v_id=${video._id}`);
                }}
                className="relative w-full md2:w-2/5 h-auto rounded-xl select-none"
            >
                <img
                    src={video.thumbnail}
                    alt="Video Thumbnail"
                    className="w-full aspect-video rounded-xl object-cover"
                />
                <div className="absolute right-2 bottom-2 bg-black/70 px-1.5 rounded-sm text-white text-xs md2:text-sm">
                    {video.duration}
                </div>
            </div>

            {/* Video Details */}
            <div className="flex flex-col w-full md2:w-3/5 gap-y-4">
                <div>
                    <h2 className="text-lg md2:text-2xl font-semibold">{video.title}</h2>
                    <div className="flex gap-x-1 items-center">
                        <p className="text-gray-400 text-xs md2:text-sm">{formatViews(video.views)} views</p>
                        <p className="text-gray-400 text-xs md2:text-sm"> • </p>
                        <p className="text-gray-400 text-xs md2:text-sm">{timeAgo(video.createdAt)}</p>
                    </div>
                </div>

                {/* Channel Info */}
                <div className="flex items-center gap-x-2">
                    <img
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/channel/@${video.ownerUsername}`);
                        }}
                        src={video.ownerAvatar}
                        alt="Channel Avatar"
                        className="w-7 md2:w-10 aspect-square rounded-full cursor-pointer"
                    />
                    <p
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/channel/@${video.ownerUsername}`);
                        }}
                        className="text-gray-400 text-sm md2:text-base hover:text-white cursor-pointer"
                    >
                        {video.ownerChannelName}
                    </p>
                </div>

                {/* Description */}
                <div>
                    <p className="text-gray-400 text-sm md2:text-base line-clamp-2">{video.description}</p>
                </div>
            </div>
        </div>

    )
}

export default SearchedVideoCard