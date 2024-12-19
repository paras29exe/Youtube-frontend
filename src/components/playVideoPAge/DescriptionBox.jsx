// VideoDescriptionBox.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import timeAgo from '../../utils/timeAgo';
import formatViews from '../../utils/formatViews';

const VideoDescriptionBox = ({ currentVideo, description, setDescription, editMode, setEditMode, register, setValue, errors, watch }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (descriptionRef.current) {
      setIsOverflowing(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
    }
  }, [currentVideo.description, editMode]);

  const handleToggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-black/30 p-4 rounded-md relative">
      <p className='mb-2'>
        <span className='text-gray-500'>{formatViews(currentVideo.views)} views</span>
        <span className="text-gray-500 text-sm"> • </span>
        <span className='text-gray-500'>{timeAgo(currentVideo.createdAt)}</span>
      </p>

      {editMode ? (
        <div className=' rounded-sm'>
          <input
            ref={descriptionRef}
            {...register('description', {
              value: description,
            })}
            id='desc-input'
            autoFocus={editMode}
            rows={6}
            className={`w-full p-2 border focus:outline-none rounded  bg-inherit ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter video description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
          <div className='flex justify-end gap-x-3 pr-2'>
            <button
              type="button"
              onClick={() => {
                setEditMode(false)
                setValue('description', description)
              }}
              className='px-3 py-1 cancel-changes-button bg-gray-500/20 rounded-full'
            >Cancel</button>
            <button
              type="button"
              className='px-3 py-1 save-changes-button bg-white hover:bg-white/80 text-black rounded-full'
              onClick={() => {
                const descValue = watch('description')
                setDescription(descValue)
                setValue('description', descValue)
                setEditMode(false)
              }}
            >Save</button>
          </div>
        </div>
      ) : (
        <div
          ref={descriptionRef}
          className={`mb-2 ${isExpanded ? '' : 'line-clamp-3'} max-sm:text-sm whitespace-pre-wrap `}
        >
          {description || currentVideo.description}
        </div>
      )}
      {
        isOverflowing && (
          <button
          type='button'
            className="text-blue-500 absolute right-2 bottom-0"
            onClick={handleToggleDescription}
          >
            {isExpanded ? '...see less' : '...more'}
          </button>
        )
      }
    </div >
  );
};

export default VideoDescriptionBox;