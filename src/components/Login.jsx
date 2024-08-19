import React from 'react';
import InputField from './InputField';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

function Login() {
    const { handleSubmit, register, watch, formState: { errors } } = useForm();

    const submit = (data) => {
        
    };

    return (
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm z-10'>
            <form onSubmit={handleSubmit(submit)} className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
                <h2 className='text-2xl font-bold mb-6 text-center text-black'>Login to your Account</h2>
                <InputField 
                    label='Email *'
                    // placeholder='Enter Username or Email'
                    register={register}
                    registerAs="username"
                    errors={errors}
                    className='form'
                />
                <InputField 
                    label='Password *'
                    // placeholder='Enter Your Password'
                    register={register}
                    registerAs="password"
                    errors={errors}
                    className='form'
                />
                <div className='flex justify-end mb-4'>
                    <p className='text-gray-600'>New user? <NavLink to="/signup" className='text-blue-500 hover:underline'>Signup here</NavLink></p>
                </div>
                <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200'>
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;