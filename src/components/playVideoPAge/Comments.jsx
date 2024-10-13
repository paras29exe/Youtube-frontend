import React, { useContext, useEffect, useState } from 'react'
import timeAgo from '../../utils/timeAgo'
import { addComment, getComments } from '../../store/ayncThunks/commentThunk';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { displayContext } from '../../context/displayContext';
import { toggleCommentLike } from '../../store/ayncThunks/likeSubscribeThunk';

function Comments({ currentVideo }) {
    const { comments } = useSelector(state => state.comments)
    const { userData } = useSelector(state => state.auth)

    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { togglePopup } = useContext(displayContext)

    const [render, setRender] = useState(false)
    const [likesCount, setLikesCount] = useState([])
    const [isLiked, setIsLiked] = useState([])
    const [isDisliked, setIsDisliked] = useState([])

    const dispatch = useDispatch();

    const submitComment = async (data) => {
        if (userData) {
            reset()
            const res = await dispatch(addComment(data))
            if (res.type.includes("rejected")) {
                throw res.error;
            }
            setRender((prev) => !prev)
        } else {
            togglePopup()
        }
    }

    const handleLike = (i) => {

        setIsLiked((prev) => {
            const prevLikedByViewer = [...prev]
            prevLikedByViewer[i] = !prevLikedByViewer[i]
            return prevLikedByViewer
        })

        isDisliked[i]
            ? setIsDisliked((prev) => {
                const prevDislikedByViewer = [...prev]
                prevDislikedByViewer[i] = false
                return prevDislikedByViewer
            }) : null

        isLiked[i] ?
            setLikesCount((prev) => {
                const prevLikes = [...prev]
                prevLikes[i] -= 1
                return prevLikes
            })
            :
            setLikesCount((prev) => {
                const prevLikes = [...prev]
                prevLikes[i] += 1
                return prevLikes
            })

    }

    const handleDislike = (i) => {
        setIsDisliked((prev) => {
            const prevDislikedByViewer = [...prev]
            prevDislikedByViewer[i] = !prevDislikedByViewer[i]
            return prevDislikedByViewer
        })
        if (isLiked[i]) {
            setIsLiked((prev) => {
                const prevLikedByViewer = [...prev]
                prevLikedByViewer[i] = false
                return prevLikedByViewer
            })
            setLikesCount((prev) => {
                const prevLikes = [...prev]
                prevLikes[i] -= 1
                return prevLikes
            })
        }
    }

    useEffect(() => {
        const fetchComments = async () => {
            const res = await dispatch(getComments(currentVideo._id))
            const likes = res.payload.data.map(comment => comment.likesCount);
            setLikesCount(likes);
            const liked = res.payload.data.map(comment => comment.likedByViewer);
            setIsLiked(liked);
            const disliked = Array.from({ length: (res.payload.data).length }, (_, index) => false)
            setIsDisliked(disliked);
        }
        fetchComments()
    }, [render])

    return (
        <div className='mt-6'>
            <h2 className="text-xl font-bold">Comments</h2>
            <form onSubmit={handleSubmit(submitComment)} className="flex items-start mt-4 space-x-4">

                <div className="w-12 h-11 rounded-full bg-gray-400">
                    <img className="w-full h-full rounded-full object-cover" src={userData?.user?.avatar || "https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1"} alt="Channel Thumbnail" />
                </div>
                <div className='flex w-full border border-gray-500 rounded-r-lg  focus-within:outline focus-within:outline-1 focus-within:outline-gray-400'>
                    <input
                        placeholder="Add a comment..."
                        className={`form-input w-full h-12 bg-transparent px-4 rounded-l-lg focus-within:outline-none`}
                        {...register('content', { required: true })}
                        autoComplete='off'
                    />
                    <button type='submit' className='h-12 text-center w-2/12 text-xl  bg-gray-500/40 rounded-r-lg'>Add</button>
                </div>

            </form>

            <div className="flex flex-col gap-y-6 py-6">

                {comments && comments.map((comment, i) => (
                    <div
                        key={comment._id}
                        className='flex '>
                        <div className="w-10 h-10 rounded-full bg-gray-400">
                            <img className="w-full h-full rounded-full object-cover" src={comment.ownerAvatar || "https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1"} alt="User Avatar" />
                        </div>
                        <div className="flex flex-col pl-3">
                            <div className="flex gap-x-3 gap-y-1">
                                <p className=" text-xs">@{comment.ownerUsername}</p>
                                <p className="text-gray-400 text-xs">{timeAgo(comment.createdAt)}</p>
                            </div>
                            <p className="">{comment.content}</p>

                            <div className=" text-white mt-1 py-1.5 text-sm rounded-full flex items-center">
                                <button
                                    onClick={() => {
                                        if (userData) {
                                            dispatch(toggleCommentLike(comment._id))
                                            handleLike(i)
                                        } else {
                                            togglePopup()
                                        }
                                    }}
                                    className={`material-icons transition-all duration-200 ${(isLiked[i] && userData) ? "text-blue-600" : ""}`}>thumb_up</button>

                                <span className="ml-1">{likesCount[i]}</span>

                                <button
                                    onClick={() => {
                                        if (userData) {
                                            handleDislike(i)
                                        } else {
                                            togglePopup()
                                        }
                                    }}
                                    className={`material-icons transition-all duration-200 ml-4 ${(isDisliked[i] && userData) ? "text-blue-600" : ""}`}>thumb_down</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Comments