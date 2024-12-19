import React, { useState } from 'react';
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
function InputField({
    label,
    floatingLabel,
    className,
    defaultValue,
    fieldInfo,
    type = "text",
    required = true,
    accept,
    placeholder = "",
    register, registerAs,
    errors, setShowPassword,
    showPassword,
}) {
    const [value, setValue] = useState(defaultValue);

    return (
        <div className={`w-full ${floatingLabel ? "mt-6" : "mt-2"}`}>
            <div className="relative w-full bg-inherit">
                {floatingLabel ? (
                    <label
                        htmlFor={registerAs}
                        className={`select-none absolute left-3 top-2 text-zinc-500 transition-all duration-500 ease-in-out pointer-events-none ${value ? 'floating' : ''}`}
                    >
                        {floatingLabel}
                    </label>
                ) : label ? (
                    <label htmlFor={registerAs} className="text-blue-600 select-none">
                        {label}
                    </label>
                ) : (
                    ""
                )}
                <input
                    id={registerAs}
                    {...register(registerAs, {
                        required: required,
                        onChange: (e) => setValue((e.target.value).toString().trim()),
                        value: defaultValue,
                    })}
                    placeholder={placeholder}
                    type={type}
                    accept={accept}
                    className={`relative text-white block w-full px-3 py-2 bg-transparent border-2 border-zinc-500 rounded-md shadow-sm focus:outline-none sm:text-md ${value && "!border-blue-500"} ${className}`}
                    autoComplete={registerAs === 'password' ? "off" : "on"}
                />
                <p className="text-sm text-zinc-500 my-0.5">{fieldInfo}</p>

                {registerAs === "password" && (
                    <div
                        className="absolute inset-y-0 right-2 flex items-center z-10 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {!showPassword ? (
                            <FaEyeSlash className="text-black text-xl" />
                        ) : (
                            <FaEye className="text-black text-xl" />
                        )}
                    </div>
                )}
            </div>
            {errors[registerAs] && (
                <p className="text-sm relative bottom-0 left-1 text-red-600 font-semibold">
                    {errors[registerAs].message || "*" + registerAs.toUpperCase() + " is required"}
                </p>
            )}
        </div>

    );
}

export default InputField;
