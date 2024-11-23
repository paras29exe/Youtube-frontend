import React, { useState, useRef, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { uploadVideo } from '../store/asyncThunks/videosThunk';
import { useDispatch, useSelector } from 'react-redux';
import { displayContext } from '../context/displayContext';
import Lottie from 'lottie-react';
import uploadingAnimation from '../assets/uploading.json'
import { Link } from 'react-router-dom';

const VideoUpload = () => {
    const { register, handleSubmit, watch, formState: { errors }, setValue, setError, clearErrors, reset } = useForm();
    const [thumbnailPreview, setThumbnailPreview] = useState(null)
    const { setUploadStatus } = useContext(displayContext)
    const { uploadProgress, uploading } = useSelector(state => state.videos)

    const thumbnailInputRef = useRef(null)
    const watchedTitle = watch('title', 'Video Title');

    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        const res = await dispatch(uploadVideo(data))

        if (res.error) {
            setUploadStatus("failed")
            setError(res.error.name, {
                type: 'manual',
                message: res.error.message
            })
            throw res.error;
        } else {
            reset()
            setThumbnailPreview(null)
            setUploadStatus("success")
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
            setThumbnailPreview(URL.createObjectURL(file));
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
            clearErrors("video"); // Clear any existing errors when valid
        }
    }

    const removePreview = () => {
        setThumbnailPreview(null);
        setValue("thumbnail", null);
    };

    return (
        <>
            <div className="w-full mx-auto overflow-auto flex items-center text-white flex-col lg:flex-row px-48">
                {/* left section or thumbnail preview section */}
                <div className="relative w-full h-auto md:w-1/2 flex flex-col items-center pt-8">

                    <div className="relative w-full bg-gray-800 rounded-md pb-4">
                        <div className='relative aspect-video w-full rounded-md border border-gray-500'>

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
                                    <p className="text-gray-400 text-center">No preview available</p>
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
                                <span className="ml-2 text-sm text-gray-400">Channel Name</span>
                            </div>
                            <div className="ml-10">
                                <span className="text-sm text-gray-400">0 likes</span>
                                <span className='text-gray-400'> • </span>
                                <span className="text-sm text-gray-400">0 comments</span>
                            </div>
                        </div>
                    </div>
                    {
                        uploading && <div className='absolute -bottom-16 w-5/6'>
                            <div className=' progress-bar flex gap-2 items-center'>
                                <Lottie
                                    animationData={uploadingAnimation}
                                    loop
                                    className='h-20 aspect-square align-center -m-2'
                                />
                                <div className="w-full bg-gray-200 h-1 rounded-lg">
                                    <div
                                        className=" bg-green-500 h-full rounded-lg transition-all duration-300 "
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                </div>
                                <p className="text-md font-medium text-white text-center">{uploadProgress}%</p>
                            </div>
                            <p className='text-center text-xs absolute bottom-0 left-1/2 -translate-x-1/2 w-full'>
                                Uploading is in progress, <Link to="/" className='text-blue-600'>go back to home page</Link>
                            </p>
                        </div>
                    }
                </div>
                {/* right section or video upload form */}
                <div className="w-full lg:w-1/2 p-4">
                    <h2 className="text-3xl font-bold mb-4 text-center">Upload Video</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className=''>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Video</label>
                            <input
                                type="file"
                                accept="video/*"
                                className="block w-full text-sm text-white border border-gray-600 rounded-lg cursor-pointer bg-gray-700 focus:outline-none"
                                {...register("videoFile", {
                                    required: "Video is required",
                                    onChange: handleVideoChange,
                                    validate: {
                                        size: (file) =>
                                            file && file[0]?.size <= 1024 * 1024 * 30.1 || "Video file size must be less than or equal to 30MB", // 30MB size limit
                                    },
                                })}
                            />
                            {errors.video && <p className="text-red-500 text-sm">{errors.video.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Thumbnail</label>
                            <input
                                type="file"
                                accept="image/*"
                                ref={thumbnailInputRef}
                                className="block w-full text-sm text-white border border-gray-600 rounded-lg cursor-pointer bg-gray-700 focus:outline-none"
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
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                            <input
                                type="text"
                                {...register('title', { required: 'Title is required' })}
                                className="block w-full text-sm text-white border border-gray-600 rounded-lg p-2 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter video title"
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                            <textarea
                                {...register('description')}
                                className="block w-full text-sm text-white border border-gray-600 rounded-lg p-2 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter video description"
                                rows="4"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Publish Status</label>
                            <select
                                {...register('publishStatus', {
                                    defaultValue: 'public'
                                })}
                                className="block w-full text-sm text-white border border-gray-600 rounded-lg p-2 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={uploading}
                            className="disabled:bg-gray-600 w-full bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >Publish Now</button>

                    </form>
                </div>
            </div>
        </>
    );
};

export default VideoUpload;