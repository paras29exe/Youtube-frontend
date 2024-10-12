import React from 'react'

function ActionButtons({currentVideo}) {
  return (
    <div className=" text-white flex items-center justify-between gap-x-8">
                    <div className="flex items-center w-1/2 gap-x-4 ">
                        <div className='flex items-center gap-x-2'>
                            <img
                                src={currentVideo.channelDetails.avatar}
                                alt="Channel Avatar"
                                className="rounded-full w-10 h-10 object-cover"
                            />
                            <div className="">
                                <span className="font-bold mr-1 text-md line-clamp-1">{currentVideo.channelDetails.channelName}</span>
                                <div className="text-gray-400 text-xs block">{currentVideo.channelDetails.subscribersCount} subscribers</div>
                            </div>
                        </div>
                        <button className="bg-gray-600/40 text-white px-3 py-1.5 text-sm rounded-full flex items-center">
                            <span className="material-icons">notifications</span>
                            <span className="ml-1">Subscribed</span>
                            {/* <span className="material-icons">arrow_drop_down</span> */}
                        </button>
                    </div>
                    <div className="flex items-center justify-end space-x-3 w-1/2">
                        <div className="bg-gray-600/40 text-white px-3 py-1.5 text-sm rounded-full flex items-center">
                            <button className="material-icons">thumb_up</button>
                            <span className="ml-1">{currentVideo.likesCount}</span>
                            <button className="material-icons ml-3">thumb_down</button>
                        </div>
                        <button className="bg-gray-600/40 text-white px-3 py-1.5 text-sm rounded-full flex items-center">
                            <span className="material-icons ">share</span>
                            <span className="ml-1">Share</span>
                        </button>
                        <button className="bg-gray-600/40 text-white px-3 py-1.5 text-sm rounded-full flex items-center">
                            <span className="material-icons">download</span>
                            <span className="ml-1">Download</span>
                        </button>
                    </div>
                </div>
  )
}

export default ActionButtons