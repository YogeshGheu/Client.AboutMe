import axios from 'axios'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'





const Header = () => {

  const navigate = useNavigate()

  const logout = async () => {
    axios.post("/app/api/user/logout")
      .then((response) => {
        if (response.data.status === "ok") navigate("/login");
      })
      .catch((error) => {
        console.error(error)
      })
  }


  return (
    <header className='min-h-20 bg-slate-900 flex flex-col justify-center'>
      <div className=' w-full flex flex-row gap-3 justify-between px-10'>

        <div className='bg-slate-900 flex flex-row gap-24'>
          <Link to={"/"}>AboutMe</Link>
          <nav className='bg-slate-900 flex flex-row gap-12'>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/about"}>About</NavLink>
            <NavLink to={"/youtube"}>YouTube</NavLink>
          </nav>
        </div>


        <button onClick={logout}>Logout</button>

      </div>
    </header>
  )
}

export default Header
