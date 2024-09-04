import React from 'react'

function Videos() {
    const videos = [11, 52, 3, 24, 50, 60, 77, 88]

    return (
        <div className='h-screen w-auto overflow-y-auto overflow-x-hidden pb-20 pr-6 grid grid-cols-3 auto-rows-max gap-4 4xl:grid-cols-5 3xl:grid-cols-4'>
            {
                videos.map((video) => {
                    return (
                        <div key={video}>
                            <div className="relative overflow-hidden rounded-lg ">
                                <img className="object-cover w-full h-full" src={`https://picsum.photos/id/${video}/1000/600`} alt="Video thumbnail" />
                            </div>
                            <div className='py-3 flex gap-x-4'>
                                <div>
                                    <img className='w-10 h-9 relative object-cover inline-block rounded-full' src={`https://picsum.photos/id/${video}/1000/600`} alt="Channel name" />
                                </div>
                                <div className=' text-left w-full'>
                                    <h3 className="inline-block text-xl font-bold ">Video Title {video}</h3>
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

export default Videos   