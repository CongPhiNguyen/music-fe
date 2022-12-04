import axios from "axios"
import React, { useEffect, useState, useRef, useContext } from "react"
import ReactAudioPlayer from "react-audio-player"
import ReactJson from "react-json-view"
import { chill, jazzy, sleep } from "../interactive/data/dataSong"
import { StoreContext } from "../interactive/store"
import { Button } from "antd"
export default function Test() {
  const [data, setData] = useState([])
  const valueCT = useContext(StoreContext)
  const song = valueCT.song
  const [currentSong, setCurrentSong] = useState(song[0])
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef()
  const volumeSong = valueCT.volumeSong
  useEffect(() => {
    axios
      .get("http://localhost:5050/api/v1/zing/get-top-and-stream")
      .then((data) => {
        setData(
          data?.data?.data?.songFix.map((val) => {
            return {
              name: val.data["128"],
              src: val.data["128"]
            }
          })
        )
        console.log(data?.data?.data?.songFix)
      })
      .catch((err) => {
        console.log("err", err)
      })
  }, [])

  const handlePlay = () => {
    setPlaying((s) => !s)
  }
  useEffect(() => {
    if (playing) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
    audioRef.current.volume = volumeSong / 100
  })

  useEffect(() => {
    setCurrentSong(data[0])
  }, [data])

  const handleClickPrev = () => {
    const index = data.findIndex((x) => x.name == currentSong.name)
    if (index == 0) {
      setCurrentSong(data[data.length - 1])
    } else {
      setCurrentSong(data[index - 1])
    }
    setPlaying(true)
  }
  const handleClickNext = () => {
    const index = data.findIndex((x) => x.name == currentSong.name)
    if (index == data.length - 1) {
      setCurrentSong(data[0])
    } else {
      setCurrentSong(data[index + 1])
    }
    setPlaying(true)
  }
  return (
    <div>
      Nguyễn Công Phi
      <div className="flex items-center gap-[20px]">
        <p>{currentSong?.src}</p>
        <audio loop src={currentSong?.src} ref={audioRef}></audio>
        <Button>
          Prev
          <img
            src="./assets/img/player/prev.svg"
            alt="prev"
            onClick={handleClickPrev}
          />
        </Button>
        <Button onClick={handlePlay}>
          Play
          {playing ? (
            <img src="./assets/img/player/pause.svg" alt="" />
          ) : (
            <img src="./assets/img/player/play.svg" alt="" />
          )}
        </Button>
        <Button>
          Next
          <img
            src="./assets/img/player/next.svg"
            alt="next"
            onClick={handleClickNext}
          />
        </Button>
      </div>
    </div>
  )
}
