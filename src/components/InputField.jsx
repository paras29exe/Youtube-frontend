import React, { useState } from 'react';

function InputField({ label, className, type = "text", placeholder = "", register, registerAs, errors }) {
    const [hasValue, setHasValue] = useState(false);

    const handleInputChange = (e) => {
        setHasValue(e.target.value !== '');
    };

    return (
        <div className="relative w-full bg-inherit my-3">
            <input
                id={registerAs}
                {...register(registerAs, { required: true })}
                placeholder={placeholder}
                type={type}
                className={`text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-transparent focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md ${className}`}
                onChange={handleInputChange}
            />
            {label && (
                <label
                    htmlFor={registerAs}
                    className={`absolute left-3 top-2 text-gray-400 transition-all duration-500 ease-in-out pointer-events-none ${hasValue ? 'floating' : ''}`}
                >
                    {label}
                </label>
            )}
            {errors[registerAs] && (
                <p className='text-sm text-red-600'>
                    {label || registerAs} is required
                </p>
            )}
        </div>
    );
}

export default InputField;
