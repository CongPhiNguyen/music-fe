import React from "react"
import { FaEllipsisH, FaEye, FaTrash } from "react-icons/fa"
import { AiOutlineHeart } from "react-icons/ai"
import { BsPlayFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import {
  setCurrentSong,
  changeIsPlay,
  setCurrentSongAndUpdate,
  removeSong
} from "../musicSlice"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { setIsRadioCurrent } from "../../radio/audioSlice"
export default function SongComponent(props) {
  const dispatch = useDispatch()
  const isPlay = useSelector((state) => state.musicData.isPlay)
  const songsData = useSelector((state) => state.musicData?.songsData)
  const username = useSelector(
    (state) => state?.authen?.currentUserInfo?.username
  )
  const navigate = useNavigate()
  const handleClickNextSong = () => {
    if (!props.isActive) {
      const song = songsData.find((_, index) => index === props.index)
      axios
        .get(
          `http://localhost:5050/api/v1/zing/get-detail-song?idSong=${song.id}`
        )
        .then((res) => {
          const pathSong = res.data.detail.data[128]
          dispatch(
            setCurrentSongAndUpdate({ pathSong, index: props.index, username })
          )
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const handleRemoveSong = () => {
    console.log("123")
    dispatch(removeSong({ index: props.index }))
  }

  return (
    <div
      className={`next-song__item ${
        props.isActive && "next-song__item-active"
      }`}
    >
      {props.isActive ? (
        <div
          onClick={() => {
            dispatch(changeIsPlay())
            dispatch(setIsRadioCurrent(false))
          }}
          className="next-song__item-img"
          style={{ backgroundImage: `url('${props.song.background}')` }}
        >
          {isPlay ? (
            <div className="next-song__item-playing-box">
              <img
                className="next-song__item-playing-box-img"
                alt="play"
                src="./assets/img/songs/icon-playing.gif"
              />
            </div>
          ) : (
            <div className="next-song__item-play-btn !flex">
              <BsPlayFill />
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={handleClickNextSong}
          className="next-song__item-img"
          style={{ backgroundImage: `url('${props.song.background}')` }}
        >
          <div className="next-song__item-play-btn">
            <BsPlayFill />
          </div>
        </div>
      )}
      <div className="next-song__item-body">
        <span className="next-song__item-body-heading">{props.song.name}</span>
        <span className="next-song__item-body-description">
          {props.song.singer}
        </span>
      </div>
      <div className="absolute right-0">
        <div className="next-song__item-action">
          <span
            onClick={() => navigate(`/song?id=${props.song.id}`)}
            className="next-song__item-action-heart"
          >
            <FaEye />
          </span>
          <span
            onClick={handleRemoveSong}
            className="next-song__item-action-dot"
          >
            <FaTrash />
          </span>
        </div>
      </div>
    </div>
  )
}
