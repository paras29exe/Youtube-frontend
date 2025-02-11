import React, { useState } from 'react'
import UserVideoCard from '../../components/dashboard/UserVideoCard'
import { useDispatch, useSelector } from 'react-redux'
import { getUserVideos } from '../../store/asyncThunks/accountThunk'
import { NavLink } from 'react-router-dom'
import { CgSpinner } from 'react-icons/cg'

function UserVideosPage() {
    const dispatch = useDispatch()
    const { userVideos, loading } = useSelector(state => state.account)
    const [isChecked, setIsChecked] = useState(false);


    React.useEffect(() => {
        async function fetchVideos() {
            try {
                await dispatch(getUserVideos()).unwrap()
            } catch (error) {
                console.error(error)
            }
        }
        !userVideos && fetchVideos()
    }, [window.location.pathname, userVideos])

    function handleSelectAllClick() {
        setIsChecked(!isChecked);

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
            <div
                className="flex w-fit h-full gap-2 cursor-pointer select-none"
                onClick={handleSelectAllClick}
            >
                <input type="checkbox" name="" className=' cursor-pointer' defaultChecked={isChecked} onClick={() => {}}/>
                <span>Select All</span>
            </div>
            {userVideos?.map(video => <UserVideoCard key={video._id} video={video} selectAll={isChecked} changeSelectAll={setIsChecked} />)}
        </div>
    )
}

export default UserVideosPage