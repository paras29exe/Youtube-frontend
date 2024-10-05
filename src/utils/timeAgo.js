export default function(timestamp) {
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
