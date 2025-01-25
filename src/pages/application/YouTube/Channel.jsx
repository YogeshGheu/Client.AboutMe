import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Channel = () => {

  const [ytData, setYtData] = useState([])
  const [ytChannel, setYtChannel] = useState({})

  useEffect(() => {
    const getYtData = async () => {
      axios.post("/app/user/youtube/channel")
        .then((response) => {
          setYtData(response.data)
          setYtChannel(response.data[response.data.length - 1])
          setLatestVideo(response.data[0])
          setSecondLatestVideo(response.data[1])

        })
        .catch((error) => {
          console.error("Error occured : ", error)
        })
    }

    getYtData()

  }, [])

  return (
    <div>
      {ytData.length > 0 && ytChannel?.id?.kind === "youtube#channel" ? <div>
        <div className='flex gap-10 p-5 m-3'>
          <img style={{ borderRadius: "50%" }} width={100} src={ytChannel?.snippet?.thumbnails?.medium?.url} alt="Channel Image" />
          <div className='flex flex-col'>
            <span className='text-4xl' >{ytChannel.snippet.channelTitle}</span>
            <span className='text-sm' >Channel Id : {ytChannel.snippet.channelId}</span>
            <span className='' >{ytChannel.snippet.description}</span>
          </div>
        </div>
        <div className='text-2xl py-3 m-0 text-center border border-white border-x-0  w-full'>Latest Videos 👇🏻</div>
        <div className='flex flex-row justify-between  p-20'>

          {
            ytData.slice(0, 2).map((element) => {
              return <iframe
                key={element.etag}
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${element.id.videoId}?rel=0&modestbranding=1&showinfo=0`}
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
