import React from "react";

function Skeleton() {
    const loadingSkeletonStyle = "animate-pulse bg-[#222222] h-10 w-full mb-2";
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]


    return (
        <>
            <div className="w-full overflow-y-auto grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
                {
                    array.map((i) => (
                        <div key={i} className={`${loadingSkeletonStyle} h-56 relative rounded-sm`}>
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