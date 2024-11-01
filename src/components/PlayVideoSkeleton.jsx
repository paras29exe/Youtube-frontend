import React from 'react'

function PlayVideoSkeleton() {
    return (
        <>
            <div className="flex flex-col w-full h-screen md2:flex-row md2:w-11/12 m-auto">
                <main className="w-full md2:w-3/5 flex-1 bg-black p-4">
                    <div className="w-full aspect-video bg-gray-700 animate-pulse mb-4"></div>

                    <div className="bg-gray-600 h-8 w-1/2 animate-pulse mb-4"></div>

                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                            <div className="bg-gray-600 h-12 w-12 rounded-full animate-pulse"></div>
                            <div className="bg-gray-600 h-6 w-32 animate-pulse"></div>
                            <button className="bg-red-500 h-8 w-20 rounded-full animate-pulse"></button>
                        </div>
                        <div className="flex space-x-4">
                            <button className="bg-gray-600 h-8 w-8 rounded-full animate-pulse"></button>
                            <button className="bg-gray-600 h-8 w-8 rounded-full animate-pulse"></button>
                            <button className="bg-gray-600 h-8 w-8 rounded-full animate-pulse"></button>
                        </div>
                    </div>

                    <div className="bg-gray-600 h-16 w-full animate-pulse mb-4"></div>

                    <div className="bg-gray-700 h-24 w-full animate-pulse"></div>
                </main>

                <aside className="w-full md2:w-2/5 bg-gray-900/40 p-4 pt-12">
                    {Array.from({ length: 10 }, (_, index) => index + 1).map((index) => (
                        <div key={index} className="flex flex-col md2:mb-0 mb-8 md2:flex-row gap-4">
                            <div className="bg-gray-700 h-72 md2:h-16 lg:h-20 lg2:h-24 animate-pulse mb-4 w-full md2:w-2/6"></div>

                            <div className="w-full md2:w-4/6 px-2">
                                <div className="h-12 md2:h-5 lg:h-8 w-full bg-gray-700 mb-2 md2:mb-4 animate-pulse"></div>
                                <div className="w-1/3 h-8 md2:h-3 lg:h-6 bg-gray-700 animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </aside>
            </div>
        </>
    )
}

export default PlayVideoSkeleton;
