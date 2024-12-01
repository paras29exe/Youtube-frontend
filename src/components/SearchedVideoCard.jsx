import React from 'react'
import formatViews from '../utils/formatViews'
import timeAgo from '../utils/timeAgo'

function SearchedVideoCard({video}) {
    return (
        <div className=" w-full flex gap-x-4 p-3">
            <div className='relative w-1/2 md2:w-2/5 h-full rounded-xl object-contain select-none'>
                <img src={video.thumbnail} className='w-full aspect-video rounded-xl object-cover object-center' />
                <div className='absolute right-2 bottom-2 bg-black/70 px-1.5 rounded-sm'>{video.duration}</div>
            </div>
            <div className=' flex flex-col w-1/2 md2:w-3/5 gap-y-4 object-contain'>
                <div>
                    <h2 className='text-2xl'>{video.title}</h2>
                    <div className='flex gap-x-1 items-center'>
                        <p className='text-gray-400 text-xs'>{formatViews(video.views)} views</p>
                        <p className='text-gray-400 text-xs'> • </p>
                        <p className='text-gray-400 text-xs'>{timeAgo(video.createdAt)}</p>
                    </div>
                </div>
                <div className='flex items-center gap-x-2'>
                    <img src={video.ownerAvatar} className='w-7 aspect-square rounded-full' />
                    <p className='text-gray-400 text-sm'>{video.ownerChannelName}</p>
                </div>
                <div>
                    <p className='text-gray-400 text-sm line-clamp-2'>{video.description}</p>
                </div>
            </div>
        </div>
    )
}

export default SearchedVideoCard