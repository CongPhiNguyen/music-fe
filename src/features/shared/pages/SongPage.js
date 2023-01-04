import React, { useEffect, useState } from "react"
import NavUser from "../components/NavUser"
import { useLocation } from "react-router-dom"
import { get } from "../../../api/axios"
import "./SongPage.css"
import { Row, Col, Spin } from "antd"
import { FaPlay, FaHeart } from "react-icons/fa"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addSongAndPlay } from "../musicSlice"
import URL from "../../../api/config"
export default function SongPage() {
  const dispatch = useDispatch()
  const location = useLocation()
  const [detail, setDetail] = useState(null)
  const username = useSelector((state) => state.authen.currentUserInfo.username)
  const [lyric, setLyric] = useState(null)
  useEffect(() => {
    const fetchApi = async () => {
      get(URL.BASE_API_ENDPOINT + "/zing/get-song-by-id" + location.search)
        .then((res) => {
          setDetail(res.data.detail.data)
          setLyric(res.data.lyric?.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    fetchApi()
  }, [])

  const handleListenToMusic = () => {
    axios
      .get(
        URL.BASE_API_ENDPOINT +
        `/zing/get-detail-song?idSong=${detail.encodeId}`
      )
      .then((res) => {
        const songSlice = {
          background: detail.thumbnail,
          name: detail.title,
          singer: detail.artistsNames,
          pathSong: res.data.detail.data[128],
          duration: detail.duration,
          id: detail.encodeId,
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
  if (!detail) return <Spin></Spin>

  return (
    <div className="main-home">
      <NavUser></NavUser>
      <div className="song-header">
        <Row>
          <Col span={7}>
            <img className="song-header-img" src={detail?.thumbnailM} />
          </Col>
          <Col span={16}>
            <div style={{ paddingTop: 50 }}>
              <div
                style={{ color: "white", fontWeight: "700", fontSize: "14px" }}
              >
                Song
              </div>
              <div
                style={{ color: "white", fontWeight: "700", fontSize: "60px" }}
              >
                {detail.title}
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  className="song-header-avt"
                  src={detail.artists[0].thumbnailM}
                  alt="Avatar"
                />
                <div className="song-header-singer-name">
                  {detail.artists[0].name} - {convertTime(detail.duration)}{" "}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="song-body">
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <div className="song-body-control">
              <div onClick={handleListenToMusic} className="song-body-play">
                <FaPlay></FaPlay>
              </div>
              <div className="song-body-heart">
                -{" "}
                <FaHeart
                  style={{ margin: "0 10px", color: "#ff4d4f" }}
                ></FaHeart>{" "}
                {detail.like}
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="overview__allsong">
              {lyric && (
                <OverviewSilder
                  songsRandom={lyric?.defaultIBGUrls}
                  songsData={lyric?.defaultIBGUrls}
                ></OverviewSilder>
              )}
            </div>
          </Col>
          <Col span={16}>
            <div className="lyric-title">Lyric:</div>
            {/* <pre
              className="lyric-content"
              dangerouslySetInnerHTML={{ __html: lyric.lyric }}
            ></pre> */}
            {
              lyric.sentences ? (<>
                {lyric.sentences.map((value, key) => {
                  return (
                    <div key={key} style={{ textAlign: "start", fontSize: "20px", paddingBottom: "15px", paddingLeft: "50px" }} className="music-control__left-content-song">
                      {value.words.map((item, key1) => {
                        return (
                          <span className={`word-lyric`} style={{ paddingRight: "10px" }} key={key1}>{item.data}</span>
                        )
                      })}
                    </div>
                  )
                })}
              </>) : (
                <div style={{ textAlign: "center", fontSize: "24px" }} className="music-control__left-content-song">
                  Bài hát hiện chưa có lời
                </div>
              )
            }
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
    }, 2000)
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
                src={song}
                alt="anh slider"
                className="option-all__song-slider-img option-all__song-slider-img-first"
              />
            )
          } else if (index === props.songsData.length - 1) {
            return (
              <img
                key={index}
                src={song}
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
                src={song}
                alt="anh slider"
                className="option-all__song-slider-img option-all__song-slider-img-first"
              />
            )
          } else if (index === 0) {
            return (
              <img
                key={index}
                src={song}
                alt="anh slider"
                className="option-all__song-slider-img option-all__song-slider-img-second"
              />
            )
          } else {
            return (
              <img
                key={index}
                src={song}
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
                src={song}
                alt="anh slider"
                className="option-all__song-slider-img option-all__song-slider-img-first"
              />
            )
          } else if (index === indexShow + 1) {
            return (
              <img
                key={index}
                src={song}
                alt="anh slider"
                className="option-all__song-slider-img option-all__song-slider-img-second"
              />
            )
          } else {
            return (
              <img
                key={index}
                src={song}
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
