import React from 'react'

import { Link } from 'react-router-dom'
const AccountConfirmation = () => {
    return (
        <div className='bg-gray-800 flex flex-col items-center'>
            <h1 className='text-4xl text-center bg-gray-800 my-8'>Your account has been created successfully.</h1>
            <Link to={"/login"} className='bg-gray-600 py-2 px-4 my-4 w-fit rounded-sm' type='submit'>Login </Link>
        </div>
    )
}

export default AccountConfirmation
