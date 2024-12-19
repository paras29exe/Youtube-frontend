import React from 'react'
import Skeleton from './Skeleton'

function InitialSkeleton() {
    return (
        <div className='h-screen w-screen overflow-hidden'>
            {/* navbar */}
            <div className="navbar w-full h-20 bg-[#222222] border-slate-500 animate-pulse mb-1 flex items-center justify-between">
                <div className='h-full w-1/3 flex items-center py-2 pl-5'>
                    <div className='h-4/5 aspect-square bg-gray-500/50 border-slate-500 rounded-full'></div>
                </div>
                <div className="w-1/3 h-3/5 aspect-square bg-gray-500/50 rounded-full"></div>

                <div className="h-full w-1/3 py-2 flex items-center gap-2 justify-end">
                    <div className=" h-4/5 aspect-square bg-gray-500/50 rounded-full"></div>
                    <div className=" h-4/5 aspect-square bg-gray-500/50 rounded-full"></div>
                    <div className=" h-4/5 aspect-square bg-gray-500/50 rounded-full"></div>
                </div>
            </div>
            {/* sidebar and videos */}
            <div className=' flex gap-x-2'>
                <div className="w-1/6 max-sm:hidden h-screen bg-[#222222] border-slate-500 animate-pulse p-3 flex flex-col gap-y-4">
                    <div className='w-full h-8 rounded-md bg-gray-500/50'></div>
                    <div className='w-full h-8 rounded-md bg-gray-500/50'></div>
                    <div className='w-full h-8 rounded-md bg-gray-500/50'></div>
                    <div className='w-full h-8 rounded-md bg-gray-500/50'></div>
                    <div className='w-full h-8 rounded-md bg-gray-500/50'></div>
                    <div className='w-full h-8 rounded-md bg-gray-500/50'></div>
                    <div className='w-full h-8 rounded-md bg-gray-500/50'></div>
                </div>
                <Skeleton />
            </div>
        </div>
    )
}

export default InitialSkeleton