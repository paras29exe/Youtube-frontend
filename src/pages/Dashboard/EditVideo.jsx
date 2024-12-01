import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import VideoDescriptionBox from '../../components/playVideoPAge/DescriptionBox'
import { SingleComment } from '../../components'
import { toast } from 'react-toastify'
import { displayContext } from '../../context/displayContext'
import EditButton from '../../components/dashboard/EditButton'
import { useDispatch, useSelector } from 'react-redux'
import { getVideoById, updateVideoDetails } from '../../store/asyncThunks/videosThunk'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getComments } from '../../store/asyncThunks/commentThunk'
import loadingSpinner from '../../assets/LoadingSpinner.svg'
import Popup from '../../utils/Popup'

function EditVideo() {

  const { register, handleSubmit, formState: { errors }, setValue, watch, getValues, setError } = useForm()
  const { options } = useContext(displayContext)

  const [searchParams] = useSearchParams();
  const v_id = searchParams.get('v_id')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { singleVideo, loading } = useSelector(state => state.videos)
  const { comments } = useSelector(state => state.comments)
  const { userData } = useSelector(state => state.auth)

  const [editableTitle, setEditableTitle] = useState(false)
  const [editableDescription, setEditableDescription] = useState(false)
  const [editablePublishStatus, setEditablePublishStatus] = useState(false)
  const [unsavedChanges, setUnsavedChanges] = useState(false)

  const [title, setTitle] = useState(singleVideo?.title)
  const [thumbnailImg, setThumbnailImg] = useState(singleVideo?.thumbnail);
  const [publishStatus, setPublishStatus] = useState(singleVideo?.publishStatus)

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setThumbnailImg(reader.result);
    reader.readAsDataURL(file);
  }

  const handleInputTitle = (event) => {
    const textarea = event?.target || document.getElementById('title-input');
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight + 5}px`;
  }

  useEffect(() => {
    editableTitle && handleInputTitle()
  }, [editableTitle])

  useEffect(() => {
    if (singleVideo) {
      setTitle(singleVideo.title || '');
      setThumbnailImg(singleVideo.thumbnail || '');
      setPublishStatus(singleVideo.publishStatus);
    }
  }, [singleVideo])

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(getVideoById(v_id))
        await dispatch(getComments(v_id))
      } catch (error) {
      }
    }
    fetchData()
  }, [v_id])


  const submit = async (data) => {
    data = {
      ...(data.thumbnail?.[0] && { thumbnail: data.thumbnail }), // Include only if a file is uploaded
      ...(data.title && data.title?.trim() !== singleVideo.title && { title: data.title }), // Include only if the title is different
      ...(data.description && data.description?.trim() !== singleVideo.description && { description: data.description }), // Include only if the description is different
      ...(data.publishStatus && data.publishStatus !== singleVideo.publishStatus && { publishStatus: data.publishStatus }) // Include only if the status is not "public"
    };
    if (Object.keys(data).length === 0) {
      toast.dismiss()
      toast.info(<p className='font-sans font-semibold'>No changes Provided</p>, options);
      return;
    }

    try {
      await dispatch(updateVideoDetails({ data: data, videoId: v_id })).unwrap()
      toast.success(<p className='font-sans font-semibold'>Video updated successfully</p>, options);
      navigate(-1)
    } catch (error) {
      console.error(error);
    }
  };

  if (singleVideo) return (

    <div className='w-full overflow-auto'>
      <form onSubmit={handleSubmit(submit)} className='flex gap-x-3 p-3 pb-10 box-border '>
        {/* left section */}
        <div className='w-2/3 bg-red-00 flex flex-col gap-y-4 '>
          {/* thumbnail part */}
          <div
            className='thumbnail-container '

          >
            <div
              className='w-full aspect-video bg-no-repeat bg-center bg-cover rounded-sm'
              style={{ backgroundImage: `url(${thumbnailImg})` }}
            ></div>
            <input
              type="file"
              id='thumbnail-in-editVideo'
              accept='image/*'
              {...register('thumbnail', {
                onChange: handleThumbnailChange,
                validate: (value) => value?.[0] ? ((value[0].size <= 1024 * 1024 * 5) || "File must be less than 5MB") : true   // 5MB
              })}
              className='hidden'
            />
            {errors.thumbnail && <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>}

          </div>
          {/* title */}
          <div>
            {
              editableTitle ?
                <div className=' rounded-sm'>
                  <textarea
                    {...register('title', {
                      value: title,
                      maxLength: {
                        value: 150,
                        message: 'Title cannot exceed 100 characters',
                      }
                    })}
                    id='title-input'
                    autoFocus={editableTitle}
                    onInput={(e) => { handleInputTitle(e) }}
                    rows={1}
                    className={`w-full text-lg font-semibold p-2 border rounded bg-inherit focus:outline-none ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter Title"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title.message}</p>
                  )}
                  {/* save and cancel buttons  */}
                  <div className='flex justify-end gap-x-3 pr-2'>
                    <button
                      type="button"
                      className='px-3 py-1 cancel-changes-button bg-gray-500/20 rounded-full'
                      onClick={() => {
                        setEditableTitle(false)
                        setValue('title', title)
                      }}
                    >Cancel</button>
                    <button
                      type="button"
                      className='px-3 py-1 save-changes-button bg-white hover:bg-white/80 text-black rounded-full'
                      onClick={() => {
                        const titleValue = watch('title')
                        if (titleValue?.length > 150) {
                          setError('title', {
                            type: 'manual',
                            message: "Title cannot exceed 100 characters"
                          })
                        } else {
                          setTitle(titleValue)
                          setValue('title', titleValue)
                          setEditableTitle(false)
                        }
                      }}
                    >Save</button>
                  </div>
                </div>
                :
                <p className='font-semibold text-xl'>{title}</p>
            }
          </div>

          {/* description */}
          <div>
            <VideoDescriptionBox currentVideo={singleVideo} editMode={editableDescription} setEditMode={setEditableDescription} setValue={setValue} watch={watch} register={register} errors={errors} />
          </div>

          {/* publish status */}
          <div className='flex gap-x-4'>

            <div>
              <select
                {...register('publishStatus')}
                className="block text-sm text-white border border-gray-600 rounded-lg px-2 py-1 bg-black disabled:bg-gray-600 disabled:cursor-not-allowed"
                defaultValue={singleVideo.publishStatus}
                autoFocus={editablePublishStatus}
                disabled={!editablePublishStatus}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            {editablePublishStatus &&
              <div>
                <button
                  type="button"
                  className='cancel-changes-button hidden'
                  onClick={() => {
                    setValue('publishStatus', publishStatus)
                    setEditablePublishStatus(false)
                  }}
                >Cancel</button>
                <button
                  type="button"
                  className='px-3 save-changes-button bg-white hover:bg-white/80 text-black rounded-full'
                  onClick={() => {
                    const watchPublishStatus = getValues('publishStatus')
                    setValue('publishStatus', watchPublishStatus)
                    setEditablePublishStatus(false)
                  }}
                >Save
                </button>
              </div>
            }
          </div>

          {/* comments */}
          <div className='mt-8'>
            <p className='font-semibold text-xl'>Comments</p>
            <div className="w-full border"></div>
            <strong><p className='text-gray-500 text-lg mt-5'>Note: Removing comments is irreversible Action</p></strong>

            <div className='comments-list flex flex-col gap-y-1 pt-5'>
              {
                comments?.map((comment) => (
                  <SingleComment key={comment._id}
                    comment={comment}
                    videoOwnerId={singleVideo.ownerId}
                    videoOwnerChannelName={singleVideo.ownerChannelName}
                    userData={userData} 
                    selfVideo= {true}
                    />
                ))
              }
            </div>

          </div>
        </div>

        {/* right section */}
        <div className='w-1/3  flex flex-col gap-y-4 content-start items-start justify-start'>
          <div className='self-center w-full'>
            <h1 className=' text-center text-lg font-semibold'>Modify Video Details</h1>
            <div className=' border'></div>
          </div>

          <EditButton thumbnailClick={true} text="Change Thumbnail" />
          <EditButton editable={editableTitle} setEditable={setEditableTitle} text="Edit Title" />
          <EditButton editable={editableDescription} setEditable={setEditableDescription} text="Edit Description" />
          <EditButton editable={editablePublishStatus} setEditable={setEditablePublishStatus} text="Publish Status" />

          <div className='w-full flex flex-col gap-y-2 items-center'>
            {/* submit button here */}
            <button
              type="submit"
              onClick={(e) => {
                if (editableTitle || editableDescription || editablePublishStatus) {
                  e.preventDefault()
                  setUnsavedChanges(true)
                } else {
                  handleSubmit(submit)
                }
              }}
              className="w-full disabled:bg-gray-600 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 backdrop-blur-md py-1.5 px-3 rounded-lg max-md:text-sm"
              disabled={loading}
            >
              {loading ? <img src={loadingSpinner} alt="" className="w-12 mx-auto -my-3" /> : "Save Changes"
              }
            </button>

            {
              unsavedChanges && <div>
                <p className='text-gray-300'>There are some unsaved changes</p>
                <div className='flex gap-x-3 justify-center mt-2'>
                  <button
                    type="button"
                    className='px-3 py-1.5 rounded-full bg-gray-500/20'
                    onClick={() => {
                      [...document.getElementsByClassName("cancel-changes-button")].forEach(element => element.click());
                      setUnsavedChanges(false)
                      handleSubmit(submit)()
                    }}
                  >Don't Save</button>
                  <button
                    type="button"
                    className='px-3 py-1.5 rounded-full font-semibold bg-white text-black'
                    onClick={() => {
                      [...document.getElementsByClassName("save-changes-button")].forEach(element => element.click())
                      setUnsavedChanges(false)
                      handleSubmit(submit)()
                    }}
                  >Save</button>
                </div>

              </div>
            }

          </div>
          <button
            type="button"
            className='w-full disabled:bg-gray-700/50 disabled:cursor-not-allowed bg-red-600 hover:bg-red-700 backdrop-blur-md py-1.5 px-3 rounded-lg max-md:text-sm'
          // disabled
          >
            Delete Video
          </button>
        </div>
      </form >


    </div >

  )
}

export default EditVideo