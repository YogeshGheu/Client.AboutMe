import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import axios from "axios"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'



const Signup = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, setError, formState: { errors } } = useForm()
    const [userExistsError, setUserExistsError] = useState(false)

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            setError('confirmPassword', { type: 'manual', message: 'Passwords do not match' });
        } else {
            axios.post("/app/api/user/data/collect", data)
                .then((response) => {
                    if(response.data.status === 200){
                        navigate("/create-user/verify/otp")
                    } else return

                }).catch((error) => {
                    console.error(error)
                    if (error.response.status === 409) {
                        setUserExistsError(true)
                        return
                    } else return
                })
        }
    }


    return (
        <>

            <div>
                <form className='flex flex-col h-fit w-fit p-20 gap-y-2 bg-gray-800' onSubmit={handleSubmit(onSubmit)} action="">
                    <h1 className='text-4xl text-center bg-gray-800 my-8'>AboutMe Sign-Up</h1>
                    <input defaultValue={"Yogesh"} className='cursor-text outline-none p-2 text-black rounded-sm' type="text" placeholder={"First Name"} {...register("firstName", { required: true })} />
                    {errors.firstName && <span className='text-red-500 text-sm'>First name is required</span>}

                    <input defaultValue={"Gheu"} className='cursor-text outline-none p-2 text-black rounded-sm' type="text" placeholder={"Last Name"} {...register("lastName", { required: true })} />
                    {errors.lastName && <span className='text-red-500 text-sm'>Last name is required</span>}

                    <input defaultValue={"YogeshGheu"} className='cursor-text outline-none p-2 text-black rounded-sm' type="text" placeholder={"Username"} {...register("username", { required: true })} />
                    {errors.username && <span className='text-red-500 text-sm'>Username is required</span>}

                    <input defaultValue={"yogeshgheu@gmail.com"} className='cursor-text outline-none p-2 text-black rounded-sm' type="text" placeholder={"Email"} {...register("email", { required: true })} />
                    {errors.email && <span className='text-red-500 text-sm'>Email is required</span>}

                    <input defaultValue={"9812755062"} className='cursor-text outline-none p-2 text-black rounded-sm' type="text" placeholder={"Phone"} {...register("phone", { required: true })} />
                    {errors.phone && <span className='text-red-500 text-sm'>Phone number is required</span>}

                    <input defaultValue={"Yogesh@123"} className='cursor-text outline-none p-2 text-black rounded-sm' type="password" placeholder={"Password"} {...register("password", { required: true })} />

                    <input defaultValue={"Yogesh@123"} className='cursor-text outline-none p-2 text-black rounded-sm' type="password" placeholder={"Confirm Password"} {...register("confirmPassword", { required: "Confirm Password is required" })} />
                    {errors.password && <span className='text-red-500 text-sm'>Password is required</span> || errors.confirmPassword && <span className='text-red-500 text-sm'>{errors.confirmPassword.message}</span>}

                    <input accept="image/png, image/jpeg" className='cursor-text outline-none p-2 rounded-sm' type="file" {...register("profilePicture", { required: false })} />
                    {errors.profilePicture && <span className='text-red-500 text-sm'>Profile image is required</span>}

                    <div className='flex flex-col'>
                        {userExistsError && <span className='text-red-500'>Username already exists!</span>}
                        <button className='bg-gray-600 py-2 px-4 rounded-sm' type='submit'>Sign Up </button>
                        <div className='my-2'>
                            <span>Already have an account ? Try logging in </span>
                            <Link to={"/login"} className='bg-gray-600 py-[1px] px-2 rounded-md' type='submit'>Login</Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup
