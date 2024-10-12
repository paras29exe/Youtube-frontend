import React from "react";

function Skeleton() {
    const loadingSkeletonStyle = "animate-pulse bg-[#222222] h-10 w-full mb-2";

    return (
        <>
            <div className="w-full overflow-y-auto flex flex-wrap gap-2 content-start px-4">
                {
                    Array.from({ length: 21 }, (_, index) => index + 1).map((index) => (
                        <div
                            key={index}
                            className={`${loadingSkeletonStyle} w-full h-60 lg2:h-64 md:h72 relative rounded-sm flex-grow 
                            basis-[calc(100%-0.5rem)] sm:basis-[calc(50%-0.5rem)] 
                            lg2:basis-[calc(33.33%-0.5rem)] 3xl:basis-[calc(25%-0.5rem)] 
                            4xl:basis-[calc(20%-0.5rem)]`}>
                            <div className="absolute bottom-1 border-slate-500 h-12 w-full border-t p-2">
                                <div className="absolute bottom-1 w-8 h-8 animate-pulse bg-gray-500 rounded-full space-y-2"></div>
                                <div>
                                    <div className="w-3/4 h-3 ml-10 bg-gray-500 rounded-sm mt-1"></div>
                                    <div className="w-3/4 h-3 ml-10 bg-gray-500 rounded-sm mt-1"></div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </>
    );
}

export default Skeleton;