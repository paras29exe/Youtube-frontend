import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { FaPlus, FaTimes } from 'react-icons/fa';
import Cookies from 'js-cookie';
import InputField from './InputField';
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../store/ayncThunks/authThunk';

function Signup() {
    const { handleSubmit, register, formState: { errors }, setValue } = useForm();
    const [avatarFile, setAvatarFile] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth)

    const submit = async (data) => {
        const res = await dispatch(signup(data));

        if (res.error) {
            throw res.error

        } else {
            console.log(res.payload)
            Cookies.set("accessToken", res.payload.data.accessToken, { expires: 7 }); // Cookie expires in 7 days
            Cookies.set("refreshToken", res.payload.data.refreshToken, { expires: 7 }); // Cookie expires in 7 days
        }
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

        <div className='w-full'>
            <form onSubmit={handleSubmit(submit)} className='w-4/6 mx-auto p-8 rounded-lg shadow-lg h-full overflow-auto'>
                <h2 className='text-2xl font-bold mb-2 text-left font-sans'>Create New Account</h2>

                <div className='relative mb-12'>
                    <div
                        className={`h-40 bg-gray-300 rounded-t-lg cursor-pointer relative flex items-center justify-center w-full ${coverImage ? "border-4 border-blue-400" : ""}`}
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
                            className='form'
                            {...register('coverImage', {
                                onChange: handleCoverImageChange
                            })}
                        />
                    </div>

                    <div
                        className='absolute -bottom-10 left-8 cursor-pointer'
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
                            className='form'
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

                <div className=' flex flex-col'>
                    <div className='flex gap-x-4 grow'>
                        <InputField
                            type='text'
                            label='Fullname'
                            register={register}
                            registerAs="fullName"
                            errors={errors}
                            className='form p-2 border border-gray-300 rounded-lg w-full '
                        />
                        <InputField
                            type='text'
                            label='Username'
                            register={register}
                            registerAs="username"
                            errors={errors}
                            className='form p-2 border border-gray-300 rounded-lg w-full'
                        />
                    </div>
                    <InputField
                        type='email'
                        label='Email'
                        register={register}
                        registerAs="email"
                        errors={errors}
                        className='form p-2 border border-gray-300 rounded-lg w-full'
                    />
                    <InputField
                        type='password'
                        label='Password'
                        register={register}
                        registerAs="password"
                        errors={errors}
                        className='form p-2 border border-gray-300 rounded-lg w-full'
                    />

                    <div className='text-right mb-4'>
                        <p className='text-gray-400'>Already registered? <NavLink to="/auth/api/v1/login" className='text-blue-500 hover:underline'>Login here</NavLink></p>
                    </div>
                    {
                        loading ?
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto' }} width="40px" height="40px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                <circle cx="50" cy="50" fill="none" stroke="#fff" strokeWidth="8" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
                                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1" />
                                </circle>
                            </svg> 
                            :
                            <button type='submit' className=' w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200'>
                                Signup
                            </button>
                    }
                </div>
            </form>
        </div>
    );

}
export default Signup;