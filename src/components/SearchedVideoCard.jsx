import React from 'react'
import formatViews from '../utils/formatViews'
import timeAgo from '../utils/timeAgo'
import { useNavigate } from 'react-router-dom'

function SearchedVideoCard({ video }) {
    const navigate = useNavigate()

    return (
        <div className="w-full flex flex-col md:flex-row gap-y-2 md:gap-y-0">
            {/* Video Thumbnail */}
            <div
                onClick={() => {
                    navigate(`/videos/play/?v_id=${video._id}`);
                }}
                className="relative w-full md:w-1/2 aspect-video rounded-lg select-none"
            >
                <img
                    src={video.thumbnail}
                    alt="Video Thumbnail"
                    className="w-full aspect-video rounded-lg object-cover"
                />
                <div className="absolute right-2 bottom-2 bg-black/70 px-2 py-0.5 rounded text-white text-xs sm:text-sm">
                    {video.duration}
                </div>
            </div>

            {/* Video Details */}
            <div className="flex flex-col w-full md:w-3/5 gap-y-3 px-3">
                <div>
                    <h2 className="max-md:text-xl text-lg line-clamp-2 font-semibold text-white">
                        {video.title}
                    </h2>
                    <div className="flex gap-x-1 items-center">
                        <p className="text-gray-400 text-[10px] max-md:text-sm">
                            {formatViews(video.views)} views
                        </p>
                        <p className="text-gray-400 text-[10px] max-md:text-sm"> • </p>
                        <p className="text-gray-400 text-[10px] max-md:text-sm">
                            {timeAgo(video.createdAt)}
                        </p>
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
                        className="max-md:w-10 w-6 aspect-square rounded-full object-cover cursor-pointer"
                    />
                    <p
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/channel/@${video.ownerUsername}`);
                        }}
                        className="text-gray-400 text-sm max-md:text-base hover:text-white cursor-pointer"
                    >
                        {video.ownerChannelName}
                    </p>
                </div>

                {/* Description */}
                <div>
                    <p className="text-gray-400 text-xs max-md:hidden line-clamp-2">
                        {video.description}
                    </p>
                </div>
            </div>
        </div>

    )
}

export default SearchedVideoCard