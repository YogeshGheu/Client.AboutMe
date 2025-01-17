import React from 'react'
import { useForm } from "react-hook-form"
import axios from "axios"

const Login = () => {

  const { register, handleSubmit, setError, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    try {
      axios.post("/app/api/user/login", data).then((response) => {
        console.log(response.data)
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form className='flex flex-col h-fit w-fit p-20 gap-y-2 bg-gray-800' onSubmit={handleSubmit(onSubmit)} action="">
        <h1 className='text-4xl text-center bg-gray-800 my-8'>AboutMe Login</h1>
        <input defaultValue={"Yogesh"} className='cursor-text outline-none p-2 text-black rounded-sm' type="text" placeholder={"Username"} {...register("username", { required: true })} />
        {errors.username && <span className='text-red-500 text-sm'>Username is required</span>}

        <input defaultValue={"Yogesh@123"} className='cursor-text outline-none p-2 text-black rounded-sm' type="password" placeholder={"Password"} {...register("password", { required: true })} />
        {errors.password && <span className='text-red-500 text-sm'>Password is required</span>}
        <div className='flex flex-col'>
          <button className='bg-gray-600 py-2 px-4 rounded-sm' type='submit'>Login </button>
          <div className='my-2'>
            <span>Doesn't have an account ? </span>
            <button className='bg-gray-600 py-[1px] px-2 rounded-md' type='submit'>Sign Up </button>
          </div>
        </div>

      </form>
    </div>
  )
}

export default Login
