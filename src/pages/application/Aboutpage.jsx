import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'


const Aboutpage = () => {
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    const getuser = async () => {
      axios.post("/app/api/user/get-user")
        .then((response) => {
          setUserData(response.data.data)
        })
        .catch((error) => {
          console.error(error)
          if (error.response.data.status === 401) navigate("/login")
        })
    }

    getuser()

  }, [])



  return (
    <div>
      user details: {(!userData) ? <span>No Data</span> : <span>{JSON.stringify(userData)}</span>}

    </div>
  )
}

export default Aboutpage
