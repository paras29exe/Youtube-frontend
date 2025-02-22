import React, { useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import formatViews from '../../utils/formatViews'
import { FaBell } from 'react-icons/fa';
import { BiDislike, BiDownload, BiLike, BiShare } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoById } from '../../store/asyncThunks/videosThunk';
import { useNavigate, useSearchParams } from 'react-router-dom';
import timeAgo from '../../utils/timeAgo';
import { MdArrowBack } from 'react-icons/md';

function PlayUserVideo() {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [isOverflowing, setIsOverflowing] = React.useState(false);
    const descriptionRef = useRef()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const v_id = searchParams.get('v_id')

    const { singleVideo } = useSelector(state => state.videos)
    const { stats } = useSelector(state => state.account)
    const { userData } = useSelector(state => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        if (descriptionRef.current) {
            setIsOverflowing(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
        }
    }, []);

    const handleToggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        dispatch(getVideoById(v_id)).then(
            (res) => console.log(res)
        )
    }, [])


    if (singleVideo) return (
        <div className='w-full overflow-auto'>
            <MdArrowBack
                onClick={() => navigate(-1)}
                className="text-4xl"
                 />

            <div className='lg:w-3/5 w-full lg:px-12 py-4 pb-20 flex flex-col gap-y-1.5'>
                {/* video player */}
                <div className='w-full aspect-video'>
                    <ReactPlayer
                        url={singleVideo.videoFile}
                        width='100%'
                        height='100%'
                        controls={true}
                        playing={true}
                    />
                </div>
                <div className='px-4 flex flex-col gap-y-4'>

                    {/* video title */}
                    <div>
                        <p className='text-lg line-clamp-3'>{singleVideo.title}</p>
                    </div>

                    {/* action buttons */}
                    <div className='overflow-x-auto'>
                        <div className='flex justify-between cursor-not-allowed min-w-[500Px] select-none'>
                            <div className='flex gap-x-3 items-center '>
                                <img src="/favico.png" alt="avatar" className='w-10 aspect-square rounded-full object-cover' />
                                <div>
                                    <p className='text-base'>{userData?.user?.fullName}</p>
                                    <p className='text-xs text-gray-400 -mt-1'>{stats.totalSubscribers} subscribers</p>
                                </div>
                                <div className='px-3 py-1 bg-white text-black font-semibold rounded-full flex items-center gap-x-1 text-sm'> Subscribe <FaBell className='fill-black' /> </div>
                            </div>
                            <div className='flex gap-x-5 items-center'>
                                <div className='px-5 py-2 rounded-full bg-gray-800/50 flex gap-x-3'>
                                    <button type="button" className='border-r pr-3 cursor-not-allowed'>
                                        <BiLike />
                                    </button>
                                    <button type="button" className='cursor-not-allowed'>
                                        <BiDislike />
                                    </button>
                                </div>
                                <BiShare className='text-xl' />
                                <BiDownload className='text-xl' />
                            </div>
                        </div>
                    </div>

                    {/* description box */}
                    <div className='bg-black/30 p-5 pt-12 rounded-md relative'>
                        <div className='absolute top-0 left-0 p-4 text-sm *:text-gray-500'>
                            <span>{formatViews(singleVideo.views)} views</span>
                            <span className='mx-2'>•</span>
                            <span>Uploaded: {timeAgo(singleVideo.createdAt)}</span>
                        </div>
                        {/* <div className='absolute top-0 right-0 p-4 text-sm *:text-gray-500'>
                            <span>Likes: 123</span>
                            <span className='mx-2'>Comments: {singleVideo.comments?.length}</span>
                            <span>Share: 78</span>
                        </div> */}
                        {/* description text */}
                        <p
                            ref={descriptionRef}
                            className={`mb-2 ${isExpanded ? '' : 'line-clamp-3'} whitespace-pre-wrap text-justify`}
                        >
                            {singleVideo.description}
                        </p>
                        {
                            isOverflowing && (
                                <button
                                    className="text-blue-500 absolute right-2 bottom-1"
                                    onClick={handleToggleDescription}
                                >
                                    {isExpanded ? '...see less' : '...more'}
                                </button>
                            )
                        }

                    </div>
                </div>

            </div>
        </div>
    )
}

export default PlayUserVideo