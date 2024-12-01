import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchVideos } from '../store/asyncThunks/videosThunk'
import { useSearchParams } from 'react-router-dom'
import SearchedVideoCard from '../components/SearchedVideoCard'
import { PulseLoader  } from 'react-spinners'

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
            console.log(query);

            await dispatch(searchVideos(query))
            setLoading(false)
        }
        setTimeout(() => {
            fetchSearchedVideos()
        }, 2000);
    }, [searchParams.get("search_query")])

    if(loading) return <div className="w-8 h-8 mx-auto mt-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

    if (searchedVideos) return (
        <div className='w-full px-1 md2:px-10'>
            {
                searchedVideos.map((video, index) => (
                    <SearchedVideoCard key={index} video={video} />
                ))
            }
        </div>
    )
}

export default SearchResults