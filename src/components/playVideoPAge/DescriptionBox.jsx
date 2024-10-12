// VideoDescriptionBox.js
import React, { useState, useEffect, useRef } from 'react';
import timeAgo from '../../utils/timeAgo';

const VideoDescriptionBox = ({ currentVideo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (descriptionRef.current) {
      setIsOverflowing(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
    }
  }, [currentVideo.description]);

  const handleToggleDescription = () => {
    setIsExpanded(!isExpanded);
  };


  return (
    <div className="bg-gray-600/40 p-4 rounded-lg">
      <p >
        <span className='text-gray-400'>{currentVideo.views} views</span>
        <span className="text-gray-400 text-sm"> • </span>
        <span className='text-gray-400'>{timeAgo(currentVideo.createdAt)}</span>
      </p>
      <div className={`mb-2 ${isExpanded ? '' : 'line-clamp-3'}`} ref={descriptionRef}>
        {currentVideo.description || ""}
      </div>
      {isOverflowing && (
        <button
         className="text-blue-500"
         onClick={handleToggleDescription}
        >
          {isExpanded ? '...collapse' : '...more'}
        </button>
      )}
    </div>
  );
};

export default VideoDescriptionBox;