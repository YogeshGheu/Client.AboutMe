import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { isCookie, NavLink, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const YouTube = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/youtube/channel")
  }, [])
  


  return (
    <div>
      <nav className='bg-slate-800 flex justify-start gap-8 px-10 p-4'>
        <NavLink className={({isActive})=> isActive ? "text-red-500" : "text-white"} to={"/youtube/channel"}>Channel</NavLink>
        <NavLink className={({isActive})=> isActive ? "text-red-500" : "text-white"} to={"/youtube/videos"}>All Videos</NavLink>
      </nav>
      <Outlet />
    </div>
  )
}

export default YouTube
