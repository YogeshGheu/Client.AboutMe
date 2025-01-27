import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Channel = () => {

  const navigate = useNavigate()
  const [ytTopVideos, setYtTopVideos] = useState([])
  const [ytChannel, setYtChannel] = useState({})

  useEffect(() => {
    const getYtData = async () => {
      axios.post("/app/user/youtube/channel")
        .then((response) => {
          setYtChannel(response.data[0])
        })
        .catch((error) => {
          console.error("Error occured: ", error)
          if (error.response.data.status === 401) navigate("/login");
        })
    }

    const getYtVideos = async () => {
      axios.post("/app/user/youtube/videos", {videoCount:2})
        .then((response) => {
          setYtTopVideos(response.data)
        })
        .catch((error) => {
          console.error("Error occured: ", error)
          if (error.response.data.status === 401) navigate("/login");
        })

    }
    getYtData()
    getYtVideos()

  }, [])

  return (
    <div>
      {ytChannel?.kind === "youtube#channel" ? <div>
        <div className='flex gap-10 p-5 m-3'>
          <img style={{ borderRadius: "50%" }} width={100} src={ytChannel.snippet.thumbnails.medium.url} alt="Channel Image" />
          <div className='flex flex-col'>
            <span className='text-4xl' >{ytChannel.snippet.title}</span>
            <span className='text-sm' >Channel Id : {ytChannel.id}</span>
            <span className='' >{ytChannel.snippet.description}</span>
          </div>
        </div>
        <div className='text-2xl py-3 m-0 text-center border border-white border-x-0  w-full'>Latest Videos 👇🏻</div>
        <div className='flex flex-row justify-between  p-20'>

          {
            ytTopVideos.map((element) => {
              return <iframe
                key={element.etag}
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${element.snippet.resourceId.videoId}?rel=0&modestbranding=1&showinfo=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            }
            )}
        </div>

      </div> : <span>Loading, Please Wait...</span>}
    </div>
  )
}

export default Channel
