import React from 'react'
import formatViews from '../utils/formatViews'
import { useNavigate } from 'react-router-dom'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { removeVideoFromWatchHistory } from '../store/asyncThunks/accountThunk'

function WatchHistoryCard({ video}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showRemove, setShowRemove] = React.useState(false)


    return (
        <div
            key={video._id}
            onClick={(e) => {
                e.stopPropagation()
                const videoId = video._id
                navigate(`/videos/play?v_id=${videoId}`);
            }}
            className='flex flex-col gap-y-1 pb-8 min-w-52 w-1/5'>
            <div className='w-full relative aspect-video rounded-md'>
                <img src={video.thumbnail} alt="Thumbnail" className='w-full object-cover aspect-video rounded-md' />
                <div className='absolute bottom-1 right-2 bg-black/70 px-1 text-xs rounded-sm tracking-widest'>{video.duration}</div>
            </div>

            <p className='line-clamp-1'> {video.title}</p>

            <div className='flex w-full relative'>
                <div className='flex flex-wrap gap-x-1 w-11/12'>
                    <p className='text-xs text-gray-500 w-1/3 overflow-hidden text-ellipsis whitespace-nowrap'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores dolorem vel, enim nesciunt porro cum.</p>
                    <p className='text-xs text-gray-500'> • </p>
                    <p className='text-xs text-gray-500'>{formatViews(video.views)} views</p>
                </div>
                <BiDotsVerticalRounded
                    className="cursor-pointer"
                    onClick={(e) => { e.stopPropagation(); setShowRemove(prev => !prev) }}
                />
                {
                    showRemove &&
                    // overflow container for remove button
                    <div className='absolute bg-gray-600/30 rounded-lg p-1 right-6 top-4 cursor-pointer'
                        onClick={(e) => {
                            e.stopPropagation()
                            dispatch(removeVideoFromWatchHistory(video._id))
                        }}
                    >
                        Remove
                    </div>
                }

            </div>
        </div>
    )
}

export default WatchHistoryCard