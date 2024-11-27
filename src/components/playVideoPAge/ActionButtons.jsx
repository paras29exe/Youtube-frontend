import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSubscribe, toggleVideoLike } from '../../store/asyncThunks/likeSubscribeThunk'
import Popup from '../../utils/Popup'
import { displayContext } from '../../context/displayContext'
import { FaRegThumbsUp ,FaThumbsUp, FaRegThumbsDown, FaThumbsDown, FaShareSquare, FaBell, FaDownload } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function ActionButtons({ currentVideo }) {
    const [likesCount, setLikesCount] = React.useState(currentVideo.likesCount)
    const [isLiked, setIsLiked] = React.useState(currentVideo.likedByViewer)
    const [isDisliked, setIsDisliked] = React.useState(false)
    const [subscriberCount, setSubscriberCount] = React.useState(currentVideo.channelDetails.subscribersCount)
    const [isSubscribed, setIsSubscribed] = React.useState(currentVideo.channelDetails.subscribedByViewer)

    const { showPopup, togglePopup } = useContext(displayContext)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userData } = useSelector(state => state.auth)

    const shareVideo = () => {
        console.log(location.href)
    }

    return (

        <div className=" flex items-center justify-between gap-x-8 mt-2">
            <div className="flex items-center w-1/2 gap-x-4 ">

                <div className='flex items-center gap-x-2'>
                    <img
                        onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/channel/${"@" + currentVideo.channelDetails.username}`, { state: { channelId: currentVideo.channelDetails._id } })
                        }}
                        src={currentVideo.channelDetails.avatar}
                        alt="Channel Avatar"
                        className="rounded-full w-10 aspect-square object-cover"
                    />
                    <div className="">
                        <span className="font-bold mr-1 text-md line-clamp-1">{currentVideo.channelDetails.channelName}</span>
                        <div className="text-gray-400 text-xs block">{subscriberCount} subscribers</div>
                    </div>
                </div>

                <button
                    onClick={() => {
                        if (userData) {
                            dispatch(toggleSubscribe(currentVideo.channelDetails._id))
                            setIsSubscribed(prev => !prev)
                            setSubscriberCount(isSubscribed ? subscriberCount - 1 : subscriberCount + 1)
                        } else {
                            togglePopup()
                        }

                    }}
                    className={`px-3 py-1.5 text-sm rounded-full flex items-center transition-all duration-300 ${isSubscribed && userData ? "bg-gray-600/35" : "bg-white text-black"}`}
                >
                    <FaBell className={` ${isSubscribed && userData ? "fill-white" : "fill-black "}`} />
                    <span className="ml-1 font-sans font-bold text-inherit">{isSubscribed && userData ? "Subscribed" : "Subscribe"}</span>
                </button>

            </div>
            <div className="flex items-center justify-end space-x-3 w-1/2">

                <div className="bg-gray-700/30 text-white py-1.5 px-2 text-sm rounded-full flex items-center gap-x-1">
                    <button
                        onClick={(e) => {
                            if (userData) {
                                const button = e.currentTarget;
                                if (button) {
                                    button.classList.add("-translate-y-3", "-rotate-12", "scale-110");

                                    setTimeout(() => {
                                        button.classList.remove("-translate-y-3", "-rotate-12", "scale-110");
                                        dispatch(toggleVideoLike(currentVideo._id))
                                        setIsLiked(prev => !prev)
                                        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
                                        setIsDisliked(false)
                                    }, 300);
                                }

                            } else {
                                togglePopup()
                            }
                        }}
                        className={`text-lg transition-all duration-300 `}
                    >
                        {
                            isLiked ? <FaThumbsUp className={`text-lg transition-all duration-300 fill-blue-600 `} />
                             : <FaRegThumbsUp className="text-lg transition-all duration-300 " />
                        }

                    </button>

                    <span>{likesCount}</span>

                    <button
                        onClick={() => {
                            if (userData) {
                                dispatch(toggleVideoLike(currentVideo._id))
                                setIsDisliked(prev => !prev)
                                setLikesCount(isLiked ? likesCount - 1 : null)
                                setIsLiked(false)
                            } else {
                                togglePopup()
                            }
                        }}
                        className={` text-lg pl-2 ml-2 border-l transition-all duration-300 `}>

                        {
                            isDisliked ? <FaThumbsDown className={`text-lg transition-all duration-300 -scale-x-100 fill-blue-600 `} />
                                : <FaRegThumbsDown className="text-lg transition-all duration-300 " />
                        }
                    </button>
                </div>

                <button onClick={shareVideo} className="bg-gray-700/30 text-white p-2 rounded-full flex items-center justify-center">
                    <FaShareSquare className='text-lg' />
                    {/* <span className="ml-1">Share</span> */}
                </button>

                <button className="bg-gray-700/30 text-white text-sm p-2 rounded-full flex items-center justify-center">
                    <FaDownload className='text-lg' />
                    {/* <span className="ml-1">Download</span> */}
                </button>

            </div>

            {
                showPopup &&
                <Popup
                    onClose={() => togglePopup()}
                    onConfirm={() => togglePopup()}
                />
            }
        </div >
    )
}

export default ActionButtons