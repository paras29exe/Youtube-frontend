import React, { useEffect } from 'react'
import PlaylistCard from '../../components/cards/PlaylistCard'
import { useDispatch, useSelector } from 'react-redux'
import { getPlaylists } from '../../store/asyncThunks/playlistThunk';
import { NavLink } from 'react-router-dom';

function Playlists() {
  const { userPlaylists } = useSelector(state => state.playlists)
  const { userData } = useSelector(state => state.auth)
  const dispatch = useDispatch();

  // Fetch playlists when the component mounts
  useEffect(() => {
    async function fetchPlaylists() {
      try {
        // Assuming you have an action to fetch playlists
        await dispatch(getPlaylists(userData._id)).unwrap();
      } catch (error) {
        console.error('Failed to fetch playlists:', error);
      }
    }
    !userPlaylists && fetchPlaylists();
  }, [])

  if (!userPlaylists?.length) return (
          <div className='flex flex-col gap-y-2 items-center justify-center pt-8'>
              <img src="https://www.gstatic.com/youtube/img/creator/no_content_illustration_v4_darkmode.svg" alt="" />
              <p className='text-gray-500'>No Content Available</p>
              <NavLink to="/user/upload-video" className='bg-white text-black px-5 py-1.5 font-bold rounded-full'>Upload Videos</NavLink>
          </div>
  )

  return (
    <div className="flex flex-col">
      {
        userPlaylists.map(playlist => (
          <PlaylistCard
            key={playlist._id}
            playlist={playlist}
        />
      ))
      }
    </div>
  )
}

export default Playlists