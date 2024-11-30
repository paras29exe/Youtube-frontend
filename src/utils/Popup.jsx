import React from 'react';
import { Link } from 'react-router-dom';

const Popup = ({ onClose, onConfirm }) => {

    return (
            <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70">
                <div className="bg-white  p-5 rounded-lg shadow-lg">
                    <p className="text-black text-lg font-semibold">Please Login to perform this action!</p>
                    <div className="mt-6 flex justify-end">
                        <Link
                            className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-black"
                            onClick={onClose}
                        >
                            Cancel
                        </Link>
                        <Link
                            to="/auth/api/v1/login"
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                            onClick={onConfirm}
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
    );
};

export default Popup;
