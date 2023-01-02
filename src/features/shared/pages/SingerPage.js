import React, { useEffect, useState } from "react"
import "./ZingChart.css"
import { useLocation, useNavigate } from "react-router-dom"
import { get } from "../../../api/axios"
import "./SingerPage.css"
import NavUser from "../components/NavUser"
import { Row, Col, Spin } from "antd"
import { useSelector, useDispatch } from "react-redux"
import { FaEllipsisH, FaPlay, FaEye } from "react-icons/fa"
import { MdPostAdd } from "react-icons/md"
import { addSongAndPlay, addSong } from "../musicSlice"
import axios from "axios"

export default function SingerPage() {
  const [singerInfo, setSingerInfo] = useState(null)
  const location = useLocation()
  useEffect(() => {
    const fetchApi = async () => {
      get(
        "http://localhost:5050/api/v1/zing/get-singer-by-id" + location.search
      )
        .then((res) => {
          setSingerInfo(res.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    fetchApi()
  }, [location])

  if (!singerInfo) return <Spin></Spin>

  return (
    <div className="main-home">
      <NavUser></NavUser>
      <div className="singer-page">
        <Row gutter={[20, 20]}>
          <Col span={8}>
            <img
              className="singer-header-img"
              src={singerInfo?.thumbnailM}
              alt="Avatar"
            />
          </Col>
          <Col span={16}>
            <div style={{ paddingLeft: 30 }}>
              <p className="singer-name">{singerInfo?.name}</p>
              <p className="singer-birthday">
                {singerInfo?.birthday} - {singerInfo?.national}
              </p>
              <div style={{ marginBottom: "20px" }}>
                <span className="singer-follow">
                  {singerInfo.totalFollow} người quan tâm
                </span>
              </div>
              <div
                className="singer-biography"
                dangerouslySetInnerHTML={{ __html: singerInfo.biography }}
              ></div>
            </div>
          </Col>
          <Col span={8}>
            {singerInfo && (
              <OverviewSilder
                songsRandom={singerInfo?.sections[0]?.items}
                songsData={singerInfo?.sections[0]?.items}
              ></OverviewSilder>
            )}
          </Col>
          <Col span={16}>
            <div className="overview__allsong">
              {singerInfo && (
                <ul className="overview__allsong-list">
                  {singerInfo?.sections[0]?.items.map((song, index) => {
                    return (
                      <ComponentSong
                        key={index}
                        index={index}
                        song={song}
                        isActive={true}
                      ></ComponentSong>
                    )
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

const OverviewSilder = (props) => {
  const [indexShow, setIndexShow] = useState(0)

  useEffect(() => {
    let a = setInterval(() => {
      if (props.songsRandom?.length - 1 === indexShow) {
        setIndexShow(0)
      } else {
        setIndexShow((prev) => prev + 1)
      }
    }, 1500)
    return () => {
      clearInterval(a)
    }
  }, [indexShow, props.songsRandom?.length])

  return (
    <div className="overview-slider">
      {props.songsRandom?.map((song, index) => {
        if (indexShow === props.songsRandom?.length - 2) {
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

function ComponentSong({ song }) {
  const username = useSelector(
    (state) => state?.authen?.currentUserInfo?.username
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
          id
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
