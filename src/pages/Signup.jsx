import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../store/asyncThunks/authThunk';
import Lottie from 'lottie-react';
import scanningAnimation from '../assets/scanning.json'
import { BiImageAdd } from 'react-icons/bi';
import { TiTimes } from 'react-icons/ti';

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
        <div className='w-full h-full overflow-auto'>
            <div className='w-full pb-16 mx-auto lg:w-3/4 2xl:w-3/5'>
                <h2 className='text-4xl font-serif text-center font-bold mb-4 max-md:text-2xl'>Create New Account</h2>
                <form onSubmit={handleSubmit(submit)} className='mx-auto px-8 rounded-lg shadow-lg flex flex-col gap-y-20'>

                    <div className='relative'>
                        {/* cover image */}
                        <div
                            className={`h-32 border bg-zinc-800 rounded-t-lg cursor-pointer relative flex items-center justify-center w-full bg-center object-cover ${coverImage ? "border-2 border-solid border-blue-400" : "border-dashed"}`}
                            style={{ backgroundImage: `url(${coverImage})`, backgroundSize: 'cover' }}
                            onClick={() => document.getElementById('coverImageInput').click()}
                        >
                            {!coverImage && <div className='flex flex-col items-center justify-center'>

                                <BiImageAdd className='text-5xl' />
                                <p className="text-gray-500 text-sm">Dimensions: 1920 x 1080 (Recommended) | Max file size: 5MB</p>
                            </div>}
                            {coverImage && <TiTimes className='absolute top-2 right-2 bg-red-500 rounded-full text-xl cursor-pointer' onClick={(e) => { e.stopPropagation(); removeCoverImage(); }} />}
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
                            className='absolute -bottom-14 left-8 cursor-pointer select-none'
                            onClick={() => document.getElementById('avatarInput').click()}
                        >
                            <div
                                className={`w-24 bg-zinc-800 !aspect-square !bg-[rbg(20, 20, 20)] border  rounded-full flex items-center justify-center object-cover bg-center ${avatarFile ? "border-2 border-solid border-green-400" : "border-dashed"}`}
                                style={{ backgroundImage: `url(${avatarFile})`, backgroundSize: 'cover' }}
                            >
                                {!avatarFile && <div className='flex flex-col items-center justify-center'>

                                    <BiImageAdd className='text-3xl' />
                                    <p className="text-gray-500 text-xs"> 800 x 800</p>
                                </div>}
                                {avatarFile && <TiTimes className='absolute top-1 right-2 bg-red-500 rounded-full text-xl cursor-pointer' onClick={(e) => { e.stopPropagation(); removeAvatar(); }} />}
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

                    <div className='flex flex-col whitespace-nowrap max-sm:whitespace-normal'>
                        <div className='flex max-sm:flex-col gap-x-4 grow'>
                            <div className='w-full'>
                                <InputField
                                    type='text'
                                    floatingLabel='Fullname'
                                    register={register}
                                    registerAs="fullName"
                                    errors={errors}
                                    className='form p-2 border border-zinc-300 rounded-lg w-full'
                                />
                                <p className='text-gray-400 text-sm max-sm:text-xs '> Enter your full name as you'd like it to appear.</p>
                            </div>
                            <div className="w-full">
                                <InputField
                                    type='text'
                                    floatingLabel='Username'
                                    register={register}
                                    registerAs="username"
                                    errors={errors}
                                    className='form p-2 border border-zinc-300 rounded-lg w-full'
                                />
                                <p className='text-gray-400 text-sm max-sm:text-xs'> Choose a unique username that represents you.</p>
                            </div>
                        </div>
                        <div className="w-full">
                            <InputField
                                type='email'
                                floatingLabel='Email'
                                register={register}
                                registerAs="email"
                                errors={errors}
                                className='form p-2 border border-zinc-300 rounded-lg w-full'
                            />
                            <p className='text-gray-400 text-sm max-sm:text-xs'>Enter a valid email address to receive notifications and updates.</p>
                        </div>
                        <div className='w-full'>
                            <InputField
                                type={showPassword ? 'text' : 'password'}
                                floatingLabel='Password'
                                register={register}
                                registerAs="password"
                                setShowPassword={setShowPassword}
                                showPassword={showPassword}
                                errors={errors}
                                className='form p-2 border border-zinc-300 rounded-lg w-full'
                            />
                            <p className='text-gray-400 text-sm max-sm:text-xs'>Choose a strong password to secure your account.</p>
                        </div>

                        <div className='text-right mb-5'>
                            <p className='text-zinc-400 select-none cursor-text'>Already registered? <NavLink to="/auth/api/v1/login" className='text-blue-500 hover:underline'>Login here</NavLink></p>
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
        </div>
    );

}
export default Signup;