import React from 'react'

function PlaylistStrip({ playlist, togglePlaylistSelection, isSelected }) {
    
    return (
        <div
            className={`flex items-center gap-x-2 p-2 hover:bg-zinc-700/50 cursor-pointer ${(isSelected) ? 'bg-zinc-700/60' : ''}`}
            onClick={() => togglePlaylistSelection(playlist?._id)}
        >
            <input
                type="checkbox"
                checked={isSelected}
                onChange={() => { }}
                className="mr-1 cursor-pointer"
            />
            <div className="relative aspect-video h-12">
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[80%] mx-auto h-full bg-gray-500 rounded-md shadow-lg z-0"></div>
                <div className="absolute bottom-[3px] left-1/2 -translate-x-1/2 w-[90%] mx-auto h-full bg-gray-400 rounded-md shadow-lg z-10"></div>
                <img
                    src={
                        playlist?.coverImage 
                    }
                    alt="coverImage"
                    className="w-full h-full object-cover rounded-md shadow-lg relative z-20"
                />
            </div>

            <span className="text-white">{playlist?.name}</span>
        </div>
    )
}

export default PlaylistStrip