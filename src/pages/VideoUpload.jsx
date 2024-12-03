import React, { useState, useRef, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { uploadVideo } from '../store/asyncThunks/videosThunk';
import { useDispatch, useSelector } from 'react-redux';
import { displayContext } from '../context/displayContext';
import Lottie from 'lottie-react';
import uploadingAnimation from '../assets/uploading.json'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BiVideo, BiImageAdd } from 'react-icons/bi';

const VideoUpload = () => {
    const { register, handleSubmit, watch, formState: { errors }, setValue, setError, clearErrors, reset } = useForm();
    const [thumbnailPreview, setThumbnailPreview] = useState(null)
    const { options } = useContext(displayContext)
    const { uploadProgress, uploading } = useSelector(state => state.videos)

    // filename for thumbnail and video states
    const [thumbnailFilename, setThumbnailFilename] = useState('')
    const [videoFilename, setVideoFilename] = useState('')

    const thumbnailInputRef = useRef(null)
    const watchedTitle = watch('title', 'Video Title');

    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        const res = await dispatch(uploadVideo(data))

        if (res.error) {
            toast.error(<p className=' font-sans font-semibold'>Video uploading failed. Try again</p>, options)
            setError(res.error.name, {
                type: 'manual',
                message: res.error.message
            })
            throw res.error;
        } else {
            toast.success(<p className='font-sans font-semibold'>Video has been published</p>, options)
            reset()
            setThumbnailPreview(null)
        }
    };

    const handleThumbnailChange = (event) => {
        const file = event.target.files[0];
        if (file && file.size > 1024 * 1024 * 5.1) {
            setError("thumbnail", {
                type: "manual",
                message: "Thumbnail file size must be less than or equal to 5MB",
            });
        } else {
            clearErrors("thumbnail"); // Clear any existing errors when valid
            setThumbnailPreview(URL.createObjectURL(file))
            setThumbnailFilename(file.name);
        }
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 1024 * 1024 * 30.1) {
            setError("video", {
                type: "manual",
                message: "Video file size must be less than or equal to 30MB",
            });
        } else {
            clearErrors("video");
            setVideoFilename(file.name) // Clear any existing errors when valid
        }
    }

    const removePreview = () => {
        setThumbnailPreview(null);
        setThumbnailFilename(null)
        setValue("thumbnail", null);
    };

    return (
        <div className='w-full'>
            <h1 className=' text-center text-5xl font-serif font-bold mb-4'>Upload Video</h1>
            <div className="w-full h-full mx-auto overflow-auto flex items-center gap-x-10 text-white flex-col-reverse lg:flex-row p-5 lg:py-20 lg:px-32">
                {/* left section or details section */}
                <div className="w-full lg:w-1/2 max-lg:mt-24 lg:pt-6">
                    {/* <h2 className="text-3xl font-bold mb-4 text-center">Upload Video</h2> */}
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
                        {/* video Input */}
                        <div className="select-none flex items-center gap-x-5">
                            <div>
                                <label className="block text-sm font-medium text-blue-500 mb-1">Video</label>
                                <div
                                    onClick={() => document.getElementById('video-input').click()}
                                    className='w-24 aspect-square border border-dashed flex flex-col items-center justify-center'
                                >
                                    {
                                        videoFilename ? <p className='text-xs text-center w-full break-words hypens-auto p-1 line-clamp-3'> FileName: <br /> {videoFilename}</p>
                                            : <div className='flex gap-y-2 items-center justify-center flex-col '>
                                                <BiVideo className='text-xl' />
                                                <p className='text-xs text-nowrap'>Upload Video</p>
                                            </div>
                                    }
                                </div>
                                <input
                                    type="file"
                                    accept="video/*"
                                    id='video-input'
                                    className=" hidden w-full text-sm text-white border border-zinc-600 rounded-lg cursor-pointer bg-zinc-700 focus:outline-none"
                                    {...register("videoFile", {
                                        required: "Video is required",
                                        onChange: handleVideoChange,
                                        validate: {
                                            size: (file) =>
                                                file && file[0]?.size <= 1024 * 1024 * 100.1 || "Video file size must be less than or equal to 30MB", // 30MB size limit
                                        },
                                    })}
                                />
                                {errors.video && <p className="text-red-500 text-sm">{errors.video.message}</p>}
                            </div>
                            <p className='*:text-zinc-500 text-zinc-500 mt-4 *:text-sm text-sm'> <strong>Recommended resolution:</strong> 1920x1080. <br /> <strong>Accepted formats:</strong> MP4, WebM, MKV. <br /> Size must be less that 100MB </p>
                        </div>
                        {/* thumbnail input */}
                        <div className="select-none flex items-center gap-x-5">
                            <div>
                                <label className="block text-sm font-medium text-blue-500 mb-1">Thumbnail</label>
                                <div
                                    onClick={() => document.getElementById('thumbnail-input').click()}
                                    className='w-24 aspect-square border border-dashed flex flex-col items-center justify-center'
                                >
                                    {
                                        thumbnailFilename ? <p className='text-xs text-center w-full break-words hyphens-auto p-1 line-clamp-3'> FileName: <br /> {thumbnailFilename}</p>
                                            : <div className='flex gap-y-2 items-center justify-center flex-col'>
                                                <BiImageAdd className='text-xl' />
                                                <p className='text-xs text-nowrap'>Thumbnail</p>
                                            </div>
                                    }
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id='thumbnail-input'
                                    ref={thumbnailInputRef}
                                    className="hidden w-full text-sm text-white border border-zinc-600 rounded-lg cursor-pointer bg-zinc-700 focus:outline-none"
                                    {...register("thumbnail", {
                                        required: 'Thumbnail is required',
                                        onChange: handleThumbnailChange,
                                        validate: {
                                            size: (file) =>
                                                file && file[0].size <= 1024 * 1024 * 5.1 || "Thumbnail file size must be less than or equal to 5MB", // 5MB file size limit
                                        }
                                    })}
                                />
                                {errors.thumbnail && <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>}

                            </div>
                            <p className='*:text-zinc-500 text-zinc-500 mt-4 *:text-sm text-sm'> <strong>Recommended Dimensions:</strong> 1280x720 (16:9 aspect ratio)<br /> <strong>Accepted formats:</strong> JPG, JPEG, PNG <br /> Size must be less that 5MB </p>
                        </div>
                        {/* title input */}
                        <div >
                            <label className="block text-sm font-medium text-blue-500 mb-1">Title</label>
                            <input
                                type="text"
                                {...register('title', { required: 'Title is required' })}
                                className="block w-full text-sm text-white border border-zinc-600 rounded-lg p-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter video title"
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                        </div>
                        {/* description input */}
                        <div >
                            <label className="block text-sm font-medium text-blue-500 mb-1">Description</label>
                            <textarea
                                {...register('description', {
                                    maxLength: { value: 5000, message: 'Description cannot exceed 5000 characters' }
                                })}
                                className="block w-full text-sm text-white border border-zinc-600 rounded-lg p-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter video description"
                                rows="5"
                            />
                        </div>
                        {/* publish status */}
                        <div>
                            <label className="block text-sm font-medium text-blue-500 mb-1">Publish Status</label>
                            <select
                                {...register('publishStatus', {
                                    value: 'public',
                                })}
                                className="block w-full text-sm text-white border border-zinc-600 rounded-lg p-2 bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                style={{ backgroundColor: 'transparent' }} // Set a fixed background color
                            >
                                <option value="public" style={{ backgroundColor: '#1f2937', color: 'white' }}>
                                    Public
                                </option>
                                <option value="private" style={{ backgroundColor: '#1f2937', color: 'white' }}>
                                    Private
                                </option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={uploading}
                            className="disabled:bg-zinc-600 w-full bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >Publish Now</button>

                    </form>
                </div>
                {/* right section or preview */}
                <div className="w-full h-full md:w-1/2 flex justify-center">
                    <div className='relative w-full lg:fixed lg:w-1/3 flex flex-col items-center justify-center'>
                        <div className="relative w-full bg-zinc-800/40 rounded-md pb-4">
                            <div className='relative aspect-video w-full rounded-md border border-zinc-500'>

                                {
                                    thumbnailPreview
                                        ? <>
                                            <img
                                                src={thumbnailPreview}
                                                alt="Thumbnail Preview"
                                                className="w-full aspect-video object-cover rounded-md"
                                            />
                                            <div className="absolute bottom-2 right-3 rounded-sm bg-black/75 px-1.5 py-0.5 font-semibold text-xs ">
                                                20:50
                                            </div>
                                            <button
                                                onClick={removePreview}
                                                className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
                                            >
                                                <FaTimes />
                                            </button>
                                        </>
                                        :
                                        <p className="text-zinc-400 text-center">No preview available</p>
                                }


                            </div>
                            <div className="mt-2">
                                <h3 className="text-lg font-bold m-2">{watchedTitle || "Title goes here"}</h3>
                                <div className="flex items-center">
                                    <img
                                        src="https://via.placeholder.com/48"
                                        alt="Channel Avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span className="ml-2 text-sm text-zinc-400">Channel Name</span>
                                </div>
                                <div className="ml-10">
                                    <span className="text-sm text-zinc-400">0 likes</span>
                                    <span className='text-zinc-400'> • </span>
                                    <span className="text-sm text-zinc-400">0 comments</span>
                                </div>
                            </div>
                        </div>
                        {
                            !uploading && <div className='absolute -bottom-16 w-5/6'>
                                <div className=' progress-bar flex gap-2 items-center'>
                                    <Lottie
                                        animationData={uploadingAnimation}
                                        loop
                                        className='h-12 aspect-square align-center -m-2'
                                    />
                                    <div className="w-full bg-zinc-200 h-1 rounded-lg">
                                        <div
                                            className=" bg-green-500 h-full rounded-lg transition-all duration-300 "
                                            style={{ width: `${uploadProgress}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-md font-medium text-white text-center">{uploadProgress}%</p>
                                </div>
                                <p className='text-center text-xs w-full'>
                                    Uploading is in progress, <Link to="/" className='text-blue-600'>go back to home page</Link>
                                </p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoUpload;