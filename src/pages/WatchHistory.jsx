import React from 'react'
import VideoCard from '../components/VideoCard'
import { BiArrowToRight, BiArrowToLeft } from 'react-icons/bi'
import { FiThumbsUp } from 'react-icons/fi'
import { MdOutlineWatchLater } from 'react-icons/md'

function WatchHistory() {
    return (
        <div className='w-full'>
            <div className='w-full px-4 p-2'>

                <div className='flex flex-col'>
                    <h2 className='text-2xl font-bold mb-2'>Watch History </h2>

                    <button className='text-blue-700 self-end pb-0.5'>see all....</button>

                    <div className='w-full history flex gap-x-3 overflow-x-auto select-none'>
                        {Array.from({ length: 10 }, (_, index) => index + 1).map(item => <div className='flex flex-col gap-y-2 !min-w-52'>
                            <div className='w-full relative aspect-video rounded-md'>
                                <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/bb/a3/97/predator-ride-in-the.jpg?w=900&h=500&s=1" alt="" className='w-full object-cover aspect-video rounded-md' />
                                <div className='absolute bottom-1 right-2 bg-black/70 px-1 text-xs rounded-sm tracking-widest'>10:10</div>
                            </div>
                            <div>
                                <p className='line-clamp-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae totam consequatur fugit nemo nam rem suscipit voluptates debitis, necessitatibus minus!</p>
                                <div className='flex gap-x-1'>
                                    <p className='text-xs text-gray-500'>chanel name</p>
                                    <p className='text-xs text-gray-500'> • </p>
                                    <p className='text-xs text-gray-500'>1.5M views</p>
                                </div>

                            </div>
                        </div>)}

                        <button className='fixed left-6 top-1/4 rounded-full bg-blue-700/70 hover:bg-blue-700 p-2 aspect-square'
                            onClick={() => document.querySelector('.history').scrollLeft -= 400}
                        >
                            <BiArrowToLeft className='text-3xl' />
                        </button>
                        <button className='fixed right-6 top-1/4 rounded-full bg-blue-700/70 hover:bg-blue-700 p-2 aspect-square'
                            onClick={() => document.querySelector('.history').scrollLeft += 400}
                        >
                            <BiArrowToRight className='text-3xl' />
                        </button>
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