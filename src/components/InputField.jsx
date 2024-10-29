import React, { useState } from 'react';

function InputField({ label, className, type = "text", placeholder = "", register, registerAs, errors }) {
    const [hasValue, setHasValue] = useState(false);

    const handleInputChange = (e) => {
        setHasValue(e.target.value !== '');

    };

    return (
        <div className='w-full my-5'>

            <div className="relative w-full bg-inherit ">
                <input
                    id={registerAs}
                    {...register(registerAs, {
                        required: true,
                        onChange: handleInputChange
                    })}
                    placeholder={placeholder}
                    type={type}
                    className={`bg-transparent relative text-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-transparent focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md ${className}`}

                />
                {label && (
                    <label
                        htmlFor={registerAs}
                        className={`absolute left-3 top-2 text-gray-400 transition-all duration-500 ease-in-out pointer-events-none ${hasValue ? 'floating' : ''}`}
                    >
                        {label}
                    </label>
                )}
            </div>
            {errors[registerAs] && (
                <p className='-z-10 text-sm relative -bottom-2 left-1 text-red-600'>
                    {errors[registerAs].message || "*" + registerAs.toUpperCase() + " is required"}
                </p>
            )}
        </div>
    );
}

export default InputField;
