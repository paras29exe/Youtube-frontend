import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaPlus, FaTimes } from 'react-icons/fa';
import InputField from '../components/InputField';
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../store/asyncThunks/authThunk';
import Lottie from 'lottie-react';
import scanningAnimation from '../assets/scanning.json'

function Signup() {
    const { handleSubmit, register, formState: { errors }, setValue, setError } = useForm();
    const [avatarFile, setAvatarFile] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [showAnimation, setShowAnimation] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth)

    const submit = async (data) => {
        try {
            setShowAnimation(true)

            const res = await dispatch(signup(data));
            navigate(-1)
        } catch (error) {
            setTimeout(() => {
                setShowAnimation(false)
                setError(error.name, {
                    type: 'manual',
                    message: error.message
                })
            }, 1500);
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
            <form onSubmit={handleSubmit(submit)} className='w-1/2 mx-auto px-8 rounded-lg shadow-lg h-full overflow-auto'>
                <h2 className='text-2xl font-bold mb-2 text-left font-sans'>Create New Account</h2>

                <div className='relative mb-16'>
                    <div
                        className={`h-28 bg-gray-400 rounded-t-lg cursor-pointer relative flex items-center justify-center w-full ${coverImage ? "border-4 border-blue-400" : ""}`}
                        style={{ backgroundImage: `url(${coverImage})`, backgroundSize: 'cover' }}
                        onClick={() => document.getElementById('coverImageInput').click()}
                    >
                        {!coverImage && <FaPlus className=' text-4xl' />}
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
                        className='absolute -bottom-14 left-8 cursor-pointer'
                        onClick={() => document.getElementById('avatarInput').click()}
                    >
                        <div
                            className={`w-24 h-24 bg-gray-400 rounded-full border-4  flex items-center justify-center ${avatarFile ? "border-4 border-green-400" : ""}`}
                            style={{ backgroundImage: `url(${avatarFile})`, backgroundSize: 'cover' }}
                        >
                            {!avatarFile && <FaPlus className=' text-2xl' />}
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
                            floatingLabel='Fullname'
                            register={register}
                            registerAs="fullName"
                            errors={errors}
                            className='form p-2 border border-gray-300 rounded-lg w-full '
                        />
                        <InputField
                            type='text'
                            floatingLabel='Username'
                            register={register}
                            registerAs="username"
                            errors={errors}
                            className='form p-2 border border-gray-300 rounded-lg w-full'
                        />
                    </div>
                    <InputField
                        type='email'
                        floatingLabel='Email'
                        register={register}
                        registerAs="email"
                        errors={errors}
                        className='form p-2 border border-gray-300 rounded-lg w-full'
                    />
                    <InputField
                        type={showPassword ? 'text' : 'password'}
                        floatingLabel='Password'
                        register={register}
                        registerAs="password"
                        setShowPassword={setShowPassword}
                        showPassword={showPassword}
                        errors={errors}
                        className='form p-2 border border-gray-300 rounded-lg w-full'
                    />

                    <div className='text-right mb-5'>
                        <p className='text-gray-400 select-none cursor-text'>Already registered? <NavLink to="/auth/api/v1/login" className='text-blue-500 hover:underline'>Login here</NavLink></p>
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
            {
                (loading || showAnimation) && (

                    <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-white/5">
                        <Lottie
                            animationData={scanningAnimation}
                            loop
                            className='w-72 h-72'
                        />
                    </div>
                )
            }
        </div>
    );

}
export default Signup;