import React from 'react'
import VideoCard from '../components/VideoCard'
import { BiArrowToRight, BiArrowToLeft } from 'react-icons/bi'
import { FiThumbsUp } from 'react-icons/fi'
import { MdOutlineWatchLater } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { getWatchHistory } from '../store/asyncThunks/accountThunk'
import WatchHistoryCard from '../components/watchHistoryCard'

function WatchHistory() {
    const dispatch = useDispatch()
    const { watchHistory } = useSelector(state => state.account)

    React.useEffect(() => {
        console.log("Hello");
        dispatch(getWatchHistory())
    }, [])


    return (
        <div className='w-full'>
            <div className='w-full px-4 p-2'>

                <div className='flex flex-col'>
                    <h2 className='text-2xl font-bold mb-2'>Watch History </h2>
                    <button className='text-blue-700 self-end pb-0.5'>see all....</button>
                    <div className='w-full history flex gap-x-3 overflow-x-auto select-none relative'>

                        {
                            watchHistory?.map(video => (
                                <WatchHistoryCard key={video._id} video={video} />
                            ))
                        }

                        {/* <button className='fixed left-6 top-1/4 rounded-full bg-blue-700/70 hover:bg-blue-700 p-2 aspect-square'
                            onClick={() => document.querySelector('.history').scrollLeft -= 400}
                        >
                            <BiArrowToLeft className='text-3xl' />
                        </button>
                        <button className='fixed right-6 top-1/4 rounded-full bg-blue-700/70 hover:bg-blue-700 p-2 aspect-square'
                            onClick={() => document.querySelector('.history').scrollLeft += 400}
                        >
                            <BiArrowToRight className='text-3xl' />
                        </button> */}
                    </div>

                </div>

                <div className='my-8 flex-col flex gap-y-3'>
                    <div className='cursor-pointer rounded-md flex items-center gap-x-3 text-xl bg-zinc-600/20 p-2'>
                        <FiThumbsUp /> Liked Videos
                    </div>
                    <div className=' cursor-pointer rounded-md flex items-center gap-x-3 text-xl bg-zinc-600/20 p-2'>
                        <MdOutlineWatchLater /> Watch Later
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WatchHistory