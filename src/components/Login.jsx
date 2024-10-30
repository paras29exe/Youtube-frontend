import React, { useState } from 'react';
import InputField from './InputField';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import Eye icons
import Cookies from 'js-cookie';
import { login } from '../store/ayncThunks/authThunk';
import { useDispatch, useSelector } from 'react-redux';
import scanningAnimation from "../assets/scanning.json"
import Lottie from 'lottie-react';

function Login() {
    const { handleSubmit, register, setError, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false)
    const { loading, error } = useSelector(state => state.auth)
    const [showAnimation, setShowAnimation] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = (data) => {
        setShowAnimation(true)

        setTimeout(async () => {
            setShowAnimation(false)
            const res = await dispatch(login(data));
            if (res.error) {
                setError(res.error.name, {
                    type: 'manual',
                    message: res.error.message
                })
                throw res.error
            } else {
                navigate(-1)
                Cookies.set("accessToken", res.payload.data.accessToken, { expires: 7 }); // Cookie expires in 7 days
                Cookies.set("refreshToken", res.payload.data.refreshToken, { expires: 7 }); // Cookie expires in 7 days
                console.clear()
            }
        }, 2500);
    };

    return (
        <div className='absolute inset-0 flex items-center justify-center'>
            <form
                onSubmit={handleSubmit(submit)}
                className='relative inset-0 bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full '
            >
                <FaTimes
                    className='absolute top-2 right-2 bg-red-500 rounded-full text-xl cursor-pointer'
                    onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                />
                <h2 className='text-2xl font-bold mb-6 text-center text-white'>Login to your Account</h2>

                <div className="flex flex-col">
                    <InputField
                        label='Email or Username'
                        register={register}
                        registerAs="username"
                        errors={errors}
                        className='form p-2 border border-gray-300 rounded-lg w-full'
                    />
                        <InputField
                            label='Password'
                            type={showPassword ? 'text' : 'password'}
                            register={register}
                            registerAs="password"
                            errors={errors}
                            passwordField={true}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                            autoComplete = {false}
                            className='form p-2 border border-gray-300 rounded-lg w-full '
                        />
                        
                    <div className='flex justify-end mb-4'>
                        <p className='text-gray-500 select-none cursor-text'> New user? <NavLink to="/auth/api/v1/signup" className='text-blue-500 hover:underline'>Signup here</NavLink></p>
                    </div>
                </div>

                {loading || showAnimation ? (
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto' }} width="40px" height="40px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <circle cx="50" cy="50" fill="none" stroke="#fff" strokeWidth="8" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
                            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1" />
                        </circle>
                    </svg>

                ) : (
                    <button
                        type='submit'
                        className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200'

                    >
                        Login
                    </button>
                )}
            </form>
            {
                ( showAnimation) && (
                    
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

export default Login;
