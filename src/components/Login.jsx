import React, { useContext, useState } from 'react';
import InputField from './InputField';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { FaTimes} from 'react-icons/fa'; // Import Eye icons
import Cookies from 'js-cookie';
import { login } from '../store/ayncThunks/authThunk';
import { useDispatch, useSelector } from 'react-redux';
import { loginContext } from '../context/loginContext';

function Login() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const { toggleLoginPage } = useContext(loginContext);
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false); // Add state for showing/hiding password

    const { userData, loading, error } = useSelector((state) => state.auth);

    const submit = async (data) => {
        const res = await dispatch(login(data));

        if (res.type.includes("rejected")) {
            throw res.error;
        } else {
            toggleLoginPage();
            console.log(userData);

            Cookies.set("accessToken", res.payload.data.accessToken, { expires: 7 }); // Cookie expires in 7 days
            Cookies.set("refreshToken", res.payload.data.refreshToken, { expires: 7 }); // Cookie expires in 7 days
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm z-10'>
            <form
                onSubmit={handleSubmit(submit)}
                className='relative inset-0 bg-black p-8 rounded-lg shadow-lg max-w-md w-full'
            >
                <FaTimes
                    className='absolute top-2 right-2 bg-red-500 rounded-full text-xl cursor-pointer'
                    onClick={(e) => { e.stopPropagation(); toggleLoginPage(); }}
                />
                <h2 className='text-2xl font-bold mb-6 text-center text-white'>Login to your Account</h2>

                <div className="flex flex-col">
                    <InputField
                        label='Email or Username'
                        register={register}
                        registerAs="username"
                        errors={errors}
                        className='form bg-inherit text-white'
                    />
                    <div className="relative">
                        <InputField
                            label='Password'
                            type={showPassword ? 'text' : 'password'}
                            register={register}
                            registerAs="password"
                            errors={errors}
                            className='form bg-inherit text-white'
                        />
                        <div
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer z-10"  // Ensure z-index is high
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash className="text-black text-xl" />  : <FaEye className="text-black text-xl" /> }

                        </div>
                    </div>
                    <div className='flex justify-end mb-4'>
                        <p className='text-gray-500'> New user? <NavLink to="/signup" className='text-blue-500 hover:underline'>Signup here</NavLink></p>
                    </div>
                    <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200'>
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
