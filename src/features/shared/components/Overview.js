import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import "./Overview.css"
import {
  FaChevronRight,
  FaUpload,
  FaEye,
  FaEllipsisH,
  FaPlay,
  FaPlus,
  FaTimes,
  FaRandom
} from "react-icons/fa"
import { MdPostAdd } from "react-icons/md"
import { Col, Row, message } from "antd"
import { addSongAndPlay, addSong } from "../musicSlice"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { setIsRadioCurrent } from "../../radio/audioSlice"
import URL from "../../../api/config"
function ComponentSong({ song }) {
  const navigate = useNavigate()
  const username = useSelector(
    (state) => state?.authen?.currentUserInfo?.username
  )
  const dispatch = useDispatch()
  const handleClickAddMusic = (id) => {
    axios
      .get(URL.BASE_API_ENDPOINT + `/zing/get-detail-song?idSong=${id}`)
      .then((res) => {
        if (res?.data?.detail?.err !== -1150) {
          const songSlice = {
            background: song.thumbnail,
            name: song.title,
            singer: song.artistsNames,
            pathSong: res.data.detail.data[128],
            duration: song.duration,
            id
          }
          dispatch(addSong({ song: songSlice, username }))

        } else {
          message.success("Bài nhạc dành cho người có tài khoản VIP")
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleClickListenMusic = (id) => {
    axios
      .get(URL.BASE_API_ENDPOINT + `/zing/get-detail-song?idSong=${id}`)
      .then((res) => {
        if (res?.data?.detail?.err !== -1150) {

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
          dispatch(setIsRadioCurrent(false))
        } else {
          message.success("Bài nhạc dành cho người có tài khoản VIP")
        }
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
    <li className={`overview__allsong-item `}>
      <div className="overview__allsong-item-left">
        <div
          className="overview__allsong-item-left-box"
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
        {/* <span className="overview__allsong-item-end-tym !text-white">
          <FaPhotoVideo />
        </span> */}
        <span
          onClick={() => handleClickAddMusic(song.encodeId)}
          className="overview__allsong-item-end-tym !text-white !text-3xl"
        >
          <MdPostAdd />
        </span>
        <span
          onClick={() => handleClickListenMusic(song.encodeId)}
          className="overview__allsong-item-end-tym !text-white !text-2xl"
        >
          <FaPlay />
        </span>
        {/* <span className="overview__allsong-item-end-tym">
          {/* <FaHeart />
        </span> */}
        <span
          onClick={() => navigate(`/song?id=${song.encodeId}`)}
          className="overview__allsong-item-end-tym !text-[white]"
        >
          <FaEye />
        </span>
      </div>
    </li>
  )
}

const OverviewSilder = (props) => {
  const [indexShow, setIndexShow] = useState(0)

  useEffect(() => {
    let a = setInterval(() => {
      if (props.songsRandom.length - 1 === indexShow) {
        setIndexShow(0)
      } else {
        setIndexShow((prev) => prev + 1)
      }
    }, 1000)
    return () => {
      clearInterval(a)
    }
  }, [indexShow, props.songsRandom.length])

  return (
    <div className="overview-slider">
      {props.songsRandom.map((song, index) => {
        if (indexShow === props.songsRandom.length - 2) {
          if (index === indexShow) {
            return (
              <img
                key={index}
                src={song.thumbnailM}
                alt="anh slider"
                className="option-all__song-slider-img option-all__song-slider-img-first"
              />
            )
          } else if (index === props.songsData.length - 1) {
            return (
              <img
                key={index}
                src={song.thumbnailM}
                alt="anh slider"
                className="option-all__song-slider-img option-all__song-slider-img-second"
              />
            )
          } else {
            return (
              <img
                key={index}
                src={song.thumbnailM}
                alt="anh slider"
                className="option-all__song-slider-img option-all__song-slider-img-third"
              />
            )
          }
        } else if (indexShow === props.songsData.length - 1) {
          if (index === indexShow) {
            return (
              <img
                key={index}
                src={song.thumbnailM}
                alt="anh slider"
                className="option-all__song-slider-img option-all__song-slider-img-first"
              />
            )
          } else if (index === 0) {
            return (
              <img
                key={index}
                src={song.thumbnailM}
                alt="anh slider"
                className="option-all__song-slider-img option-all__song-slider-img-second"
              />
            )
          } else {
            return (
              <img
                key={index}
                src={song.thumbnailM}
                alt="anh slider"
                className="option-all__song-slider-img option-all__song-slider-img-third"
              />
            )
          }
        } else {
          if (index === indexShow) {
            return (
              <img
                key={index}
                src={song.thumbnailM}
                alt="anh slider"
                className="option-all__song-slider-img option-all__song-slider-img-first"
              />
            )
          } else if (index === indexShow + 1) {
            return (
              <img
                key={index}
                src={song.thumbnailM}
                alt="anh slider"
                className="option-all__song-slider-img option-all__song-slider-img-second"
              />
            )
          } else {
            return (
              <img
                key={index}
                src={song.thumbnailM}
                alt="anh slider"
                className="option-all__song-slider-img option-all__song-slider-img-third"
              />
            )
          }
        }
      })}
    </div>
  )
}

export default function Overview() {
  const [songsRandom, setSongsRandom] = useState(null)
  const [home, setHome] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(URL.BASE_API_ENDPOINT + `/zing/get-random-song-list`)
      .then((res) => {
        setSongsRandom(res.data.data)
        setHome(res.data.home.data.items)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  const songsData = useSelector((state) => state.musicData.songsData)
  const indexSong = useSelector((state) => state.musicData.indexSong)
  return (
    <div className="overview">
      <div className="overview-option-song">
        <div className="overview-option-song__heading flex">
          <h3 className="p-0 m-[0 0 20px 0] text-[2rem] text-[white] ">
            Bài Hát
          </h3>
          <div className="overview-option-song__right ml-[auto] flex items-center">
            <div className="overview-option-song__right-more-list">
              <span>Tất cả</span>
              <div>
                <FaChevronRight></FaChevronRight>
              </div>
            </div>
            <div className="overview-option-song__right-upload hover:opacity-80">
              <span className="pr-2">
                <FaUpload></FaUpload>
              </span>
              <span>Tải lên</span>
            </div>
            <div className="overview-option-song__right-playall hover:opacity-80">
              <span className="pr-2">
                <FaUpload></FaUpload>
              </span>
              <span>Tải lên</span>
            </div>
          </div>
        </div>
        <Row className="mt-1">
          <Col span={8}>
            {songsRandom && (
              <OverviewSilder
                songsRandom={songsRandom}
                songsData={songsData}
              ></OverviewSilder>
            )}
          </Col>
          <Col span={16}>
            <div className="overview__allsong">
              {songsRandom && (
                <ul className="overview__allsong-list">
                  {songsRandom.map((song, index) => {
                    if (indexSong !== null) {
                      if (index === indexSong) {
                        return (
                          <ComponentSong
                            key={index}
                            index={index}
                            song={song}
                            isActive={true}
                          ></ComponentSong>
                        )
                      } else {
                        return (
                          <ComponentSong
                            key={index}
                            index={index}
                            song={song}
                            isActive={false}
                          ></ComponentSong>
                        )
                      }
                    } else {
                      return (
                        <ComponentSong
                          key={index}
                          index={index}
                          song={song}
                          isActive={false}
                        ></ComponentSong>
                      )
                    }
                  })}
                </ul>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
