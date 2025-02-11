import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import VideoDescriptionBox from '../../components/playVideoPAge/DescriptionBox'
import { SingleComment } from '../../components'
import { toast } from 'react-toastify'
import { displayContext } from '../../context/displayContext'
import EditButton from '../../components/dashboard/EditButton'
import { useDispatch, useSelector } from 'react-redux'
import { getVideoById, updateVideoDetails, deleteVideo } from '../../store/asyncThunks/videosThunk'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getComments } from '../../store/asyncThunks/commentThunk'
import loadingSpinner from '../../assets/LoadingSpinner.svg'
import { MdArrowBack } from 'react-icons/md'
import ConfirmationPopup from '../../utils/ConfirmationPopup'

function EditVideo() {

  const { register, handleSubmit, formState: { errors }, setValue, watch, getValues, setError } = useForm()
  const { options } = useContext(displayContext)
  const [isUpdating, setIsUpdating] = useState(false)
  const [discardAllPopup, setDiscardAllPopup] = useState(false)
  const [unsavedChangesPopup, setUnsavedChangesPopup] = useState(false)
  const [deleteVideoPopup, setDeleteVideoPopup] = useState(false)

  const [searchParams] = useSearchParams();
  const v_id = searchParams.get('v_id')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { singleVideo, loading, error } = useSelector(state => state.videos)
  const { comments } = useSelector(state => state.comments)
  const { userData } = useSelector(state => state.auth)

  const [editableTitle, setEditableTitle] = useState(false)
  const [editableDescription, setEditableDescription] = useState(false)
  const [editablePublishStatus, setEditablePublishStatus] = useState(false)

// default values from the database
  const [thumbnailImg, setThumbnailImg] = useState(null);
  const [title, setTitle] = useState(null)
  const [description, setDescription] = useState(null)
  const [publishStatus, setPublishStatus] = useState(null)

  // function to handle thumbnail preview
  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setThumbnailImg(reader.result);
    reader.readAsDataURL(file);
  }

  // // function to handle the title input box height
  // const handleInputTitle = (event) => {
  //   const textarea = event?.target || document.getElementById('title-input');
  //   textarea.style.height = "auto";
  //   textarea.style.height = `${textarea.scrollHeight + 5}px`;
  // }

  // // call the input height handler on enable of input box for title
  // useEffect(() => {
  //   editableTitle && handleInputTitle()
  // }, [editableTitle])

  // set the states after the fetching from API is complete
  useEffect(() => {
    if (singleVideo) {
      setThumbnailImg(singleVideo.thumbnail || '');
      setTitle(singleVideo.title || '');
      setDescription(singleVideo.description || '');
      setPublishStatus(singleVideo.publishStatus || '');
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
      title: data.title,
      description: data.description,
      publishStatus: data.publishStatus
    };
    if (Object.keys(data).length === 0) {
      toast.dismiss()
      toast.warning(<p className='font-sans font-semibold'>No changes Provided</p>, options);
      return;
    }

    try {
      setIsUpdating(true)
      await dispatch(updateVideoDetails({ data: data, videoId: v_id })).unwrap()
      setIsUpdating(false)
      toast.success(<p className='font-sans font-semibold'>Video updated successfully</p>, options);
      navigate(-2)
    } catch (error) {
      console.error(error);
    }
  };

  if (error) navigate(-1)

  if (singleVideo) return (

    <div className='w-full h-full overflow-auto'>
      <MdArrowBack
        onClick={() => navigate(-2)}
        className="text-4xl" />

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
                  <input
                    {...register('title', {
                      value: title,
                      maxLength: {
                        value: 150,
                        message: 'Title cannot exceed 150 characters',
                      },
                    })}
                    id='title-input'
                    autoFocus={editableTitle}
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
                        setValue('title', title.trim())
                      }}
                    >Cancel</button>
                    <button
                      type="button"
                      className='px-3 py-1 save-changes-button bg-white hover:bg-white/80 text-black rounded-full'
                      onClick={() => {
                        const titleValue = watch('title').trim()
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
            <VideoDescriptionBox
              currentVideo={singleVideo}
              editMode={editableDescription}
              setEditMode={setEditableDescription}
              description={description}
              setDescription={setDescription}
              setValue={setValue}
              watch={watch}
              register={register}
              errors={errors} />
          </div>

          {/* publish status */}
          <div className="flex items-center gap-x-4">
            <div>
              <select
                {...register('publishStatus')}
                className="block w-full text-sm text-white border border-gray-600 rounded-lg px-2 py-1 bg-black disabled:bg-gray-600 disabled:cursor-not-allowed"
                defaultValue={singleVideo.publishStatus}
                autoFocus={editablePublishStatus}
                disabled={!editablePublishStatus}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            {editablePublishStatus && (
              <div className="flex gap-x-2">
                <button
                  type="button"
                  className="cancel-changes-button hidden text-sm px-3 py-1 text-gray-800 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => {
                    setValue('publishStatus', publishStatus); // Revert to original value
                    setEditablePublishStatus(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="save-changes-button text-sm px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                  onClick={() => {
                    const watchPublishStatus = watch('publishStatus');
                    setValue('publishStatus', watchPublishStatus)
                    setPublishStatus(watchPublishStatus); // Update to new value
                    setEditablePublishStatus(false);
                  }}
                >
                  Save
                </button>
              </div>
            )}
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
                    selfVideo={true}
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
                  setUnsavedChangesPopup(true)
                } else {
                  handleSubmit(submit)
                }
              }}
              className="w-full disabled:bg-gray-600 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 backdrop-blur-md py-1.5 px-3 rounded-lg max-md:text-sm"
            disabled={loading || (
              thumbnailImg === singleVideo.thumbnail
              && title === singleVideo.title
              && description === singleVideo.description
              && publishStatus === singleVideo.publishStatus
            )}
            >
              {isUpdating ? <img src={loadingSpinner} alt="" className="w-12 mx-auto -my-3" /> : "Save Changes"
              }
            </button>

            {/* if unsaved changes then popup will showup  */}
            {
              unsavedChangesPopup
              && <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white dark:bg-zinc-900 relative rounded-lg p-6 max-w-md">
                  <MdArrowBack
                    onClick={() => setUnsavedChangesPopup(false)}
                    className='absolute top-2 left-2 text-3xl' />
                  <h2 className="text-2xl font-bold text-white mb-3 mt-5">Unsaved Changes</h2>
                  <p className="text-base text-zinc-400 mb-6">You have unsaved changes. Do you want to save them or discard?</p>
                  <div className="flex justify-end">
                    <button
                      className=" text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md mr-2"
                      onClick={() => {
                        [...document.getElementsByClassName("save-changes-button")].forEach(element => element.click())
                        setUnsavedChangesPopup(false)
                        handleSubmit(submit)()
                      }}>Save
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-red-50 px-4 py-2 rounded-md"
                      onClick={() => {
                        [...document.getElementsByClassName("cancel-changes-button")].forEach(element => element.click());
                        setUnsavedChangesPopup(false)
                        handleSubmit(submit)()
                      }}
                    >
                      Don't Save
                    </button>
                  </div>
                </div>
              </div>
            }

            {/* discard all changes */}
            <button
              type="button"
              className='w-full disabled:bg-gray-700/50 disabled:cursor-not-allowed bg-red-600 hover:bg-red-700 backdrop-blur-md py-1.5 px-3 rounded-lg max-md:text-sm'
              onClick={() => setDiscardAllPopup(true)}
              disabled={loading || (
                thumbnailImg === singleVideo.thumbnail
                && title === singleVideo.title
                && description === singleVideo.description
                && publishStatus === singleVideo.publishStatus
              )}
            >
              Discard all changes
            </button>
            {
              discardAllPopup
              && <ConfirmationPopup
                cancelFunc={() => setDiscardAllPopup(false)}
                cancelText={"Cancel"}
                confirmFunc={() => {
                  setTitle(singleVideo.title)
                  setDescription(singleVideo.description)
                  setThumbnailImg(singleVideo.thumbnail)
                  setPublishStatus(singleVideo.publishStatus)
                  setEditableTitle(false)
                  setEditableDescription(false)
                  setEditablePublishStatus(false)
                  setDiscardAllPopup(false)
                  setValue('description', singleVideo.description)
                  setValue('title', singleVideo.title)
                  setValue('thumbnail', singleVideo.thumbnail)
                  setValue('publishStatus', singleVideo.publishStatus)
                }}
                confirmText={"Discard All"}
                message="Are you sure you want to discard all the changes?"
                extraInfo="This will revert all the changes that you've made."
              />
            }
          </div>

          {/* deleting video */}
          <button
            type="button"
            className='w-full mt-8 disabled:bg-gray-700/50 disabled:cursor-not-allowed bg-red-600 hover:bg-red-700 backdrop-blur-md py-1.5 px-3 rounded-lg max-md:text-sm'
            // disabled
            onClick={() => {
              setDeleteVideoPopup(true)
            }}
          >
            Delete Video
          </button>

          {
            deleteVideoPopup
            && <ConfirmationPopup
              cancelFunc={() => setDeleteVideoPopup(false)}
              cancelText={"No"}
              confirmFunc={async () => {
                await dispatch(deleteVideo(v_id))
                // show the toast 
                toast.error(<p className='font-sans font-semibold'>Video has been Removed!</p>, options);
                navigate(-2)
                setDeleteVideoPopup(false)
              }}
              loading={loading}
              confirmText={"Delete Video"}
              message="Are you sure you want to delete this video?"
            />
          }
        </div>
      </form >

    </div >

  )
}

export default EditVideo