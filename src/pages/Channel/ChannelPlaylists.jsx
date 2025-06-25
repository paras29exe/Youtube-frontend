import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaylists } from '../../store/asyncThunks/playlistThunk';
import { NavLink, useLocation } from 'react-router-dom';

const ChannelPlaylists = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const channelUsername = location.pathname.split('@')[1].split('/')[0]; // Assuming the URL is like /
    const { playlists } = useSelector(state => state.playlists)

    useEffect(() => {
        !playlists && dispatch(getPlaylists(channelUsername))
            .then(res => {
                // console.log(res.payload.data)
            })

    }, [channelUsername])
    // console.log(playlists)

    if (!playlists?.length) return (
        <div className='flex flex-col gap-y-2 items-center justify-center pt-8'>
            <img src="https://www.gstatic.com/youtube/img/creator/no_content_illustration_v4_darkmode.svg" alt="" />
            <p className='text-gray-500'>No Content Available</p>
        </div>
    )

    return (
        <div className='w-full p-5 flex gap-2'>
            {
                playlists?.map(playlist => (
                    <div
                        key={playlist._id}
                        className='w-full flex flex-col gap-y-2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'
                    >
                        <div className=' w-full aspect-video relative'>
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[80%] h-full bg-gray-500 rounded-md shadow-lg z-0"></div>
                            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[90%] h-full bg-gray-400 rounded-md shadow-lg z-10"></div>
                            <img src={playlist.coverImage} alt="Cover photo"
                                className='w-full h-full rounded-md z-20 relative' />
                        </div>
                        <div >
                            <h3 className='font-bold'>
                                {playlist.name}
                            </h3>
                            <p className='text-xs mt-1 text-gray-500 font-semibold'>
                                View full Playlist
                            </p>
                        </div>
                    </div>
                ))
            }

        </div>
    );
};

export default ChannelPlaylists;