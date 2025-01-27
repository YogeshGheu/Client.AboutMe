import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import he from 'he'

const Videos = () => {

  // const [ytData, setYtData] = useState({})
  const [allVideos, setAllVideos] = useState([])

  useEffect(() => {
    const getYtData = async () => {
      axios.post("/app/user/youtube/videos", {videoCount:50})
        .then((response) => {
          // setYtData(response.data)
          setAllVideos(response.data)
        })
        .catch((error) => {
          console.error("Error occured: ", error)
          if (error.response.data.status === 401) navigate("/login");
        })
    }

    getYtData()

  }, [])


  return (
    <div className='flex flex-row flex-wrap gap-3'>
      {allVideos?.map((videoObj) => {
        const uploadTime = new Date(videoObj.snippet.publishedAt)

        return <a target='_blank' href={`https://www.youtube.com/watch?v=${videoObj.snippet.resourceId.videoId}&list=LL`} key={videoObj.id.videoId} className='p-[10px] w-[340px] overflow-x-hidden overflow-y-scroll h-[287px] border-2 rounded-md border-slate-700'>
          <div style={{ backgroundImage: `url(${videoObj.snippet.thumbnails.medium.url})`, backgroundSize: "cover", backgroundPosition: "center" }} className=' w-[320px] h-[180px] rounded-sm border border-red-400'>
          </div>
          <div className='px-2 py-[2px] rounded-md bg-slate-700 w-[320px] my-2'>
            Posted on : {`${uploadTime.getDay()}/${uploadTime.getMonth()}/${uploadTime.getFullYear()}`}
          </div>
          <p>{he.decode(videoObj.snippet.title)}</p>
          <div className='px-2 py-[2px] rounded-md bg-slate-700 w-[320px] my-2'>
            Description 👇🏻
          </div>
          <p>{he.decode(videoObj.snippet.description)}</p>
        </a>
      }
      )}
    </div>

  )
}

export default Videos
