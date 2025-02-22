import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import formatViews from '../../utils/formatViews'
import timeAgo from '../../utils/timeAgo'
import { BsClock, BsGraphUp, BsPlayBtn } from 'react-icons/bs'
import { MdComment, MdThumbUp } from 'react-icons/md'
import { BiCopy, BiEdit } from 'react-icons/bi'
import { toast } from 'react-toastify'
import ConfirmationPopup from '../../utils/ConfirmationPopup'
import { useDispatch } from 'react-redux'
import { updateVideoDetails } from '../../store/asyncThunks/videosThunk'
import { displayContext } from '../../context/displayContext'

function UserVideoCard({ video, isSelected = false, setIsSelected }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { options } = useContext(displayContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [showEdits, setShowEdits] = useState(false)
  const [selectedVisibility, setSelectedVisibility] = useState(video.publishStatus)
  const [showVisibilityPopup, setShowVisibilityPopup] = useState(false)

  return (
    <div className='flex gap-x-3 max-lg:gap-x-5 w-full '>
      <input
        type="checkbox"
        className=' cursor-pointer  outline-none '
        name="" id=""
        checked={isSelected}
        onChange={(e) => {
          e.stopPropagation()
          setIsSelected(video._id)
        }}
      />

      <div
        id='edit-video-card'
        className={`w-full pr-4 flex max-lg:flex-col gap-8 cursor-default rounded-lg ${(isSelected) ? 'bg-zinc-700/60' : ''}`}

      >

        <section
          className='left flex w-2/5 max-lg:w-full hover:bg-zinc-700/30 transition-all duration-100 rounded-md'
          onMouseOver={() => setShowEdits(true)}
          onMouseOut={() => setShowEdits(false)}
        >

          {/* Video Thumbnail */}
          <div className="relative w-[30%] aspect-video">
            <img
              src={video.thumbnail}
              alt="Video Thumbnail"
              className=" aspect-video object-cover rounded-md"
            />
            <div className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-xs px-1.5 rounded">
              {video?.duration}
            </div>
          </div>

          {/* Video Title & description */}
          <div className="p-2 w-[70%]" >

            <h3 className=" line-clamp-1">{video?.title}</h3>

            {
              !showEdits
                ?
                <p className='text-xs line-clamp-2 text-gray-500'>{video?.description} </p>
                :
                <div className="flex items-center gap-6 mt-2 pl-2 transition-all duration-150">
                  {/* show edit icon , playvideo icon, share icon */}
                  <NavLink
                    className="flex items-center gap-2 cursor-pointer text-sm md:text-base"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("edit");
                      setSearchParams({ v_id: video?._id, status: video?.publishStatus });
                    }}
                  >
                    <BiEdit className=" fill-gray-400" />
                  </NavLink>
                  <NavLink
                    className="flex items-center gap-2 cursor-pointer text-sm md:text-base"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`play?v_id=${video._id}`);
                    }}
                  >
                    <BsPlayBtn className=" fill-gray-400" />
                  </NavLink>
                  <NavLink
                    className="flex items-center gap-2 cursor-pointer text-sm md:text-base"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText("http://localhost:5173/videos/play?v_id=" + video._id)
                        .then(() => {
                          toast.info("Link Copied to Clipboard")
                        })

                    }}
                  >
                    <BiCopy className=" fill-gray-400" />
                  </NavLink>
                </div>
            }
          </div>

        </section>

        <section className='right w-3/5 max-lg:w-full max-lg:pb-4 max-lg:justify-between flex justify-between select-none'>

          {/* visibility */}
          <div className='flex flex-col items-center gap-2.5'>
            <h3 className='text-gray-400 max-sm:text-xs'>Visibility</h3>

            {/* Select box for switching between public and private */}
            <select
              className={`${selectedVisibility === "private" ? "bg-red-600/80 " : "bg-black/80"} text-xs text-center sm:px-2 sm:py-0.5 cursor-pointer rounded-full border`}
              value={selectedVisibility}
              onChange={(e) => {
                e.preventDefault();
                setSelectedVisibility(e.target.value);
                setShowVisibilityPopup(true);
              }}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>

            {
              showVisibilityPopup &&
              <ConfirmationPopup
                cancelFunc={() => {
                  setSelectedVisibility(video.publishStatus); // Reset to original status
                  setShowVisibilityPopup(false);
                }}
                cancelText="No"
                confirmFunc={async () => {
                  setShowVisibilityPopup(false);
                  await dispatch(updateVideoDetails({
                    data: { publishStatus: selectedVisibility },
                    videoId: video._id
                  }));
                  toast.success(<p className='font-sans font-semibold'>Publish status changed</p>, options);
                }}
                confirmText="Yes"
                message="Are you sure to make these changes?"
                extraInfo={`This will make your video ${selectedVisibility} across the platform.`}
              />
            }
          </div>

          {/* views count */}
          <div className='flex flex-col items-center gap-2.5'>
            <h3 className='text-gray-400 max-sm:text-xs'>Views</h3>
            <div className='flex *:text-sm max-sm:*:text-xs items-center justify-center gap-2'>
              <BsGraphUp />
              <span>{formatViews(video.views)}</span>
            </div>
          </div>

          {/* comments */}
          <div className='flex flex-col items-center gap-2.5'>
            <h3 className='text-gray-400 max-sm:text-xs'>Comments</h3>
            <div className='flex *:text-sm max-sm:*:text-xs items-center justify-center gap-2'>
              <MdComment />
              <span>{video.comments}</span>
            </div>
          </div>

          {/* likes count */}
          <div className='flex flex-col items-center gap-2.5'>
            <h3 className='text-gray-400 max-sm:text-xs'>Likes</h3>
            <div className='flex *:text-sm max-sm:*:text-xs items-center justify-center gap-2'>
              <MdThumbUp />
              <span>{formatViews(video.likes)}</span>
            </div>
          </div>

          {/* upload date */}
          <div className='flex flex-col items-center gap-2.5 max-sm:hidden'>
            <h3 className='text-gray-400 max-sm:text-xs'>Uploaded</h3>
            <div className='flex *:text-sm max-sm:*:text-xs items-center justify-center gap-2'>
              <BsClock />
              <span>{timeAgo(video.createdAt)}</span>
            </div>
          </div>

        </section>


        {/* <NavLink
          className="flex items-center gap-2 cursor-pointer text-sm md:text-base"
          onClick={(e) => {
            e.stopPropagation();
            navigate("edit");
            setSearchParams({ v_id: video?._id, status: video?.publishStatus });
          }}
        >
          <FaEdit className="text-lg md:text-xl" />
        </NavLink> */}

      </div>
    </div>

  )
}

export default UserVideoCard