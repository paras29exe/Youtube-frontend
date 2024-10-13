import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSubscribe, toggleVideoLike } from '../../store/ayncThunks/likeSubscribeThunk'
import Popup from '../../utils/Popup'
import { displayContext } from '../../context/displayContext'

function ActionButtons({ currentVideo }) {
    const [likesCount, setLikesCount] = React.useState(currentVideo.likesCount)
    const [isLiked, setIsLiked] = React.useState(currentVideo.likedByViewer)
    const [isDisliked, setIsDisliked] = React.useState(false)
    const [subscriberCount, setSubscriberCount] = React.useState(currentVideo.channelDetails.subscribersCount)
    const [isSubscribed, setIsSubscribed] = React.useState(currentVideo.channelDetails.subscribedByViewer)

    const { showPopup, togglePopup } = useContext(displayContext)
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.auth)

    const shareVideo = () => {
        console.log(location.href)
    }

    return (

        <div className=" flex items-center justify-between gap-x-8 mt-2">
            <div className="flex items-center w-1/2 gap-x-4 ">

                <div className='flex items-center gap-x-2'>
                    <img
                        src={currentVideo.channelDetails.avatar}
                        alt="Channel Avatar"
                        className="rounded-full w-10 h-10 object-cover"
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
                    className={`px-3 py-1.5 text-sm rounded-full flex items-center transition-all duration-300 ${isSubscribed && userData ? "bg-gray-600/35" : "bg-red-700"}`}
                >
                    <span className="material-icons ">notifications</span>
                    <span className="ml-1 font-sans font-semibold ">{isSubscribed && userData ? "Subscribed" : "Subscribe"}</span>
                </button>

            </div>
            <div className="flex items-center justify-end space-x-3 w-1/2">

                <div className="bg-gray-600/40 text-white px-3 py-2 text-sm rounded-full flex items-center">
                    <button
                        onClick={() => {
                            if (userData) {
                                dispatch(toggleVideoLike(currentVideo._id))
                                setIsLiked(prev => !prev)
                                setLikesCount(isLiked ? likesCount - 1 : likesCount + 1)
                                setIsDisliked(false)
                            } else {
                                togglePopup()
                            }
                        }}
                        className={`material-icons transition-all duration-300 ${isLiked && userData ? "text-blue-600" : ""}`}
                    >thumb_up</button>

                    <span className="ml-1">{likesCount}</span>

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
                        className={`material-icons ml-3 transition-all duration-300 ${isDisliked ? "text-blue-600" : ""}`}>thumb_down</button>
                </div>

                <button onClick={shareVideo} className="bg-gray-600/40 text-white text-sm w-10 h-10 rounded-full flex items-center justify-center">
                    <span className="material-icons ">share</span>
                    {/* <span className="ml-1">Share</span> */}
                </button>

                <button className="bg-gray-600/40 text-white  text-sm w-10 h-10 rounded-full flex items-center justify-center">
                    <span className="material-icons">download</span>
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