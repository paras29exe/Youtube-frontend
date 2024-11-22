import React, { useState } from 'react';
import InputField from '../components/InputField';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa'; // Import Eye icons
import { login } from '../store/asyncThunks/authThunk';
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

    const submit = async (data) => {
        try {
            setShowAnimation(true)

            const res = await dispatch(login(data)).unwrap();
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

    return (
        <div className='min-h-screen w-full flex items-center justify-center '>
            <form
                onSubmit={handleSubmit(submit)}
                className='relative bg-gray-900/50 p-10 rounded-xl shadow-xl max-w-md w-full text-white shadow-gray-800'
            >
                <FaTimes
                    className='absolute top-4 right-4 text-2xl bg-red-600 p-1 rounded-full text-white cursor-pointer hover:bg-red-700 transition'
                    onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                />
                <h2 className='text-3xl font-extrabold mb-8 text-center'>Login to Your Account</h2>

                <div className="flex flex-col">
                    <InputField
                        label='Email or Username'
                        register={register}
                        registerAs="username"
                        errors={errors}
                        className='form p-3 border border-gray-500 bg-gray-800 rounded-lg w-full text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
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
                        className='form p-3 border border-gray-500 bg-gray-800 rounded-lg w-full text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div className='flex justify-end mb-6'>
                    <p className='text-sm text-gray-400'>
                        New user? <NavLink to="/auth/api/v1/signup" className='text-blue-400 hover:text-blue-500 transition hover:underline'>Sign up here</NavLink>
                    </p>
                </div>

                {loading || showAnimation ? (
                    <div className='flex items-center justify-center mb-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto' }} width="40px" height="40px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                            <circle cx="50" cy="50" fill="none" stroke="#00BFFF" strokeWidth="8" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
                                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1" />
                            </circle>
                        </svg>
                    </div>
                ) : (
                    <button
                        type='submit'
                        className='w-full bg-blue-600 text-white py-2 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200'
                    >
                        Login
                    </button>
                )}
            </form>
            {(loading || showAnimation) && (
                <div className="absolute z-20 inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30">
                    <Lottie
                        animationData={scanningAnimation}
                        loop
                        className='w-72 h-72'
                    />
                </div>
            )}
        </div>

    );
}

export default Login;
