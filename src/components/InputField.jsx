import React, { useState } from 'react';
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa'; 
function InputField({
    label,
    className,
    type = "text",
    placeholder = "",
    register, registerAs,
    errors, setShowPassword,
    showPassword,
}) {
    const [hasValue, setHasValue] = useState(false);

    const handleInputChange = (e) => {
        setHasValue(e.target.value !== '');
    };

    return (
        <div className='w-full my-5'>

            <div className="relative w-full bg-inherit ">
                {label && (
                    <label
                        htmlFor={registerAs}
                        className={`select-none absolute left-3 top-2 text-gray-400 transition-all duration-500 ease-in-out pointer-events-none ${hasValue ? 'floating' : ''}`}
                    >
                        {label}
                    </label>
                )}
                <input
                    id={registerAs}
                    {...register(registerAs, {
                        required: true,
                        onChange: handleInputChange,

                    })}
                    placeholder={placeholder}
                    type={type}
                    className={`bg-transparent relative text-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-transparent focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md ${className}`}
                    autoComplete = {registerAs === 'password' ? "off" : "on"}
                />
                {
                    registerAs === "password" && (
                        <div
                            className="absolute inset-y-1/4 right-1 bottom-2 pr-3 flex items-center cursor-pointer"  // Ensure z-index is high
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {!showPassword ? <FaEyeSlash className=" text-black text-xl" /> : <FaEye className=" text-black text-xl" />}
                        </div>
                    )
                }
            </div>
            {errors[registerAs] && (
                <p className=' text-sm relative -bottom-1 left-1 text-red-600'>
                    {errors[registerAs].message || "*" + registerAs.toUpperCase() + " is required"}
                </p>
            )}
        </div>
    );
}

export default InputField;
