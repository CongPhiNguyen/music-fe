import axios from "axios"
import React from "react"
import { FaPhotoVideo, FaHeart, FaEllipsisH, FaPlay } from "react-icons/fa"
import { MdPostAdd } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { addSongAndPlay, addSong } from "../musicSlice"

import "./SearchComponent.css"
const ComponentMusic = ({ song, key }) => {
  const username = useSelector((state) => state.authen.currentUserInfo.username)

  const dispatch = useDispatch()
  const handleClickAddMusic = (id) => {
    axios
      .get(`http://localhost:5050/api/v1/zing/get-detail-song?idSong=${id}`)
      .then((res) => {

        const songSlice = {
          background: song.thumbnail,
          name: song.title,
          singer: song.artistsNames,
          pathSong: res.data.detail.data[128],
          duration: song.duration,
          id,
        }
        dispatch(addSong({ song: songSlice, username }))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleClickListenMusic = (id) => {
    axios
      .get(`http://localhost:5050/api/v1/zing/get-detail-song?idSong=${id}`)
      .then((res) => {
        const songSlice = {
          background: song.thumbnail,
          name: song.title,
          singer: song.artistsNames,
          pathSong: res.data.detail.data[128],
          duration: song.duration,
          id,
          lyric: res.data.lyric.data.sentences
        }
        dispatch(addSongAndPlay({ song: songSlice, username }))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const convertTime = (duration) => {
    var hours = Math.floor(duration / 60)
    var minutes = duration % 60
    return hours + ":" + minutes
  }

  return (
    <li key={key} className="zing-chart__song-item">
      <div className="zing-chart__song-item-left">
        <div
          className="overview__allsong-item-left-box zingchart__item-left-img "
          style={{ backgroundImage: `url(${song.thumbnail})` }}
        ></div>
        <div className="overview__allsong-item-body">
          <h3 className="overview__allsong-item-body-name">{song.title}</h3>
          <span className="overview__allsong-item-body-singer">
            {song.artistsNames}
          </span>
        </div>
      </div>
      <div className="overview__allsong-item-center">
        <span>{convertTime(song.duration)}</span>
      </div>
      <div className="overview__allsong-item-end">
        {/* <span className='overview__allsong-item-end-tym !text-white'>
                    <FaPhotoVideo />
                </span> */}
        <span
          onClick={() => handleClickAddMusic(song.encodeId)}
          className="overview__allsong-item-end-tym !text-white"
        >
          <MdPostAdd />
        </span>
        <span
          onClick={() => handleClickListenMusic(song.encodeId)}
          className="overview__allsong-item-end-tym !text-white"
        >
          <FaPlay />
        </span>
        {/* <span className="overview__allsong-item-end-tym">
          <FaHeart />
        </span> */}
        {/* <span className="overview__allsong-item-end-tym !text-white">
          <FaEllipsisH></FaEllipsisH>
        </span> */}
      </div>
    </li>
  )
}

export default function SearchComponent(props) {
  return (
    <div className="search-main">
      <div className="zing-chart__heading">Kết quả tìm kiếm</div>
      <ul style={{ listStyle: "none" }}>
        {props?.songs?.map((song, key) => (
          <ComponentMusic song={song} key={key}></ComponentMusic>
        ))}
      </ul>
    </div>
  )
}
