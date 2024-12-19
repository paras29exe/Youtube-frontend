import React, { useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

const ConfirmationPopup = ({
    cancelText,
    cancelFunc,
    confirmText,
    confirmFunc,
    message,
    extraInfo = "This action cannot be undone.",
    loading,
    ...props
}) => {

    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        setShowPopup(true); // Trigger the popup to show with animation when component mounts
    }, []);

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 transition-all ${showPopup ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div
                className={`bg-white dark:bg-zinc-900 rounded-lg p-6 max-w-sm flex flex-col transform transition-all duration-200 ${showPopup ? 'translate-y-0' : 'translate-y-64'}`}
            >
                <h2 id="popup-title" className={`text-lg font-bold ${props.className}`}>{message}</h2>
                <div id="popup-description" className="text-sm text-zinc-500 mt-2">{extraInfo}</div>
                <div className="mt-4 flex justify-end">
                    <button
                        type='button'
                        onClick={cancelFunc}
                        className="bg-zinc-500 text-white hover:bg-zinc-700 px-3 py-1.5 rounded-md mr-2 transition-colors duration-200"
                    >
                        {cancelText}
                    </button>
                    <button
                        type='button'
                        onClick={confirmFunc}
                        className="bg-blue-600 text-white hover:bg-blue-800 px-3 py-1.5 rounded-md transition-colors duration-200"
                    >
                        {loading ? <CgSpinner className='animate-spin text-3xl mx-auto' /> : confirmText }
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationPopup;
