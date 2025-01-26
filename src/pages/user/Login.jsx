import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import axios from "axios"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()
  const { register, handleSubmit, setError, formState: { errors } } = useForm()
  const [invalidCredError, setInvalidCredError] = useState(false)

  const onSubmit = (data) => {

    axios.post("/app/api/user/login", data).then((response) => {
      if (response.data.status === 200) {
        navigate("/")
      } else return
    }).catch((error) => {
      if (error.response.data.status === 400) {
        setInvalidCredError(true)
      } else return console.error(error);
    })

  }

  return (
    <div>
      <form className='flex flex-col h-fit w-fit p-20 gap-y-2 bg-gray-800' onSubmit={handleSubmit(onSubmit)} action="">
        <h1 className='text-4xl text-center bg-gray-800 my-8'>AboutMe Login</h1>
        <input defaultValue={"YogeshGheu"} className='cursor-text outline-none p-2 text-black rounded-sm' type="text" placeholder={"Username"} {...register("username", { required: true })} />
        {errors.username && <span className='text-red-500 text-sm'>Username is required</span>}

        <input defaultValue={"Yogesh"} className='cursor-text outline-none p-2 text-black rounded-sm' type="password" placeholder={"Password"} {...register("password", { required: true })} />
        {errors.password && <span className='text-red-500 text-sm'>Password is required</span>}
        <div className='flex flex-col'>
          {invalidCredError && <span className='text-red-500'>Invalid Credentials!</span>}
          <button className='bg-gray-600 py-2 px-4 rounded-sm' type='submit'>Login </button>
          <Link to={"/account/password-reset"} className='text-blue-500 text-sm my-2'>Forgot password?</Link>
          <div className='my-2'>
            <span>Doesn't have an account ? </span>
            <Link to={"/signup"} className='bg-gray-600 py-[1px] px-2 rounded-md' type='submit'>Sign Up </Link>
          </div>
        </div>

      </form>
    </div>
  )
}

export default Login
