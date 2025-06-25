import React, { useState } from 'react'
import UserVideoCard from '../../components/dashboard/UserVideoCard'
import { useDispatch, useSelector } from 'react-redux'
import { getUserVideos } from '../../store/asyncThunks/accountThunk'
import { NavLink } from 'react-router-dom'
import { CgSpinner } from 'react-icons/cg'
import { MdAdd } from 'react-icons/md'
import AddToPlaylistModal from '../../components/dashboard/AddToplaylistModal'

function UserVideosPage() {
    const dispatch = useDispatch()
    const { userVideos, loading } = useSelector(state => state.account)
    const [isSelectAll, setIsSelectAll] = useState(false);
    const [selectedVideos, setSelectedVideos] = useState([]);

    const [showPlaylistModal, setShowPlaylistModal] = useState(false)

    React.useEffect(() => {
        async function fetchVideos() {
            try {
                await dispatch(getUserVideos()).unwrap()
            } catch (error) {
                console.error(error)
            }
        }
        !userVideos && fetchVideos()
    }, [window.location.pathname])

    // this function will add the video id or remove if already there
    const handleSelectOne = (videoId) => {
        
        setSelectedVideos((prev) => {
            const updatedSelection = prev.includes(videoId) 
                ? prev.filter((id) => id !== videoId) 
                : [...prev, videoId];
    
            // Update `setIsSelectAll` based on the new state
            setIsSelectAll(updatedSelection.length === userVideos?.length);
            
            return updatedSelection;
        });
    };

    function handleSelectAllClick() {
        // we are adding the id of selected videos to the state and if select all is clicked we are adding all the ids to the state because this will help us to make operations like delete or add to playlist
        if (!isSelectAll) setSelectedVideos(userVideos?.map((item) => item._id))
        else setSelectedVideos([])

        setIsSelectAll(prev => !prev);
    }

    if (loading) return <CgSpinner className='animate-spin text-5xl mx-auto mt-5' />

    if (!userVideos?.length) return (
        <div className='flex flex-col gap-y-2 items-center justify-center pt-8'>
            <img src="https://www.gstatic.com/youtube/img/creator/no_content_illustration_v4_darkmode.svg" alt="" />
            <p className='text-gray-500'>No Content Available</p>
            <NavLink to="/user/upload-video" className='bg-white text-black px-5 py-1.5 font-bold rounded-full'>Upload Videos</NavLink>
        </div>
    )

    return (
        <div className='flex flex-col flex-wrap content-start w-full h-full px-4 gap-x-3 gap-y-6'>
            {/* action buttons */}
            <div className="flex items-center gap-4 ">
                <div
                    className="flex w-fit h-full gap-2 py-2 cursor-pointer select-none"
                    onClick={handleSelectAllClick}
                >
                    <input type="checkbox" name="" className='cursor-pointer' checked={isSelectAll} onChange={() => { }} />
                    <span>Select All</span>
                </div>
                {
                    // if any card is selected then only show the buttons
                    selectedVideos?.length > 0 &&
                    <div className='flex gap-x-2'>
                        <button
                        onClick={() => setShowPlaylistModal(true)}
                         className='px-3 py-1 hover:bg-gray-700/70 rounded-full text-white flex items-center justify-center gap-2'> <MdAdd className='text-lg' /> Add to Playlist</button>
                        <button className='px-3 py-1 hover:bg-gray-700/70 rounded-full text-white'>Delete</button>
                    </div>
                }

                {
                    showPlaylistModal && <AddToPlaylistModal closeModal={() => setShowPlaylistModal(false)} selectedVideos={selectedVideos}/>
                }
            </div>

            {userVideos?.map((video, index) => (
                <UserVideoCard
                    key={video._id}
                    video={video}
                    isSelected={selectedVideos.includes(video._id)}
                    setIsSelected={(videoId) => handleSelectOne(videoId)}
                />
            ))}
        </div>
    )
}

export default UserVideosPage