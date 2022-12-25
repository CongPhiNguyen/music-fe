import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import "./Overview.css"
import {
  FaChevronRight,
  FaUpload,
  FaPhotoVideo,
  FaHeart,
  FaEllipsisH,
  FaPlay,
  FaPlus,
  FaTimes,
  FaRandom
} from "react-icons/fa"
import { MdPostAdd } from "react-icons/md"
import { Col, Row } from "antd"
import {
  setCurrentSong,
  changeIsPlay,
  addSongAndPlay,
  addSong
} from "../musicSlice"
import axios from "axios"

function ComponentSong({ song }) {
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
          duration: song.duration
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
          duration: song.duration
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
        <span className="overview__allsong-item-end-tym !text-[white]">
          <FaEllipsisH />
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
  useEffect(() => {
    axios
      .get(`http://localhost:5050/api/v1/zing/get-random-song-list`)
      .then((res) => {
        setSongsRandom(res.data.data)
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
      <div className="overview-option-playlist mb-2">
        <div className="overview-option-song__heading flex">
          <h3 className="p-0 m-[0 0 20px 0] text-[2rem] text-[white] ">
            Playlist
          </h3>
          <div className="overview-option-song__right ml-[auto] flex items-center">
            <div className="overview-option-song__right-more-list">
              <span>Tất cả</span>
              <div>
                <FaChevronRight></FaChevronRight>
              </div>
            </div>
          </div>
        </div>
        <ul className="overview-option-playlist__list">
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <li className="overview-option-playlist__item0">
                <div className="text-[4rem]">
                  <FaPlus />
                </div>
                <span>Tạo playlist</span>
              </li>
            </Col>
            <Col span={6}>
              <li className="overview-option-playlist__item cursor-pointer">
                <div className="overview-option-playlist__item-img-wrapper">
                  <div className="overview-option-playlist__item-img-wrapper-action">
                    <div className="overview-option-playlist__item-img-wrapper-action-1">
                      <FaTimes />
                    </div>
                    <div className="overview-option-playlist__item-img-wrapper-action-2">
                      <FaPlay />
                    </div>
                    <div className="overview-option-playlist__item-img-wrapper-action-3">
                      <FaEllipsisH />
                    </div>
                  </div>
                  <div
                    className="overview-option-playlist__item-img"
                    style={{
                      backgroundImage: "url(./assets/img/playlist/1.webp)"
                    }}
                  ></div>
                </div>
                <div className="overview-option-playlist__item-content">
                  <div className="overview-option-playlist__item-content-name">
                    Replay
                  </div>
                  <div className="overview-option-playlist__item-content-name1">
                    Lương Thiện Phước
                  </div>
                </div>
              </li>
            </Col>
            <Col span={6}>
              <li className="overview-option-playlist__item cursor-pointer">
                <div className="overview-option-playlist__item-img-wrapper">
                  <div className="overview-option-playlist__item-img-wrapper-action">
                    <div className="overview-option-playlist__item-img-wrapper-action-1">
                      <FaTimes />
                    </div>
                    <div className="overview-option-playlist__item-img-wrapper-action-2">
                      <FaPlay />
                    </div>
                    <div className="overview-option-playlist__item-img-wrapper-action-3">
                      <FaEllipsisH />
                    </div>
                  </div>
                  <div
                    className="overview-option-playlist__item-img"
                    style={{
                      backgroundImage: "url(./assets/img/playlist/2.webp)"
                    }}
                  ></div>
                </div>
                <div className="overview-option-playlist__item-content">
                  <div className="overview-option-playlist__item-content-name">
                    Replay
                  </div>
                  <div className="overview-option-playlist__item-content-name1">
                    Lương Thiện Phước
                  </div>
                </div>
              </li>
            </Col>
            <Col span={6}>
              <li className="overview-option-playlist__item cursor-pointer">
                <div className="overview-option-playlist__item-img-wrapper">
                  <div className="overview-option-playlist__item-img-wrapper-action">
                    <div className="overview-option-playlist__item-img-wrapper-action-1">
                      <FaTimes />
                    </div>
                    <div className="overview-option-playlist__item-img-wrapper-action-2">
                      <FaPlay />
                    </div>
                    <div className="overview-option-playlist__item-img-wrapper-action-3">
                      <FaEllipsisH />
                    </div>
                  </div>
                  <div
                    className="overview-option-playlist__item-img"
                    style={{
                      backgroundImage: "url(./assets/img/playlist/3.webp)"
                    }}
                  ></div>
                </div>
                <div className="overview-option-playlist__item-content">
                  <div className="overview-option-playlist__item-content-name">
                    Replay
                  </div>
                  <div className="overview-option-playlist__item-content-name1">
                    Lương Thiện Phước
                  </div>
                </div>
              </li>
            </Col>
          </Row>
        </ul>
      </div>
      <div className="overview-option-mv mb-2">
        <div className="overview-option-song__heading flex">
          <h3 className="p-0 m-[0 0 20px 0] text-[2rem] text-[white] ">MV</h3>
          <div className="overview-option-song__right ml-[auto] flex items-center">
            <div className="overview-option-song__right-more-list">
              <span>Tất cả</span>
              <div>
                <FaChevronRight></FaChevronRight>
              </div>
            </div>
          </div>
        </div>
        <ul className="overview-option-playlist__list">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <li className="overview-option-playlist__item cursor-pointer">
                <div className="overview-option-playlist__item-img-wrapper">
                  <div className="overview-option-playlist__item-img-wrapper-action overview-option-mv__item-wrapper">
                    <div className="overview-option-playlist__item-img-wrapper-action-2">
                      <FaPlay />
                    </div>
                  </div>
                  <div
                    className="overview-option-playlist__item-img overview-option-mv__item-img "
                    style={{ backgroundImage: "url(./assets/img/mv/1.webp)" }}
                  ></div>
                </div>
                <div className="overview-option-mv__content">
                  <img
                    src="./assets/img/mv/icon1.jpg"
                    alt="thanh hung"
                    className="overview-option-mv__content-img"
                  />
                  <div className="overview-option-mv__content-name">
                    <div className="overview-option-playlist__item-content-name">
                      Replay
                    </div>
                    <div className="overview-option-playlist__item-content-name1">
                      Lương Thiện Phước
                    </div>
                  </div>
                </div>
              </li>
            </Col>
            <Col span={8}>
              <li className="overview-option-playlist__item cursor-pointer">
                <div className="overview-option-playlist__item-img-wrapper">
                  <div className="overview-option-playlist__item-img-wrapper-action overview-option-mv__item-wrapper">
                    <div className="overview-option-playlist__item-img-wrapper-action-2">
                      <FaPlay />
                    </div>
                  </div>
                  <div
                    className="overview-option-playlist__item-img overview-option-mv__item-img "
                    style={{ backgroundImage: "url(./assets/img/mv/2.webp)" }}
                  ></div>
                </div>
                <div className="overview-option-mv__content">
                  <img
                    src="./assets/img/mv/icon2.jpg"
                    alt="thanh hung"
                    className="overview-option-mv__content-img"
                  />
                  <div className="overview-option-mv__content-name">
                    <div className="overview-option-playlist__item-content-name">
                      Replay
                    </div>
                    <div className="overview-option-playlist__item-content-name1">
                      Lương Thiện Phước
                    </div>
                  </div>
                </div>
              </li>
            </Col>
            <Col span={8}>
              <li className="overview-option-playlist__item cursor-pointer">
                <div className="overview-option-playlist__item-img-wrapper">
                  <div className="overview-option-playlist__item-img-wrapper-action overview-option-mv__item-wrapper">
                    <div className="overview-option-playlist__item-img-wrapper-action-2">
                      <FaPlay />
                    </div>
                  </div>
                  <div
                    className="overview-option-playlist__item-img overview-option-mv__item-img "
                    style={{ backgroundImage: "url(./assets/img/mv/3.webp)" }}
                  ></div>
                </div>
                <div className="overview-option-mv__content">
                  <img
                    src="./assets/img/mv/icon3.jpg"
                    alt="thanh hung"
                    className="overview-option-mv__content-img"
                  />
                  <div className="overview-option-mv__content-name">
                    <div className="overview-option-playlist__item-content-name">
                      Replay
                    </div>
                    <div className="overview-option-playlist__item-content-name1">
                      Lương Thiện Phước
                    </div>
                  </div>
                </div>
              </li>
            </Col>
          </Row>
        </ul>
      </div>
      <div className="overview-option-singer">
        <div className="overview-option-song__heading flex">
          <h3 className="p-0 m-[0 0 20px 0] text-[2rem] text-[white] ">
            Nghệ Sĩ
          </h3>
          <div className="overview-option-song__right ml-[auto] flex items-center">
            <div className="overview-option-song__right-more-list">
              <span>Tất cả</span>
              <div>
                <FaChevronRight></FaChevronRight>
              </div>
            </div>
          </div>
        </div>
        <ul className='overview-option-playlist__list'>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <li className='overview-option-playlist__item cursor-pointer'>
                <div className='overview-option-playlist__item-img-wrapper singer'>
                  <div className='overview-option-playlist__item-img-wrapper-action overview-option-mv__item-wrapper'>
                    <div className='overview-option-playlist__item-img-wrapper-action-2'>
                      <FaPlay />
                    </div>
                  </div>
                  <div className="overview-option-playlist__item-img overview-option-singer__item-img " style={{ backgroundImage: "url(./assets/img/singer/1.webp)" }}>
                  </div>
                </div>
                <div className='overview-option-singer__content'>
                  <div className='overview-option-playlist__item-content-name'>
                    Replay
                  </div>
                  <div className='overview-option-playlist__item-content-name1'>
                    Lương Thiện Phước
                  </div>
                  <div className='overview-option-singer__content-profile'>
                    <div className='overview-option-singer__content-profile-icon'>
                      <FaRandom />
                    </div>
                    <span className='pl-2 uppercase font-bold'>Góc nhạc</span>
                  </div>
                </div>
              </li>
            </Col>
            <Col span={6}>
              <li className='overview-option-playlist__item cursor-pointer'>
                <div className='overview-option-playlist__item-img-wrapper singer'>
                  <div className='overview-option-playlist__item-img-wrapper-action overview-option-mv__item-wrapper'>
                    <div className='overview-option-playlist__item-img-wrapper-action-2'>
                      <FaPlay />
                    </div>
                  </div>
                  <div className="overview-option-playlist__item-img overview-option-singer__item-img " style={{ backgroundImage: "url(./assets/img/singer/1.webp)" }}>
                  </div>
                </div>
                <div className='overview-option-singer__content'>
                  <div className='overview-option-playlist__item-content-name'>
                    Replay
                  </div>
                  <div className='overview-option-playlist__item-content-name1'>
                    Lương Thiện Phước
                  </div>
                  <div className='overview-option-singer__content-profile'>
                    <div className='overview-option-singer__content-profile-icon'>
                      <FaRandom />
                    </div>
                    <span className='pl-2 uppercase font-bold'>Góc nhạc</span>
                  </div>
                </div>
              </li>
            </Col>
            <Col span={6}>
              <li className='overview-option-playlist__item cursor-pointer'>
                <div className='overview-option-playlist__item-img-wrapper singer'>
                  <div className='overview-option-playlist__item-img-wrapper-action overview-option-mv__item-wrapper'>
                    <div className='overview-option-playlist__item-img-wrapper-action-2'>
                      <FaPlay />
                    </div>
                  </div>
                  <div className="overview-option-playlist__item-img overview-option-singer__item-img " style={{ backgroundImage: "url(./assets/img/singer/1.webp)" }}>
                  </div>
                </div>
                <div className='overview-option-singer__content'>
                  <div className='overview-option-playlist__item-content-name'>
                    Replay
                  </div>
                  <div className='overview-option-playlist__item-content-name1'>
                    Lương Thiện Phước
                  </div>
                  <div className='overview-option-singer__content-profile'>
                    <div className='overview-option-singer__content-profile-icon'>
                      <FaRandom />
                    </div>
                    <span className='pl-2 uppercase font-bold'>Góc nhạc</span>
                  </div>
                </div>
              </li>
            </Col>
            <Col span={6}>
              <li className='overview-option-playlist__item cursor-pointer'>
                <div className='overview-option-playlist__item-img-wrapper singer'>
                  <div className='overview-option-playlist__item-img-wrapper-action overview-option-mv__item-wrapper'>
                    <div className='overview-option-playlist__item-img-wrapper-action-2'>
                      <FaPlay />
                    </div>
                  </div>
                  <div className="overview-option-playlist__item-img overview-option-singer__item-img " style={{ backgroundImage: "url(./assets/img/singer/1.webp)" }}>
                  </div>
                </div>
                <div className='overview-option-singer__content'>
                  <div className='overview-option-playlist__item-content-name'>
                    Replay
                  </div>
                  <div className='overview-option-playlist__item-content-name1'>
                    Lương Thiện Phước
                  </div>
                  <div className='overview-option-singer__content-profile'>
                    <div className='overview-option-singer__content-profile-icon'>
                      <FaRandom />
                    </div>
                    <span className='pl-2 uppercase font-bold'>Góc nhạc</span>
                  </div>
                </div>
              </li>
            </Col>
          </Row>
        </ul>
      </div>
    </div>
  )
}
