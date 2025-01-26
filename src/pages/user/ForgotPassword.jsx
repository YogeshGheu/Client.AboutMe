import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
const ForgotPassword = () => {

    const { register, handleSubmit, setError, formState: { errors } } = useForm()
    const [sent, setSent] = useState(false)
    const [success, setSuccess] = useState(false)


    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            setError("confirmPassword", { type: 'manual', message: 'Passwords do not match' })
        } else {
            if (!sent) {
                axios.post("/app/api/user/password/reset/request", data)
                    .then((response) => {
                        if (response.data.status === 200) setSent(true)
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            } else if (sent) {
                axios.post("/app/api/user/password/reset/verify", data)
                    .then((response) => {
                        if (response.data.status === 200) {
                            setSuccess(true)
                        }
                    })
                    .catch((error) => {
                        if (error.response.data.status == 400) {
                            setError("otp", { type: "manual", message: "Incorrect OTP, Please try again!" })
                        }
                    })
            }
        }
    }

    return (
        <div>
            <form className='flex flex-col h-fit w-fit p-20 gap-y-2 bg-gray-800' onSubmit={handleSubmit(onSubmit)} action="">
                <h1 className='text-4xl text-center bg-gray-800 my-8'>Forgot Password?</h1>
                <h1 className='text-xl text-center bg-gray-800 my-1'>Please enter your username.</h1>

                <input defaultValue={"YogeshGheu"} className='cursor-text outline-none p-2 text-black rounded-sm' type="text" placeholder={"Username"} {...register("username", { required: true })} />
                {errors.username && <span className='text-red-500 text-sm'>Username is required</span>}

                <button className='bg-gray-600 py-2 px-4 my-2 rounded-sm' type='submit'>Generate OTP</button>


                {sent &&
                    (<div className='flex flex-col gap-y-2'>
                        <span className='text-red-500 text-sm'>OTP is sent to the registered email id.</span>
                        <input className='cursor-text outline-none p-2 text-black rounded-sm' type="text" placeholder={"One time password"} {...register("otp", { required: "correct OTP is required" })} />
                        {errors.otp && <span className='text-sm text-red-500'>{errors.otp.message}</span> || errors.otp && <span className='text-red-500 text-sm'>OTP is required</span>}

                        <input className='cursor-text outline-none p-2 text-black rounded-sm' type="password" placeholder={"Password"} {...register("password", { required: true })} />
                        <input className='cursor-text outline-none p-2 text-black rounded-sm' type="password" placeholder={"Confirm Password"} {...register("confirmPassword", { required: "Confirm Password is required" })} />
                        {errors.password && <span className='text-red-500 text-sm'>Password is required</span> || errors.confirmPassword && <span className='text-red-500 text-sm'>{errors.confirmPassword.message}</span>}

                        <button className='bg-gray-600 py-2 px-4 my-2 rounded-sm' type='submit'>Verify & Reset</button>
                    </div>)}


                {success && <div className='flex flex-row items-center justify-between'>
                    <span className='text-red-500 text-xs'>Password reset is successful.</span>
                    <Link className='bg-gray-600 text-xs my-2 w-fit p-1 rounded-sm' to={"/login"}>Go to login</Link>
                </div>}

            </form>
        </div>
    )
}

export default ForgotPassword
