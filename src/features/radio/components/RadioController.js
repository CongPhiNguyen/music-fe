import React, { useEffect, useRef, useState } from "react"
import "./RadioControl.css"
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
import ReactHlsPlayer from "react-hls-player/dist"
import { Col, Row } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { setIsPlay } from "../../shared/musicSlice"
import { setIsRadioPlay } from "../audioSlice"
export default function RadioController() {
  const dispatch = useDispatch()
  const songsData = useSelector((state) => state.musicData.songsData)
  const indexSong = useSelector((state) => state.musicData.indexSong)
  const cdThumbAnimate = useRef()
  const cdThumb = useRef()
  const [volumn, setVolumn] = useState(100)
  const [isMute, setIsMute] = useState(false)
  const radioRef = useRef()
  const isPlay = useSelector((state) => state.musicData.isPlay)
  const isRadioPlay = useSelector((state) => state.audio.isRadioPlay)
  const srcRadio = useSelector((state) => state.audio.srcRadio)
  const infoRadio = useSelector((state) => state.audio.infoSongPlayer)

  useEffect(() => {
    if (srcRadio !== "") {
      isRadioPlay ? radioRef.current.play() : radioRef.current.pause()
    }
  }, [srcRadio, isRadioPlay])

  const handleChangePlayStatusRadio = () => {
    if (isRadioPlay) {
      dispatch(setIsRadioPlay(false))
      if (radioRef) {
        radioRef.current.pause()
      }
    } else {
      dispatch(setIsRadioPlay(true))
      if (radioRef) {
        radioRef.current.play()
      }
    }
  }

  useEffect(() => {
    if (isRadioPlay)
      cdThumb.current = cdThumbAnimate.current.animate(
        [{ transform: "rotate(180deg)" }],
        {
          duration: 5000, // 10s
          iterations: Infinity // số lần lặp lại, Infinity : vô hạn
        }
      )
  }, [])

  const handleChangeVolumn = (e) => {
    radioRef.current.volume = e.target.value
    setVolumn(e.target.value)
  }

  // console.log(infoRadio)
  //
  // console.log(srcRadio)

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
                  backgroundImage: `url('${infoRadio.thumbnail}')`
                }}
                className={`music-control__left-img `}
              ></div>
            </div>
            <div className="music-control__left-content flex flex-col">
              <span className="music-control__left-content-song">
                {/* {indexSong !== null
                  ? songsData[indexSong]?.name
                  : "Chọn bài hát"} */}
                {infoRadio.title}
              </span>
              <span className="music-control__left-content-singer">
                {/* {indexSong !== null
                  ? songsData[indexSong]?.singer
                  : "Chọn bài hát"} */}
                {`${infoRadio.activeUsers} người đang nghe.`}
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
            <div
              className="music-control__center-action"
              onClick={() => handleChangePlayStatusRadio()}
            >
              {isRadioPlay ? (
                <BsPauseFill className="music-control__center-icon music-control__center-icon-main " />
              ) : (
                <BsPlayFill className="music-control__center-icon music-control__center-icon-main" />
              )}
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
          <ReactHlsPlayer
            src={srcRadio}
            autoPlay={isRadioPlay}
            playerRef={radioRef}
            volume={volumn}
          />
        </Col>
      </Row>
    </div>
  )
}
