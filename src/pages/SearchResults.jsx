import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchVideos } from '../store/asyncThunks/videosThunk'
import { useSearchParams } from 'react-router-dom'
import SearchedVideoCard from '../components/SearchedVideoCard'
import { CgSpinner } from 'react-icons/cg'

function SearchResults() {
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const { searchedVideos } = useSelector(state => state.videos)
    const [ loading, setLoading] = useState(false)

    React.useEffect(() => {
        setLoading(true)
        async function fetchSearchedVideos() {
            const query = {
                query: searchParams.get('search_query'),
                sortBy: searchParams.get('sortBy'),
                order: searchParams.get('order'),
                page: searchParams.get('page'),
                limit: searchParams.get('limit'),
            }

            await dispatch(searchVideos(query))
            setLoading(false)
        }
        setTimeout(() => {
            fetchSearchedVideos()
        }, 1500);
    }, [searchParams.get("search_query")])

    if(loading) return <CgSpinner className='animate-spin text-5xl mx-auto mt-5' />
    if (!searchedVideos?.length) return <p className='text-center w-full mt-12 text-2xl text-gray-400'>No videos found</p>

    if (searchedVideos) return (
        <div className='w-full overflow-y-auto flex flex-col gap-y-4 md:px-1 pb-16 md2:px-10'>
            {
                searchedVideos.map((video, index) => (
                    <SearchedVideoCard key={index} video={video} />
                ))
            }
        </div>
    )
}

export default SearchResults