import React, { useState, useEffect, useContext } from 'react';
import { displayContext } from "../context/displayContext"

function Videos() {
    const videos = [11, 52, 3, 24, 50, 60, 77, 88, 100, 100 + 1, 100 + 2, 100 + 3, 100 + 4 , 100 + 5 + 1, 100 + 6 + 1];
    const { showSidebar } = useContext(displayContext)
    const [fourVideosInRow, setFourVideosInRow] = useState(false); // Add state for 4 videos in a row

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;

            // Check if showSidebar is false and screen width is between 1100px and 1600px
            if (!showSidebar && screenWidth >= 1300 && screenWidth <= 1600) {
                setFourVideosInRow(true);
            } else {
                setFourVideosInRow(false);
            }
        };

        // Initial check on component mount
        handleResize();

        // Listen for window resize events
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [showSidebar]);

    return (
        <div className='w-auto overflow-y-auto overflow-x-hidden px-2 flex flex-wrap content-start pb-20'>
            {
                videos.map((video) => {
                    return (
                        <div
                            key={video}
                            className={`flex flex-col w-full sm:w-1/2 lg2:w-1/3 3xl:w-1/4 4xl:w-1/5 p-2 max-lg2:px-4 box-border ${fourVideosInRow ? "min-w-1/4 max-w-1/4" : null}`}
                            onClick={() => console.log("Clicked")}
                        >
                            <div className="relative overflow-hidden rounded-lg mb-2 flex-grow">
                                <img
                                    className="object-cover w-full "
                                    src={`https://picsum.photos/id/${video}/1000/600`}
                                    alt="Video thumbnail"
                                />
                                <div className="absolute bottom-1 right-3 bg-black/80 px-1.5 py-0.5 font-semibold text-xs ">
                                    20:50
                                </div>
                            </div>
                            <div className='py-3 flex gap-x-4'>
                                <div className='overflow-hidden'>
                                    <img
                                        className='w-12 h-11 rounded-full object-cover'
                                        src={`https://picsum.photos/id/${video}/1000/600`}
                                        alt="Channel Avatar"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            console.log("image clicked")

                                        }} />
                                </div>
                                <div className='text-left w-full'>
                                    <h3
                                        className="inline-block text-xl font-bold mb-1"
                                    >Video Title {video}
                                    </h3>
                                    <p
                                        className="text-xs text-gray-400 w-fit cursor-pointer -mb-1"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            console.log("Channel clicked")
                                        }}
                                    >
                                        Channel name
                                    </p>
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
        </div >
    )
}

export default Videos;