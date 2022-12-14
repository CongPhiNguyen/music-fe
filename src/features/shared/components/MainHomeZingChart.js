import React, { useEffect, useState } from "react"
import "./MainHome.css"
import "./MainHomeZingChart.css"
import "../pages/ZingChart.css"
import {
  FaPhotoVideo,
  FaMicrophone,
  FaHeart,
  FaEye,
  FaEllipsisH
} from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { setCurrentSong, changeIsPlay } from "../musicSlice"
import { Row, Col } from "antd"
import axios from "axios"
import NavUser from "./NavUser"
import { useNavigate } from "react-router-dom"
import URL from "../../../api/config"
const ComponentSongZingChart = (props) => {
  const navigate = useNavigate()
  const isPlay = useSelector((state) => state.musicData.isPlay)
  const dispatch = useDispatch()
  const handleClickNextSong = () => {
    if (!props.isActive) {
      dispatch(setCurrentSong({ index: props.index }))
    }
  }
  return (
    <li className="zing-chart__song-item">
      <div className="zing-chart__song-item-left">
        <span className="zingchart__item-left-stt">{props.index + 1}</span>
        <span className="zingchart__item-left-line">-</span>
        <div
          className="overview__allsong-item-left-box zingchart__item-left-img "
          style={{ backgroundImage: `url(${props.song.thumbnail})` }}
        ></div>
        <div
          className="overview__allsong-item-body"
          onClick={() => {
            navigate(`/search?search=${props.song.name}`)
          }}
        >
          <h3 className="overview__allsong-item-body-name">
            {props.song.name}
          </h3>
          <span className="overview__allsong-item-body-singer">
            {props.song.name}
          </span>
        </div>
      </div>
      <div className="overview__allsong-item-center">
        <span>{props.song.alias} (Remix)</span>
      </div>
      <div className="overview__allsong-item-end">
        <span
          onClick={() => navigate(`/singer?id=${props.song.alias}`)}
          className="overview__allsong-item-end-more"
        >
          <FaEye></FaEye>
        </span>
      </div>
    </li>
  )
}

export default function MainHomeZingChart() {
  const [musicOutstanding, setMusicOutstanding] = useState([])
  const [vietNam, setVietNam] = useState([])
  const [chauA, setChauA] = useState([])
  const [chauAu, setChauAu] = useState([])
  useEffect(() => {
    const fetAPI = async () => {
      await axios
        .get(URL.BASE_API_ENDPOINT + "/user/top10")
        .then((res) => {
          setMusicOutstanding(
            res.data.data[0].items
              .map((item) => {
                return item.artists
              })
              .flat()
          )
          setVietNam(
            res.data.data[1].items
              .map((item) => {
                return item.artists
              })
              .flat()
          )
          setChauA(
            res.data.data[2].items
              .map((item) => {
                return item.artists
              })
              .flat()
          )
          setChauAu(
            res.data.data[3].items
              .map((item) => {
                return item.artists
              })
              .flat()
          )
        })
        .catch((err) => {
          console.log(err)
        })
    }
    fetAPI()
  }, [])
  const navigate = useNavigate()

  return (
    <div className="main-home">
      <NavUser></NavUser>
      <div className="zing-chart">
        <div className="zing-chart__heading">#P2Tune Chart</div>
        <ul style={{ listStyle: "none" }}>
          {musicOutstanding?.map((song, index) => {
            return (
              <ComponentSongZingChart
                key={index}
                index={index}
                song={song}
                isActive={false}
              ></ComponentSongZingChart>
            )
          })}
        </ul>
        <div className="zing-chart__week">B???ng X???p H???ng Tu???n top 20</div>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div className="zing-chart__week-vn">
              <span className="zing-chart__week-heading">Vi???t Nam</span>
              <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                {vietNam.map((song, key) => {
                  if (key < 20) {
                    return (
                      <li
                        key={key}
                        onClick={() => navigate(`/singer?id=${song.alias}`)}
                        className="zing-chart__week-item"
                      >
                        <span className="zingchart__item-left-stt">
                          {key + 1}
                        </span>
                        <span className="zingchart__item-left-line">-</span>
                        <div
                          className="overview__allsong-item-left-box zingchart__item-left-img "
                          style={{ backgroundImage: `url(${song.thumbnail})` }}
                        ></div>
                        <div className="overview__allsong-item-body">
                          <h3 className="overview__allsong-item-body-name">
                            {song.name}
                          </h3>
                          <span className="overview__allsong-item-body-singer">
                            {song.name}
                          </span>
                        </div>
                      </li>
                    )
                  }
                })}
              </ul>
            </div>
          </Col>
          <Col span={8}>
            <div className="zing-chart__week-vn">
              <span className="zing-chart__week-heading">US - UK</span>
              <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                {chauAu.map((song, key) => {
                  if (key < 20) {
                    return (
                      <li
                        key={key}
                        onClick={() => navigate(`/singer?id=${song.alias}`)}
                        className="zing-chart__week-item"
                      >
                        <span className="zingchart__item-left-stt">
                          {key + 1}
                        </span>
                        <span className="zingchart__item-left-line">-</span>
                        <div
                          className="overview__allsong-item-left-box zingchart__item-left-img "
                          style={{ backgroundImage: `url(${song.thumbnail})` }}
                        ></div>
                        <div className="overview__allsong-item-body">
                          <h3 className="overview__allsong-item-body-name">
                            {song.name}
                          </h3>
                          <span className="overview__allsong-item-body-singer">
                            {song.name}
                          </span>
                        </div>
                      </li>
                    )
                  }
                })}
              </ul>
            </div>
          </Col>
          <Col span={8}>
            <div className="zing-chart__week-vn">
              <span className="zing-chart__week-heading">Ch??u ??</span>
              <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                {chauA.map((song, key) => {
                  if (key < 20) {
                    return (
                      <li
                        key={key}
                        onClick={() => navigate(`/singer?id=${song.alias}`)}
                        className="zing-chart__week-item"
                      >
                        <span className="zingchart__item-left-stt">
                          {key + 1}
                        </span>
                        <span className="zingchart__item-left-line">-</span>
                        <div
                          className="overview__allsong-item-left-box zingchart__item-left-img "
                          style={{ backgroundImage: `url(${song.thumbnail})` }}
                        ></div>
                        <div className="overview__allsong-item-body">
                          <h3 className="overview__allsong-item-body-name">
                            {song.name}
                          </h3>
                          <span className="overview__allsong-item-body-singer">
                            {song.name}
                          </span>
                        </div>
                      </li>
                    )
                  }
                })}
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
