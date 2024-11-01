import React, { useContext, useEffect, useRef, useState } from 'react'
import timeAgo from '../../utils/timeAgo'
import { addComment, getComments, deleteComment } from '../../store/asyncThunks/commentThunk';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { displayContext } from '../../context/displayContext';
import { toggleCommentLike } from '../../store/asyncThunks/likeSubscribeThunk';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';

function Comments() {
    const { comments } = useSelector(state => state.comments)
    const { userData } = useSelector(state => state.auth)

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm()
    const { togglePopup } = useContext(displayContext)

    const [likesCount, setLikesCount] = useState(comments.map(comment => comment.likesCount))
    const [isLiked, setIsLiked] = useState(comments.map(comment => comment.likedByViewer))
    const [isDisliked, setIsDisliked] = useState(comments.map(() => false))
    const [showDelete, setShowDelete] = useState(null)

    const dispatch = useDispatch();
    const deleteRef = useRef()

    const submitComment = async (data) => {
        if (userData) {
            reset()
            const res = await dispatch(addComment(data))
            if (res.type.includes("rejected")) {
                throw res.error;
            }
            setIsLiked((prev) => {
                const prevLikedByViewer = [...prev]
                prevLikedByViewer.unshift(false)
                return prevLikedByViewer
            })
            setLikesCount((prev) => {
                const prevLikes = [...prev]
                prevLikes.unshift(0)
                return prevLikes
            })
        } else {
            togglePopup()
        }
    }

    const handleLike = (index) => {

        setIsLiked((prev) => {
            const prevLikedByViewer = [...prev]
            prevLikedByViewer[index] = !prevLikedByViewer[index]
            return prevLikedByViewer
        })

        isDisliked[index]
            ? setIsDisliked((prev) => {
                const prevDislikedByViewer = [...prev]
                prevDislikedByViewer[index] = false
                return prevDislikedByViewer
            }) : null

        isLiked[index] ?
            setLikesCount((prev) => {
                const prevLikes = [...prev]
                prevLikes[index] -= 1
                return prevLikes
            })
            :
            setLikesCount((prev) => {
                const prevLikes = [...prev]
                prevLikes[index] += 1
                return prevLikes
            })

    }

    const handleDislike = (index) => {
        setIsDisliked((prev) => {
            const prevDislikedByViewer = [...prev]
            prevDislikedByViewer[index] = !prevDislikedByViewer[index]
            return prevDislikedByViewer
        })
        if (isLiked[index]) {
            setIsLiked((prev) => {
                const prevLikedByViewer = [...prev]
                prevLikedByViewer[index] = false
                return prevLikedByViewer
            })
            setLikesCount((prev) => {
                const prevLikes = [...prev]
                prevLikes[index] -= 1
                return prevLikes
            })
        }
    }

    const handleClickOutside = (event) => {
        // If clicking outside both the delete menu and the more_vert button
        if (deleteRef.current && !deleteRef.current.contains(event.target) && !showDelete) {
            setShowDelete(null);
        }
    };

    useEffect(() => {

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    return (
        <div className='mt-6'>
            <h2 className="text-xl font-bold">Comments</h2>
            <form onSubmit={handleSubmit(submitComment)} className="flex items-start mt-4 space-x-4">

                <div className="w-12 h-11 rounded-full bg-gray-400">
                    <img className="w-full h-full rounded-full object-cover" src={userData?.user?.avatar || "https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1"} alt="Channel Thumbnail" />
                </div>
                <div className='flex w-full border border-gray-500 rounded-r-lg'>
                    <input
                        placeholder="Add a comment..."
                        className={`form-input w-full h-12 bg-transparent px-4 rounded-l-lg focus-within:outline-none`}
                        {...register('content', { required: true })}
                        autoComplete='off'
                    />
                    <button
                        type='submit' className={`h-12 text-center w-2/12 text-xl rounded-r-lg bg-gray-400/50 `}>Add</button>
                </div>

            </form>

            <div className="flex flex-col gap-y-6 py-6 px-1">

                {comments && comments.map((comment, index) => (
                    <div
                        key={comment._id}
                        className='flex justify-between'>
                        <div className='flex'>
                            <div className="w-10 h-10 rounded-full bg-gray-400">
                                <img className="w-full h-full rounded-full object-cover" src={comment.ownerAvatar || "https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1"} alt="User Avatar" />
                            </div>
                            <div className="flex flex-col pl-3">
                                <div className="flex gap-x-3 gap-y-1">
                                    <p className=" text-xs text-gray-200 italic">@{comment.ownerUsername}</p>
                                    <p className="text-gray-400 text-xs">{timeAgo(comment.createdAt)}</p>
                                </div>
                                <p className="">{comment.content}</p>

                                <div className=" text-white mt-1 py-1.5 text-sm rounded-full flex items-center">
                                    <button
                                        onClick={(e) => {
                                            if (userData) {
                                                const buttonClick = e.currentTarget
                                                if (buttonClick) {
                                                    buttonClick.classList.add("-translate-y-3", "-rotate-12", "scale-110");

                                                    setTimeout(() => {
                                                        buttonClick.classList.remove("-translate-y-3", "-rotate-12", "scale-110");
                                                        dispatch(toggleCommentLike(comment._id))
                                                        handleLike(index)
                                                    }, 300)
                                                }
                                            } else {
                                                togglePopup()
                                            }
                                        }
                                        }
                                        className={`transition-all duration-300`}>
                                            <FaThumbsUp className={`text-lg transition-all duration-300 ${(isLiked[index] && userData) ? "fill-blue-600" : ""}`}/>
                                        </button>

                                    <span className="ml-1">{likesCount[index]}</span>

                                    <button
                                        onClick={() => {
                                            if (userData) {
                                                handleDislike(index)
                                            } else {
                                                togglePopup()
                                            }
                                        }}
                                        className={` transition-all duration-200 ml-4 ${(isDisliked[index] && userData) ? "text-blue-600" : ""}`}>
                                            <FaThumbsDown className={`text-lg transition-all duration-200 -scale-x-100 ${(isDisliked[index] && userData) ? "fill-blue-600" : ""}`}/>
                                        </button>
                                </div>
                            </div>
                        </div>
                        <div className='relative mr-6'>
                            {
                                comment.ownerId === userData?.user?._id &&
                                <p
                                    className='p-1 rounded-full cursor-pointer material-icons  transition-colors duration-200'
                                    onClick={(e) => {
                                        setShowDelete(prev => prev === comment._id ? null : comment._id)
                                    }}
                                >
                                    more_vert
                                </p>
                            }
                            {
                                showDelete === comment._id &&
                                <div
                                    ref={deleteRef}
                                    className='absolute cursor-pointer right-6 top-5 px-4 py-2 rounded-lg bg-gray-600/40 hover:bg-gray-500/40 shadow-md'
                                    onClick={() => {
                                        dispatch(deleteComment(comment._id))
                                        setShowDelete(false)
                                    }}
                                >

                                    Delete

                                </div>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Comments