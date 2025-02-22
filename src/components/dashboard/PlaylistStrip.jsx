import React from 'react'

function PlaylistStrip({ playlist, togglePlaylistSelection, isSelected }) {
    return (
        <div
            className={`flex items-center gap-x-1.5 p-2 hover:bg-zinc-700/50 cursor-pointer ${(isSelected) ? 'bg-zinc-700/60' : ''}`}
            onClick={() => togglePlaylistSelection(playlist._id)}
        >
            <input
                type="checkbox"
                checked={isSelected}
                onChange={() => { }}
                className="mr-2 cursor-pointer"
            />
            <div className="relative aspect-video h-12">
                <div className="absolute bottom-2 right-2 w-full h-full bg-gray-500 rounded-md shadow-lg z-0"></div>
                <div className="absolute bottom-1 right-1 w-full h-full bg-gray-400 rounded-md shadow-lg z-10"></div>
                <img
                    src={
                        playlist.coverImage ||
                        "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                    }
                    alt="coverImage"
                    className="w-full h-full object-cover rounded-md shadow-lg relative z-20"
                />
            </div>

            <span className="text-white">{playlist.name}</span>
        </div>
    )
}

export default PlaylistStrip