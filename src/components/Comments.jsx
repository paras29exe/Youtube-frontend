import React from 'react'
import timeAgo from '../utils/timeAgo'

function Comments({ currentVideo }) {
    return (
        <div className="flex flex-col gap-y-6 py-6">

            {currentVideo.comments.map((comment) => (

                <div className='flex '>
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
                            <button className="material-icons">thumb_up</button>
                            <span className="ml-1">{comment.likesOnComment}</span>
                            <button className="material-icons ml-3">thumb_down</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Comments