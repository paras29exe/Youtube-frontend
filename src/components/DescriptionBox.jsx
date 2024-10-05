// VideoDescriptionBox.js
import React, { useState, useEffect, useRef } from 'react';

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

  const timeAgo = (timestamp) => {
    const now = new Date();
    const uploadDate = new Date(timestamp);
    const seconds = Math.floor((now - uploadDate) / 1000);

    let interval = Math.floor(seconds / 31536000); // 1 year = 31536000 seconds
    if (interval == 1) return `${interval} year ago`;
    if (interval > 1) return `${interval} years ago`;

    interval = Math.floor(seconds / 2592000); // 1 month = 2592000 seconds
    if (interval == 1) return `${interval} month ago`;
    if (interval > 1) return `${interval} months ago`;

    interval = Math.floor(seconds / 86400); // 1 day = 86400 seconds
    if (interval == 1) return `${interval} day ago`;
    if (interval > 1) return `${interval} days ago`;

    interval = Math.floor(seconds / 3600); // 1 hour = 3600 seconds
    if (interval == 1) return `${interval} hour ago`;
    if (interval > 1) return `${interval} hours ago`;

    interval = Math.floor(seconds / 60); // 1 minute = 60 seconds
    if (interval == 1) return `${interval} minute ago`;
    if (interval > 1) return `${interval} minutes ago`;

    return `${seconds} seconds ago`;
};

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
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