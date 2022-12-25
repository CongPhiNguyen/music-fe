import React, { useEffect, useRef, useState } from "react"
import "./MusicControl.css"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import {
  FaEllipsisH,
  FaPhotoVideo,
  FaMicrophone,
  FaRandom,
  FaRedoAlt
} from "react-icons/fa"
import { BiSquare } from "react-icons/bi"
import { FiDownload } from "react-icons/fi"
import {
  BsFillVolumeDownFill,
  BsCaretLeftFill,
  BsCaretRightFill,
  BsPauseFill,
  BsPlayFill,
  BsFillVolumeMuteFill
} from "react-icons/bs"
import { Col, Row } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { setCurrentSong, setIsPlay } from "../musicSlice"
import randomIntFromInterval from "../../../utilities/randomNumber"
import axios from "axios"

export default function MusicControl() {
  const dispatch = useDispatch()
  const songsData = useSelector((state) => state.musicData.songsData)
  const indexSong = useSelector((state) => state.musicData.indexSong)
  const cdThumbAnimate = useRef()
  const cdThumb = useRef()
  const [volumn, setVolumn] = useState(0)
  const [isMute, setIsMute] = useState(false)
  const [percent, setPercent] = useState(0)
  const [currentTimeMusic, setCurrentTimeMusic] = useState("00:00")
  const radioRef = useRef()
  const isPlay = useSelector((state) => state.musicData.isPlay)

  const handlePlayMusic = () => {
    if (indexSong !== null) {
      dispatch(setIsPlay({ isPlay: true }))
      radioRef.current.play()
    }
  }

  useEffect(() => {
    cdThumb.current = cdThumbAnimate.current.animate(
      [{ transform: "rotate(180deg)" }],
      {
        duration: 5000, // 10s
        iterations: Infinity // số lần lặp lại, Infinity : vô hạn
      }
    )
  }, [])

  useEffect(() => {
    if (isPlay) {
      cdThumb.current.play()
    } else {
      cdThumb.current.pause()
    }
  }, [isPlay])

  useEffect(() => {
    if (indexSong !== null) {
      dispatch(setIsPlay({ isPlay: true }))
      radioRef.current.play()
    } else {
      dispatch(setIsPlay({ isPlay: false }))
    }
  }, [indexSong, dispatch])

  const handlePauseMusic = () => {
    radioRef.current.pause()
    dispatch(setIsPlay({ isPlay: false }))
  }

  const formatTime = (number) => {
    const minutes = Math.floor(number / 60)
    const seconds = Math.floor(number - minutes * 60)
    return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds
      }`
  }

  const handleTimeUpdate = () => {
    if (radioRef.current.duration) {
      setCurrentTimeMusic(formatTime(radioRef.current.currentTime))
      const progressPercent = Math.floor(
        (radioRef.current.currentTime / radioRef.current.duration) * 100
      )
      if (progressPercent === 100) {
        radioRef.current.pause()
        dispatch(setIsPlay({ isPlay: false }))
        if (isRedo) {
          dispatch(setIsPlay({ isPlay: true }))
          radioRef.current.play()
        }
        if (isRandom) {
          dispatch(
            setCurrentSong({
              index: randomIntFromInterval(0, songsData.length - 1)
            })
          )
        }
      }
      setPercent(progressPercent)
    }
  }

  const handleChangeMusic = (e) => {
    if (radioRef.current.duration) {
      radioRef.current.currentTime =
        (e.target.value / 100) * radioRef.current.duration
    }
  }

  const handleNextSong = () => {
    if (indexSong !== null) {
      let nextSong = indexSong + 1
      dispatch(setCurrentSong({ index: nextSong }))
    }
  }

  const handlePrevSong = () => {
    if (indexSong !== null) {
      let prevIndex = indexSong - 1
      dispatch(setCurrentSong({ index: prevIndex }))
    }
  }

  const [isRandom, setIsRandom] = useState(false)
  const handleClickRandom = () => {
    if (!isRandom && isRedo) {
      setIsRedo(false)
    }
    setIsRandom(!isRandom)
  }

  const [isRedo, setIsRedo] = useState(false)
  const handleClickRedo = () => {
    if (!isRedo && isRandom) {
      setIsRandom(false)
    }
    setIsRedo(!isRedo)
  }

  const handleChangeVolumn = (e) => {
    radioRef.current.volume = e.target.value
    setVolumn(e.target.value)
  }

  const convertTime = (duration) => {
    var hours = Math.floor(duration / 60)
    var minutes = duration % 60
    return hours + ":" + minutes
  }

  return (
    <div className="music-control">
      <Row>
        <Col span={6}>
          <div
            style={{ transform: `translateX(${isPlay ? "20px" : "0px"})` }}
            className={`music-control__left`}
          >
            <div className="music-control__left-img-box">
              <div
                ref={cdThumbAnimate}
                style={{
                  backgroundImage: `url('${indexSong !== null && songsData[indexSong].background
                    }')`
                }}
                className={`music-control__left-img `}
              ></div>
            </div>
            <div className="music-control__left-content flex flex-col">
              <span className="music-control__left-content-song">
                {indexSong !== null
                  ? songsData[indexSong].name
                  : "Chọn bài hát"}
              </span>
              <span className="music-control__left-content-singer">
                {indexSong !== null
                  ? songsData[indexSong].singer
                  : "Chọn bài hát"}
              </span>
            </div>
            <div className="music-control__left-action">
              {/* <div className="music-control__left-action-tym-box">
                <AiOutlineHeart className="music-control__left-action-tym-none" />
                <AiFillHeart className="music-control__left-action-tym" />
              </div> */}
              {/* <div className="music-control__left-action-tym-box">
                <FaEllipsisH className="music-control__left-action-option"></FaEllipsisH>
              </div> */}
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="music-control-center">
            <div className="music-control__center-action">
              <FaRandom
                onClick={handleClickRandom}
                style={{ color: `${isRandom ? "#ed2b91" : "#fff"}` }}
                className={`music-control__center-icon`}
              />
              <BsCaretLeftFill
                onClick={handlePrevSong}
                className="music-control__center-icon"
              />
              {isPlay ? (
                <BsPauseFill
                  onClick={handlePauseMusic}
                  className="music-control__center-icon music-control__center-icon-main "
                />
              ) : (
                <BsPlayFill
                  onClick={handlePlayMusic}
                  className="music-control__center-icon music-control__center-icon-main"
                />
              )}
              <BsCaretRightFill
                onClick={handleNextSong}
                className="music-control__center-icon"
              />
              <FaRedoAlt
                onClick={handleClickRedo}
                style={{
                  fontSize: "3.2rem",
                  color: `${isRedo ? "#ed2b91" : "#fff"}`
                }}
                className={`music-control__center-icon `}
              />
            </div>
            <div className="music-control__center-progress">
              <span className="music-control__center-progress-time-start">
                {currentTimeMusic}
              </span>
              <audio
                onTimeUpdate={handleTimeUpdate}
                ref={radioRef}
                id="audio"
                src={indexSong !== null && songsData[indexSong].pathSong}
              ></audio>
              <input
                onChange={handleChangeMusic}
                id="progress"
                className="music-control__center-progress-input"
                type="range"
                value={percent}
                step="1"
                min="0"
                max="100"
              />
              <span className="music-control__center-progress-time-end">
                {indexSong !== null && convertTime(songsData[indexSong].duration)}
              </span>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="music-control-right">
            {/* <FaPhotoVideo className="music-control__right-action-option"></FaPhotoVideo> */}
            {/* <FaMicrophone className="music-control__right-action-option"></FaMicrophone> */}
            <BiSquare className="music-control__right-action-option"></BiSquare>
            {isMute ? (
              <BsFillVolumeMuteFill
                onClick={() => {
                  setIsMute(false)
                }}
                style={{ fontSize: "4rem" }}
                className="music-control__right-action-option"
              ></BsFillVolumeMuteFill>
            ) : (
              <BsFillVolumeDownFill
                style={{ fontSize: "4rem" }}
                onClick={() => {
                  setIsMute(true)
                }}
                className="music-control__right-action-option"
              ></BsFillVolumeDownFill>
            )}
            <div className="music-control__right-progress">
              <input
                onChange={handleChangeVolumn}
                id="progress-volumn"
                value={isMute ? 0 : volumn}
                type={"range"}
                step={0.01}
                min={0}
                max={1}
                className="music-control__right-volumn-input"
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
