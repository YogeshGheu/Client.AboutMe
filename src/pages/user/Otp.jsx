import React from 'react'
import { useForm } from 'react-hook-form'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Otp = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, setError, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        try {
            axios.post("/app/api/user/verify/create", data).then((response) => {
                if (response.data.status === 200) {
                    navigate("/account/creation/confirmation")
                } else return;
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <form className='flex flex-col h-fit w-fit p-20 gap-y-2 bg-gray-800' onSubmit={handleSubmit(onSubmit)} action="">
                <h1 className='text-4xl text-center bg-gray-800 my-8'>Please enter the OTP sent to your email: </h1>
                <input className='cursor-text outline-none p-2 text-black rounded-sm' type="text" placeholder={"One Time Password"} {...register("otp", { required: true })} />
                {errors.otp && <span className='text-red-500 text-sm'>One time password is required</span>}
                <input type="submit" />
            </form>
        </div>
    )
}

export default Otp
