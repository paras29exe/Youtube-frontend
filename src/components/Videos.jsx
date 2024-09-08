import React from 'react';

function Videos() {
    const videos = [11, 52, 3, 24, 50, 60, 77, 88];

    return (
        <div className=' w-auto overflow-y-auto overflow-x-hidden pr-6 pl-2 flex flex-wrap content-start'>
            {
                videos.map((video) => {
                    return (
                        <div key={video} className='flex flex-col w-full sm:w-1/2 md:w-1/2 lg2:w-1/3 xl:w-1/3 3xl:w-1/4 4xl:w-1/5 p-2 max-lg2:px-4 box-border'>
                            <div className="relative overflow-hidden rounded-lg mb-2 flex-grow">
                                <img className="object-cover w-full " src={`https://picsum.photos/id/${video}/1000/600`} alt="Video thumbnail" />
                            </div>
                            <div className='py-3 flex gap-x-4'>
                                <div>
                                    <img className='w-10 h-10 relative object-cover inline-block rounded-full' src={`https://picsum.photos/id/${video}/1000/600`} alt="Channel name" />
                                </div>
                                <div className='text-left w-full'>
                                    <h3 className="inline-block text-xl font-bold">Video Title {video}</h3>
                                    <p className="text-xs text-gray-400">Channel name</p>
                                    <p>
                                        <span className="text-xs text-gray-400">500 views</span>
                                        <span className='text-gray-400'> • </span>
                                        <span className="text-xs text-gray-400">2 weeks ago</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Videos;