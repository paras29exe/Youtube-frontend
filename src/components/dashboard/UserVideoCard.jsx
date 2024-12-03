import React from 'react'
import { FaThumbsUp, FaComment, FaEdit } from 'react-icons/fa'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import formatViews from '../../utils/formatViews'
import timeAgo from '../../utils/timeAgo'

function UserVideoCard({ video }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    return (
        <div
  className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-10px)] 2xl:w-[calc(25%-10px)] rounded-lg"
  onClick={() => {}}
>
  {/* Video Thumbnail */}
  <div className="relative w-full aspect-video">
    <img
      src={video.thumbnail}
      alt="Video Thumbnail"
      className="w-full aspect-video object-cover rounded-lg"
    />
    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] sm:text-xs md:text-sm px-1.5 rounded">
      {video?.duration}
    </div>
  </div>

  {/* Video Title */}
  <div className="p-2">
    <h3 className="font-semibold text-sm sm:text-base md:text-lg">{video?.title}</h3>
    <p className="flex gap-x-2">
      <span className="text-[10px] sm:text-xs md:text-sm text-gray-500">
        {formatViews(video.views)} views
      </span>
      <span className="text-[10px] sm:text-xs md:text-sm text-gray-500">•</span>
      <span className="text-[10px] sm:text-xs md:text-sm text-gray-500">
        {timeAgo(video?.createdAt)}
      </span>
    </p>
  </div>

  {/* Video Stats (Likes, Comments) */}
  <div className="flex items-center justify-between px-4 border-t">
    <div className="py-1 flex items-center gap-x-3">
      <div className="flex items-center gap-2 text-[10px] sm:text-xs md:text-sm">
        <FaThumbsUp />
        <span>{video?.likes}</span>
      </div>
      <div className="flex items-center gap-2 text-[10px] sm:text-xs md:text-sm">
        <FaComment />
        <span>{video?.comments}</span>
      </div>
      <div
        className={`${
          video.publishStatus === "private" ? "bg-red-600/80 text-white" : "text-gray-500"
        } text-[10px] sm:text-xs md:text-sm px-3 py-0.5 rounded-full border`}
      >
        {(video?.publishStatus.charAt(0).toUpperCase() + video?.publishStatus.slice(1))}
      </div>
    </div>
    <NavLink
      className="flex items-center gap-2 cursor-pointer text-sm md:text-base"
      onClick={(e) => {
        e.stopPropagation();
        navigate("edit");
        setSearchParams({ v_id: video?._id, status: video?.publishStatus });
      }}
    >
      <FaEdit className="text-[14px] sm:text-lg md:text-xl" />
    </NavLink>
  </div>
</div>

    )
}

export default UserVideoCard