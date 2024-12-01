import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'

function SearchBar() {

    const { handleSubmit, register, watch } = useForm()
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const valueInSearch = watch('searchValue')

    const search = async (data) => {
        navigate("/results")
        setSearchParams({ search_query: String(data.searchValue), videos: "public", "sortBy": "auto", order: "asc" })
    }

    return (
        <div className='search xl:w-2/5 md:w-1/2 m-auto flex w-1/3 h-9'>
            <form onSubmit={handleSubmit(search)} className='flex w-full'>
                <input
                    type="search"
                    name="search-bar"
                    {...register('searchValue')}
                    placeholder='Search'
                    className='w-11/12  rounded-l-full px-4 text-lg  border border-gray-600 focus-within:outline-none focus-within:border-blue-600 bg-inherit placeholder:text-gray-400
                    
                    '
                />

                <button
                    type='submit'
                    className='w-16 flex items-center justify-center bg-gray-600/40 disabled:opacity-50 rounded-r-full border border-gray-600 border-l-0'
                    disabled={!valueInSearch}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bg-transparent bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                </button>
            </form>
        </div>
    )
}

export default SearchBar