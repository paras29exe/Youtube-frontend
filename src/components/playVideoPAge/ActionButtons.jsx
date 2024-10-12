import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, } from 'react-router-dom'
import { toggleCommentLike, toggleSubscribe, toggleVideoLike } from '../../store/ayncThunks/likeSubscribeThunk'
import Popup from '../../utils/Popup'

function ActionButtons({ currentVideo }) {
    const [likesCount, setLikesCount] = React.useState(currentVideo.likesCount)
    const [isLiked, setIsLiked] = React.useState(currentVideo.likedByViewer)
    const [isDisliked, setIsDisliked] = React.useState(false)
    const [subscriberCount, setSubscriberCount] = React.useState(currentVideo.channelDetails.subscribersCount)
    const [isSubscribed, setIsSubscribed] = React.useState(currentVideo.channelDetails.subscribedByViewer)
    const [showPopup, setShowPopup] = React.useState(false)

    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.auth)

    const shareVideo = () => {
        console.log(location.href)
    }

    return (

        <div className=" flex items-center justify-between gap-x-8">
            <div className="flex items-center w-1/2 gap-x-4 ">

                <div className='flex items-center gap-x-2'>
                    <img
                        src={currentVideo.channelDetails.avatar}
                        alt="Channel Avatar"
                        className="rounded-full w-10 h-10 object-cover"
                    />
                    <div className="">
                        <span className="font-bold mr-1 text-md line-clamp-1">{currentVideo.channelDetails.channelName}</span>
                        <div className="text-gray-400 text-xs block">{currentVideo.channelDetails.subscribersCount} subscribers</div>
                    </div>
                </div>

                <button
                    onClick={() => {
                        if (userData) {
                            dispatch(toggleSubscribe(currentVideo.channelDetails._id))
                            setIsSubscribed(prev => !prev)
                            setSubscriberCount(isSubscribed ? subscriberCount - 1 : subscriberCount + 1)
                        } else {
                            setShowPopup(true)
                        }

                    }}
                    className={`${isSubscribed ? "bg-gray-600/35" : "bg-white"} px-3 py-1.5 text-sm rounded-full flex items-center`}
                >
                    <span className={`material-icons ${isSubscribed ? "text-white" : "text-black"} `}>notifications</span>
                    <span className={`ml-1 font-sans font-semibold ${isSubscribed ? "text-white" : "text-black"}`}>{isSubscribed ? "Subscribed" : "Subscribe"}</span>
                </button>

            </div>
            <div className="flex items-center justify-end space-x-3 w-1/2">

                <div className="bg-gray-600/40 text-white px-3 py-1.5 text-sm rounded-full flex items-center">
                    <button
                        onClick={() => {
                            if (userData) {
                                dispatch(toggleVideoLike(currentVideo._id))
                                setIsLiked(prev => !prev)
                                setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
                                setIsDisliked(false)
                            } else {
                                setShowPopup(true)
                            }
                        }}
                        className={`material-icons ${isLiked ? "text-blue-600" : ""}`}
                    >thumb_up</button>

                    <span className="ml-1">{likesCount}</span>

                    <button
                        onClick={() => {
                            if (userData) {
                                setIsDisliked(prev => !prev)
                                setLikesCount(isLiked ? likesCount - 1 : null)
                                setIsLiked(false)
                            }else {
                                setShowPopup(true)
                            }
                        }}
                        className={`material-icons ml-3 ${isDisliked ? "text-blue-600" : ""}`}>thumb_down</button>
                </div>

                <button onClick={shareVideo} className="bg-gray-600/40 text-white px-3 py-1.5 text-sm rounded-full flex items-center">
                    <span className="material-icons ">share</span>
                    <span className="ml-1">Share</span>
                </button>

                <button className="bg-gray-600/40 text-white px-3 py-1.5 text-sm rounded-full flex items-center">
                    <span className="material-icons">download</span>
                    <span className="ml-1">Download</span>
                </button>

            </div>

            {
                showPopup &&
                <Popup
                    onClose={() => setShowPopup(prev => !prev)}
                    onConfirm={() => setShowPopup(prev => !prev)}
                />
            }
        </div >
    )
}

export default ActionButtons