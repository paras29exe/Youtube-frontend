import React, { useContext, useState } from 'react';
import InputField from '../components/InputField';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login, loginWithGoogle } from '../store/asyncThunks/authThunk';
import { useDispatch, useSelector } from 'react-redux';
import { CgSpinner } from 'react-icons/cg';
import { GoogleLogin } from '@react-oauth/google';
import { displayContext } from '../context/displayContext';
import { toast } from 'react-toastify';

function Login() {
    const { handleSubmit, register, setError, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false)
    const { loading, error } = useSelector(state => state.auth)
    const [showAnimation, setShowAnimation] = useState(false)
    const {options} = useContext(displayContext)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = async (data) => {
        try {
            setShowAnimation(true)

            const res = await dispatch(login(data)).unwrap();
            toast.success(<p className='font-sans font-semibold'>Login successful.</p>, options)

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

    const handleGoogleLoginSuccess = async (data) => {
        try {
            const token = data.credential; // Extract the token from the response

            // Dispatch the loginWithGoogle thunk with the token
            await dispatch(loginWithGoogle(token)).unwrap();

            toast.success(<p className='font-sans font-semibold'>Google Login successful!</p>, options);
            navigate(-1);
        } catch (error) {
            toast.error(<p className='font-sans font-semibold'>Google Login failed</p>, options );
        }
    };

    return (
        <div className="h-screen w-full overflow-auto flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
            <div className="w-full max-w-md p-8 bg-gray-900 bg-opacity-90 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-6">Login to Your Account</h1>
                <form onSubmit={handleSubmit(submit)} className="space-y-4">
                    <div className='flex justify-center items-center'> 
                    <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={() => toast.error(<p className='font-sans font-semibold'>Google Login failed.</p>, options)}
                            render={(renderProps) => (
                                <button
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition focus:outline-none"
                                >
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                                        alt="Google Logo"
                                        className="w-5 h-5"
                                    />
                                    <span>Sign in with Google</span>
                                </button>
                            )}
                        />
                    </div>
                    
                    <div className='flex flex-col box-border'>
                        {/* Email Input */}
                        <InputField
                            floatingLabel="Email or Username"
                            register={register}
                            registerAs="username"
                            errors={errors}
                            // placeholder="Enter your email"
                            type="text"
                            className="focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                        {/* Password Input */}
                        <InputField
                            floatingLabel="Password"
                            register={register}
                            registerAs="password"
                            errors={errors}
                            // placeholder="Enter your password"
                            type={showPassword ? "text" : "password"}
                            setShowPassword={setShowPassword}
                            showPassword={showPassword}
                            className="focus:outline-none focus:ring-1 focus:ring-blue-600"
                        />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <a href="/forgot-password" className="text-gray-400 hover:text-gray-200">Forgot Password?</a>
                        <a href="/auth/api/v1/signup" className="text-red-500 hover:underline">Create Account</a>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-red-600 rounded-lg hover:bg-red-700 transition text-white font-semibold"
                    >
                        {loading || showAnimation
                            ? <CgSpinner className='animate-spin text-3xl mx-auto' />
                            : "Login"
                        }
                    </button>
                </form>
                <p className="text-center text-gray-500 text-xs mt-4">
                    By logging in, you agree to our <a href="#" className="text-red-400 hover:underline">Terms</a> and <a href="#" className="text-red-400 hover:underline">Privacy Policy</a>.
                </p>
            </div>
        </div>
    );
}

export default Login;
