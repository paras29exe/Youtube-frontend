import React, { useRef, useState, useEffect, useContext } from 'react'
import { displayContext } from '../context/displayContext';
import { useDispatch } from 'react-redux';
import { toggleCommentLike } from '../store/asyncThunks/likeSubscribeThunk';
import { deleteComment } from '../store/asyncThunks/commentThunk';
import timeAgo from '../utils/timeAgo'
import { FaRegThumbsDown, FaThumbsDown, FaRegThumbsUp, FaThumbsUp, FaHeart } from 'react-icons/fa';
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { RiDeleteBin5Line } from 'react-icons/ri'


function SingleComment({ comment, userData, videoOwnerId, videoOwnerChannelName, selfVideo = false }) {

    const { togglePopup } = useContext(displayContext)
    const deleteRef = useRef()
    const dispatch = useDispatch()

    const [isLiked, setIsLiked] = useState(comment.likedByViewer)
    const [isDisliked, setIsDisliked] = useState(false)
    const [likesCount, setLikesCount] = useState(comment.likesCount || 0)
    const [showDelete, setShowDelete] = useState(null)
    const [disableLike, setDisableLike] = useState(false)
    const [likedByOwner, setLikedByOwner] = useState(comment.likedByOwner)


    const handleLike = () => {

        setIsLiked((prev) => !prev)
        selfVideo && setLikedByOwner(prev => !prev)

        isDisliked && setIsDisliked(false)
        // increasing the likes count
        isLiked ?
            setLikesCount((prev) => prev - 1)
            :
            setLikesCount((prev) => prev + 1)
    }

    const handleDislike = () => {
        setIsDisliked((prev) => !prev)

        if (isLiked) {
            setIsLiked(false)
            setLikesCount((prev) => prev - 1)
            selfVideo && setLikedByOwner(false)
        }
    }

    // const handleClickOutside = (event) => {
    //     // If clicking outside both the delete menu and the more_vert button
    //     if (deleteRef.current && !deleteRef.current.contains(event.target) && !showDelete) {
    //         setShowDelete(null);
    //     }
    // };

    // useEffect(() => {
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, [])

    return (
        <div key={comment._id} className='flex justify-between'>
            <div className='flex '>
                <div className="mt-2">
                    <img className="w-10 aspect-square rounded-full object-cover" src={comment.ownerAvatar || "https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1"} alt="User Avatar" />
                </div>
                <div className="flex flex-col pl-3">
                    <div className="flex  items-center gap-x-1 ">
                        <span className=" text-xs text-gray-200 italic">@{comment.ownerUsername}</span>
                        <span className=' text-gray-500 text-lg'>•</span>
                        <span className="text-gray-400 text-xs">{timeAgo(comment.createdAt)}</span>
                    </div>
                    <p className="">{comment.content}</p>

                    <div className=" text-white mt-1 py-1.5 text-sm rounded-full flex items-center select-none">
                        <div className='flex items-center'>
                            <button
                                onClick={(e) => {
                                    if (userData) {
                                        const buttonClick = e.currentTarget
                                        if (buttonClick) {
                                            buttonClick.classList.add("-translate-y-3", "-rotate-12", "scale-110");
                                            setDisableLike(true)

                                            setTimeout(() => {
                                                buttonClick.classList.remove("-translate-y-3", "-rotate-12", "scale-110");
                                                dispatch(toggleCommentLike(comment._id))
                                                handleLike()
                                                setDisableLike(false)
                                            }, 300)
                                        }
                                    } else {
                                        togglePopup()
                                    }
                                }
                                }
                                className={`transition-all duration-300`}
                                disabled={disableLike}
                            >
                                {
                                    (isLiked && userData)
                                        ? <FaThumbsUp className={`text-lg transition-all duration-300 fill-blue-600 `} /> : <FaRegThumbsUp className="text-lg transition-all duration-300 " />
                                }

                            </button>
                            <span className="ml-1">{likesCount}</span>
                        </div>
                        <button
                            onClick={() => {
                                if (userData) {
                                    handleDislike()
                                } else {
                                    togglePopup()
                                }
                            }}
                            className={` transition-all duration-200 ml-4 ${(isDisliked && userData) ? "text-blue-600" : ""}`}
                        >
                            {
                                (isDisliked && userData)
                                    ? <FaThumbsDown className={`text-lg transition-all duration-300 -scale-x-100 fill-blue-600 `} /> : <FaRegThumbsDown className="text-lg -scale-x-100 transition-all duration-300 " />
                            }
                        </button>
                        {
                            likedByOwner
                            && <div className='relative left-10 flex gap-x-1 items-center'>
                                <FaHeart className="text-lg fill-red-600" />
                                <span>by ~ ( {videoOwnerChannelName} )</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {
                // owner can remove any comment
                userData?.user?._id === videoOwnerId
                    ? <button
                        type="button"
                        className='flex items-center justify-end self-center gap-x-1 bg-gray-600/30 px-2.5 py-1 rounded-lg text-sm font-thin'
                        onClick={() => dispatch(deleteComment(comment._id))}
                    >
                        Remove <RiDeleteBin5Line className='fill-red-600 cursor-pointer' />
                    </button>
                    :
                    // comment owner can remove his/her comment
                    comment.ownerId === userData?._id
                        ? <div className='relative mr-6 mt-2 select-none'>

                            <BiDotsVerticalRounded
                                className='text-xl'
                                onClick={(e) => setShowDelete(prev => !prev)}
                            />

                            {
                                showDelete &&
                                <div
                                    ref={deleteRef}
                                    className='absolute cursor-pointer right-5 top-5 px-4 py-2 rounded-lg bg-gray-600/40 hover:bg-gray-500/40 shadow-md'
                                    onClick={() => {
                                        dispatch(deleteComment(comment._id))
                                        setShowDelete(false)
                                    }}
                                >
                                    Delete
                                </div>
                            }
                        </div>
                        : null
            }
            {/* </div> */}

        </div>
    )
}

export default SingleComment