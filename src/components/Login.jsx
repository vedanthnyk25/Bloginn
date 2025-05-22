import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {login as authLogin} from'../store/authSlice'
import {Button, Input, Logo} from './index'
import  authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'
import { useDispatch } from 'react-redux'


function Login() {
    const navigate= useNavigate()
    const dispatch= useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError]= useState("")

    const login= async(data)=>{
        setError("")
        try {
            const session= await authService.login(data)
            if(session){
                const userData= await authService.getCurrentUser();
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }


        } catch (error) {
            setError(error.message)
        }
    } 


return (
    <div
    className='flex items-center py-20 justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl p-10 border border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-gray-900 dark:text-white">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-gray-600 dark:text-gray-400">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-indigo-600 dark:text-indigo-400 transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
            <Input
            label="Email"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
                required: true,
                validate:{
                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                }
            })}
            />
            <Input
            label="Password"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
            type="password"
            placeholder="Enter your password"
            {...register("password",{
                required: true,
                validate:{  strongPassword: (value) =>
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ||
                    "Password must be at least 8 characters long, include one letter, one number, and one special character"
                }
            })}
            />
            </div>
            <Button
                type="submit"
                className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300"
                >Sign in</Button>
        </form>
        </div>
    </div>

)
}


export default Login
