import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import formatViews from '../../utils/formatViews'
import timeAgo from '../../utils/timeAgo'
import { BsClock, BsGraphUp, BsPlayBtn } from 'react-icons/bs'
import { MdComment, MdThumbUp } from 'react-icons/md'
import { BiCopy, BiEdit } from 'react-icons/bi'
import { toast, ToastContainer } from 'react-toastify'
import ConfirmationPopup from '../../utils/ConfirmationPopup'
import { useDispatch } from 'react-redux'
import { updateVideoDetails } from '../../store/asyncThunks/videosThunk'
import { displayContext } from '../../context/displayContext'

function UserVideoCard({ video, selectAll = false }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const {options} = useContext(displayContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isChecked, setisChecked] = useState(false)
  const [showEdits, setShowEdits] = useState(false)
  const [showVisibilityPopup, setShowVisibilityPopup] = useState(false)

  useEffect(() => {
    setisChecked(selectAll)
  }, [selectAll])

  return (
    <div className='flex gap-x-3'>
      <input
        type="checkbox"
        className='cursor-pointer'
        name="" id=""
        checked={(isChecked || selectAll)}
        onChange={() => setisChecked(prev => !prev)}
      />
      <div
        id='edit-video-card'
        className={`w-full pr-4 flex gap-8 cursor-default rounded-lg ${(selectAll || isChecked) ? 'bg-zinc-700/60' : ''}`}
      // onClick={() => {
      //   navigate(`play?v_id=${video._id}`);
      // }}
      >


        <section className='left flex w-2/5 hover:bg-zinc-700/30 transition-all duration-100 rounded-md'>

          {/* Video Thumbnail */}
          <div className="relative w-2/5 aspect-video">
            <img
              src={video.thumbnail}
              alt="Video Thumbnail"
              className="h-full aspect-video object-cover rounded-md"
            />
            <div className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-xs px-1.5 rounded">
              {video?.duration}
            </div>
          </div>

          {/* Video Title & description */}
          <div
            className="p-2 w-full"
            onMouseOver={() => setShowEdits(true)}
            onMouseOut={() => setShowEdits(false)}
          >
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

        <section className='right w-3/5 flex justify-between select-none'>

          {/* visibility */}
          <div className='flex flex-col items-center gap-2.5'>
            <h3 className='text-gray-400'>Visibility</h3>

            {/* make a select box to switch public private */}
            <select
              id='visibility-option'
              className={`${video.publishStatus === "private" ? "bg-red-600/80 " : "bg-black/80"} text-xs  text-center px-2 py-0.5 cursor-pointer rounded-full border`}
              defaultValue={video.publishStatus}
              onChange={(e) => {
                setShowVisibilityPopup(true)
                setSearchParams({ status: e.target.value })
              }}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>

            {
              showVisibilityPopup ?
                <ConfirmationPopup
                  cancelFunc={() => {
                    document.getElementById("visibility-option").value = video.publishStatus
                    setShowVisibilityPopup(false)
                  }}
                  cancelText={"No"}
                  confirmFunc={async () => {
                    setShowVisibilityPopup(false)
                    await dispatch(updateVideoDetails({
                      data: { publishStatus: document.getElementById("visibility-option").value },
                      videoId: video?._id
                    }))
                    toast.success(<p className='font-sans font-semibold'>Publish status changed</p>, options);
                    
                  }}
                  confirmText={"Yes"}
                  message="Are you sure to make these changes?"
                  extraInfo={"This will make your video " + document.getElementById("visibility-option").value + " across platform."}
                /> : ""
            }
          </div>

          {/* views count */}
          <div className='flex flex-col items-center gap-2.5'>
            <h3 className='text-gray-400'>Views</h3>
            <div className='flex *:text-sm items-center justify-center gap-2'>
              <BsGraphUp />
              <span>{formatViews(video.views)}</span>
            </div>
          </div>

          {/* comments */}
          <div className='flex flex-col items-center gap-2.5'>
            <h3 className='text-gray-400'>Comments</h3>
            <div className='flex *:text-sm items-center justify-center gap-2'>
              <MdComment />
              <span>{video.comments}</span>
            </div>
          </div>

          {/* likes count */}
          <div className='flex flex-col items-center gap-2.5'>
            <h3 className='text-gray-400'>Likes</h3>
            <div className='flex *:text-sm items-center justify-center gap-2'>
              <MdThumbUp />
              <span>{formatViews(video.likes)}</span>
            </div>
          </div>

          {/* upload date */}
          <div className='flex flex-col items-center gap-2.5'>
            <h3 className='text-gray-400'>Uploaded</h3>
            <div className='flex *:text-sm items-center justify-center gap-2'>
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