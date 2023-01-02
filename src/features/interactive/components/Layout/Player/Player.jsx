import { useContext, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { chill, jazzy, sleep } from "../../../data/dataSong"
import { changeSong, setPlaying } from "../../../interactiveSlice"
import { StoreContext } from "../../../store"
import "./Player.scss"
const Player = () => {
  const dispatch = useDispatch()
  const valueCT = useContext(StoreContext)
  const song = valueCT.song
  // const [currentSong, setCurrentSong] = useState(song[0])
  const audioRef = useRef()
  const volumeSong = valueCT.volumeSong
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    dispatch(changeSong(song[0]))
  }, [song])
  const currentSong = useSelector((state) => state.interactive.currentSong)
  const playing = useSelector((state) => state.interactive.isPlaying)
  const handlePlay = () => {
    dispatch(setPlaying(!playing))
  }

  const handleTimeUpdate = () => {
    if (audioRef.current.duration) {
      const progressPercent = Math.floor(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      )
      if (progressPercent === 100) {
        progressPercent = 0
      }
      setPercent(progressPercent)
    }
  }

  useEffect(() => {
    if (playing) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
    audioRef.current.volume = volumeSong / 100
  })

  const handleClickPrev = () => {
    const index = song.findIndex((x) => x.name == currentSong.name)
    if (index == 0) {
      dispatch(changeSong(song[song.length - 1]))
    } else {
      dispatch(changeSong(song[index - 1]))
    }
    dispatch(setPlaying(true))
  }

  const handleClickNext = () => {
    const index = song.findIndex((x) => x.name == currentSong.name)
    if (index == song.length - 1) {
      dispatch(changeSong(song[0]))
    } else {
      dispatch(changeSong(song[index + 1]))
    }
    dispatch(setPlaying(true))
  }

  const handleChangeMusic = (e) => {
    if (audioRef.current.duration) {
      audioRef.current.currentTime =
        (e.target.value / 100) * audioRef.current.duration
    }
  }

  return (
    <div className="flex items-center">
      <div className="absolute bottom-[4%] left-[10%] text-[20px] font-[600] text-white">
        {currentSong?.name}
      </div>
      <div className="absolute flex items-center justify-center bottom-[20px] z-50 w-full">
        <audio
          loop
          src={currentSong?.src}
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
        ></audio>
        <div className="flex items-center gap-[20px]">
          <button className="w-[36px] h-[36px]">
            <img
              src="./assets/img/player/prev.svg"
              alt="prev"
              onClick={handleClickPrev}
            />
          </button>
          <button className="w-[54px] h-[54px]" onClick={handlePlay}>
            {playing ? (
              <img src="./assets/img/player/pause.svg" alt="" />
            ) : (
              <img src="./assets/img/player/play.svg" alt="" />
            )}
          </button>
          <button className="w-[36px] h-[36px]">
            <img
              src="./assets/img/player/next.svg"
              alt="next"
              onClick={handleClickNext}
            />
          </button>
        </div>
      </div>
      <div className="absolute flex items-center justify-center bottom-[40px] z-50 !right-[40px]">
        <input
          onChange={handleChangeMusic}
          id="progress"
          className="player-progress !w-[300px]"
          type="range"
          value={percent}
          step="1"
          min="0"
          max="100"
        />
      </div>
    </div>
  )
}

export default Player
