import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { FaPlus, FaTimes } from 'react-icons/fa';
import Cookies from 'js-cookie';
import InputField from './InputField';
import { useDispatch } from 'react-redux'
import { signup } from '../store/ayncThunks/authThunk';

function Signup() {
    const { handleSubmit, register, formState: { errors }, setValue } = useForm();
    const [avatarFile, setAvatarFile] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const dispatch = useDispatch();

    const submit = (data) => {
        try {
            dispatch(signup(data))
                .then(res => {
                    console.log(res.payload)
                    Cookies.set("accessToken", res.payload.data.accessToken, { expires: 7 }); // Cookie expires in 7 days
                    Cookies.set("refreshToken", res.payload.data.refreshToken, { expires: 7 }); // Cookie expires in 7 days
                })
        } catch (error) {
            console.error('Error:', error);
        }
        // console.log(data);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(URL.createObjectURL(file));
        }
    };

    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImage(URL.createObjectURL(file));
        }
    };

    const removeAvatar = () => {
        setAvatarFile(null);
        setValue('avatar', null);
    };

    const removeCoverImage = () => {
        setCoverImage(null);
        setValue('coverImag', null);
    };

    return (

        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-10'>
            <form onSubmit={handleSubmit(submit)} className='bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full'>
                <h2 className='text-2xl font-bold mb-6 text-center text-black font-sans'>Create New Account</h2>

                <div className='relative mb-6'>
                    <div
                        className={`h-48 bg-gray-300 rounded-t-lg cursor-pointer relative flex items-center justify-center ${coverImage ? "border-4 border-blue-400" : ""}`}
                        style={{ backgroundImage: `url(${coverImage})`, backgroundSize: 'cover' }}
                        onClick={() => document.getElementById('coverImageInput').click()}
                    >
                        {!coverImage && <FaPlus className='text-white text-4xl' />}
                        {coverImage && <FaTimes className='absolute top-2 right-2 bg-red-500 rounded-full text-xl cursor-pointer' onClick={(e) => { e.stopPropagation(); removeCoverImage(); }} />}
                        <input
                            type='file'
                            accept='image/*'
                            id='coverImageInput'
                            style={{ display: 'none' }}
                            {...register('coverImage', {
                                onChange: handleCoverImageChange
                            })}
                        />
                    </div>

                    <div
                        className='absolute -bottom-8 left-8 cursor-pointer'
                        onClick={() => document.getElementById('avatarInput').click()}
                    >
                        <div
                            className={`w-24 h-24 bg-gray-300 rounded-full border-4  flex items-center justify-center ${avatarFile ? "border-4 border-green-400" : ""}`}
                            style={{ backgroundImage: `url(${avatarFile})`, backgroundSize: 'cover' }}
                        >
                            {!avatarFile && <FaPlus className='text-white text-2xl' />}
                            {avatarFile && <FaTimes className='absolute top-1 right-2 bg-red-500 rounded-full text-xl cursor-pointer' onClick={(e) => { e.stopPropagation(); removeAvatar(); }} />}
                        </div>
                        <input
                            type="file"
                            accept='image/*'
                            id='avatarInput'
                            style={{ display: 'none' }}
                            {...register("avatar", {
                                required: "Avatar is required",
                                onChange: handleAvatarChange
                            })}
                        // onChange={handleAvatarChange}
                        />
                        {errors.avatar && (
                            <p className='text-sm text-red-600'>
                                Avatar is required
                            </p>
                        )}
                    </div>
                </div>

                <div className='mt-12 flex flex-col'>
                    <div className='flex gap-x-4 grow'>
                        <InputField
                            type='text'
                            label='Fullname'
                            register={register}
                            registerAs="fullName"
                            errors={errors}
                            className='p-2 border border-gray-300 rounded-lg w-full'
                        />
                        <InputField
                            type='text'
                            label='Username'
                            register={register}
                            registerAs="username"
                            errors={errors}
                            className='p-2 border border-gray-300 rounded-lg w-full'
                        />
                    </div>
                    <InputField
                        type='email'
                        label='Email'
                        register={register}
                        registerAs="email"
                        errors={errors}
                        className='p-2 border border-gray-300 rounded-lg w-full'
                    />
                    <InputField
                        type='password'
                        label='Password'
                        register={register}
                        registerAs="password"
                        errors={errors}
                        className='p-2 border border-gray-300 rounded-lg w-full'
                    />

                    <div className='flex justify-end mb-4'>
                        <p className='text-gray-600'>Already registered? <NavLink to="/login" className='text-blue-500 hover:underline'>Login</NavLink></p>
                    </div>
                    <button type='submit' className='mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200'>
                        Signup
                    </button>
                </div>
            </form>
        </div>
    );

}
export default Signup;

// import React from 'react';
// import { useForm } from 'react-hook-form';

// function Signup() {
//     const { register, handleSubmit, setValue } = useForm();

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             // Manually update the form's state with the selected file
//             register('file', file);
//         }
//     };

//     const onSubmit = (data) => {
//         console.log(data);
//         // Now data.file contains the file object
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <input
//                 type="file"
//                 {...register('file', { required: true })}
//                 onChange={handleFileChange} // Handle file change outside of register
//             />
//             <button type="submit">Upload</button>
//         </form>
//     );
// }

// export default Signup;
