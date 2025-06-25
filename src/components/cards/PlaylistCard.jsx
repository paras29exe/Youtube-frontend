import React from 'react'

function PlaylistCard({ playlist }) {
    
    return (
        <div className="flex w-full items-start gap-x-4 p-3 hover:bg-zinc-700/50 transition-all duration-150 ease-in-out cursor-pointer">
            <div className="w-1/4 relative aspect-video">
                <div className="absolute bottom-1.5 right-3 w-full h-full bg-zinc-600/40 rounded-md shadow-lg"></div>
                <div className="absolute bottom-[3px] right-1.5 w-full  h-full bg-zinc-500/40 rounded-md shadow-lg "></div>
                <img
                    src={playlist?.coverImage}
                    alt="coverImage"
                    className="w-full h-full bg-black object-cover rounded-md shadow-lg relative z-20"
                />
            </div>
            <div className="flex flex-col w-3/4 gap-y-2">
                <h2 className="text-white text-lg font-semibold line-clamp-2">{playlist?.name} </h2>
                <p className="text-gray-400 text-sm">{playlist?.videos.length} videos</p>
                <p className="text-gray-400 text-xs line-clamp-3">{playlist?.description} </p>
            </div>
        </div>
    )
   
  
}

export default PlaylistCard