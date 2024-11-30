import React from 'react'
import UserVideoCard from '../../components/dashboard/UserVideoCard'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserVideos } from '../../store/asyncThunks/accountThunk'
import EditVideo from './EditVideo'

function UserVideosPage() {
    const [searchParams, setSEarchParams] = useSearchParams()
    const v_id = searchParams.get('v_id')
    const dispatch = useDispatch()
    const { userVideos } = useSelector(state => state.account)

    React.useEffect(() => {
        async function fetchVideos() {
            try {
                dispatch(getUserVideos()).unwrap()
            } catch (error) {
                console.error(error)
            }
        }
        !userVideos && fetchVideos()
    }, [v_id])

    if(v_id) return(
        <EditVideo v_id={v_id} />
    )

    return (
        <div className='flex flex-wrap content-start w-full gap-x-3 gap-y-6'>
           {userVideos?.map(video => <UserVideoCard key={video._id} video={video} />)}
        </div>
    )
}

export default UserVideosPage