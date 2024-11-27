import { addComment } from '../../store/asyncThunks/commentThunk';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import SingleComment from '../SingleComment';

function Comments({ currentVideo }) {
    const { comments = [] } = useSelector(state => state.comments)
    const { userData } = useSelector(state => state.auth)

    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const dispatch = useDispatch();

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
                        type='submit' className={`h-12 text-center w-2/12 text-xl rounded-r-lg hover:bg-gray-400/20 focus:bg-gray-400/20  bg-gray-400/30 `}>Add</button>
                </div>

            </form>

            <div className="flex flex-col gap-y-6 py-6 px-1">

                {comments && comments.map((comment) => (
                    <SingleComment key={comment._id}
                        videoOwnerId={currentVideo.ownerId}
                        comment={comment}
                        userData={userData}
                        videoOwnerChannelName={currentVideo.channelDetails.channelName}
                    />
                ))}
            </div>
        </div >
    )
}

export default Comments