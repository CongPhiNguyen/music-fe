import React, { useState, useMemo } from "react"
import "./MainSidebar.css"
import { NavLink, useNavigate } from "react-router-dom"
import { PlayCircleFilled } from "@ant-design/icons"
import {
  FaCompactDisc,
  FaListAlt,
  FaMusic,
  FaBuromobelexperte,
  FaPhotoVideo
} from "react-icons/fa"
import {
  BsFillBarChartLineFill,
  BsFillStarFill,
  BsFillUmbrellaFill
} from "react-icons/bs"
import {
  CheckOutlined,
  HighlightOutlined,
  SmileFilled,
  SmileOutlined
} from "@ant-design/icons"
import { Divider, message, Radio, Typography } from "antd"
import { GoRadioTower } from "react-icons/go"
import { AiTwotoneEdit } from "react-icons/ai"
import { GrFormAdd } from "react-icons/gr"
import { SiTestinglibrary } from "react-icons/si"
import { Modal } from "antd"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { useEffect } from "react"
import { setPlaylists, selectedPlaylistFunct } from "../musicSlice"
export default function MainSidebar() {
  const isLogin = useSelector((state) => state.authen.isLogin)
  const username = useSelector((state) => state.authen.currentUserInfo.username)
  const playlists = useSelector((state) => state.musicData.playlists)
  const selectedPlaylist = useSelector(
    (state) => state.musicData.selectedPlaylist
  )
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selected, setSelected] = useState("home")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [namePlaylist, setNamePlayList] = useState("Enter name playlist here")
  useEffect(() => {
    axios
      .get(`http://localhost:5050/api/v1/playlist/${username}`)
      .then((res) => {
        dispatch(setPlaylists({ playlists: res.data.playlists }))
      })
      .catch((err) => {
        message.error(err.message)
      })
  }, [])

  const handleCreatePlaylist = async () => {
    await axios
      .post(`http://localhost:5050/api/v1/playlist`, {
        username,
        playlistName: namePlaylist
      })
      .then((res) => {
        setNamePlayList("Enter name playlist here")
      })
      .catch((err) => {
        message.error(err.message)
      })

    handleCancel()
  }
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setNamePlayList("Enter name playlist here")
    setIsModalOpen(false)
  }
  return (
    <div>
      <div className="MainSidebar">
        <div
          className="sidebar__logo flex mt-[10px] "
          onClick={() => navigate("/")}
        >
          <img src="/logo.png" alt="" className="w-[40px] ml-[20px] h-[40px]" />
          <p className="text-[#fff] ml-[10px] mt-[6px] text-[600] text-[20px] hover:cursor-pointer">
            P2Tune
          </p>
        </div>
        <div className="sidebar__personal">
          <ul className="sidebar__personal-list">
            <li
              onClick={() => {
                setSelected("home")
              }}
              className={`sidebar__personal-item ${
                selected === "home" && "active"
              }`}
            >
              <NavLink className={"link"} to={"/"}>
                <PlayCircleFilled style={{ fontSize: "2.2rem" }} />
                <span className="pl-4"> Cá Nhân</span>
              </NavLink>
            </li>
            {/* <li className="sidebar__personal-item">
            <NavLink className={"link"} to={"/home"}>
              <FaCompactDisc style={{ fontSize: "2.2rem" }} />
              <span className="pl-4"> Khám Phá</span>
            </NavLink>
          </li> */}
            {/* <li className="sidebar__personal-item">
            <NavLink className={"link"} to={"/home"}>
              <FaListAlt style={{ fontSize: "2rem" }} />
              <span className="pl-4"> Theo Dõi</span>
            </NavLink>
          </li> */}
            <li
              onClick={() => {
                setSelected("zing-chart")
              }}
              className={`sidebar__personal-item ${
                selected === "zing-chart" && "active"
              }`}
            >
              <NavLink className={"link"} to={"/zing-chart"}>
                <BsFillBarChartLineFill style={{ fontSize: "2rem" }} />
                <span className="pl-4"> #zingchart</span>
              </NavLink>
            </li>
            <li className="sidebar__library-top-item">
              <NavLink className={"link"} to={"/interactive"}>
                <BsFillUmbrellaFill style={{ fontSize: "2.2rem" }} />
                <span className="pl-4">Interactive</span>
              </NavLink>
            </li>
            <li className="sidebar__library-top-item">
              <NavLink className={"link"} to={"/test"}>
                <SiTestinglibrary style={{ fontSize: "2.2rem" }} />
                <span className="pl-4">Test</span>
              </NavLink>
            </li>
            {/* <li className="sidebar__personal-item">
            <NavLink className={"link"} to={"/"}>
              <GoRadioTower style={{ fontSize: "2.2rem" }} />
              <span className="pl-4"> Radio</span>
            </NavLink>
          </li> */}
          </ul>
        </div>
        <div className="sildebar__line"></div>
        {/* <div className="sildebar__library">
        <div className="sidebar__library-top">
          <ul className="sidebar__library-top-list">
            <li className="sidebar__library-top-item">
              <NavLink className={"link"} to={"/"}>
                <FaMusic style={{ fontSize: "2.2rem" }} />
                <span className="pl-4"> Nhạc Mới</span>
              </NavLink>
            </li>
            <li className="sidebar__library-top-item">
              <NavLink className={"link"} to={"/"}>
                <FaBuromobelexperte style={{ fontSize: "2.2rem" }} />
                <span className="pl-4"> Thể Loại</span>
              </NavLink>
            </li>
            <li className="sidebar__library-top-item">
              <NavLink className={"link"} to={"/"}>
                <BsFillStarFill style={{ fontSize: "2.2rem" }} />
                <span className="pl-4"> Top 100</span>
              </NavLink>
            </li>
            <li className="sidebar__library-top-item">
              <NavLink className={"link"} to={"/"}>
                <FaPhotoVideo style={{ fontSize: "2.2rem" }} />
                <span className="pl-4"> MV</span>
              </NavLink>
            </li>
          </ul>
        </div>
        {/* <div className="sidebar__library-center">
          <span className="sidebar__library-center-heading">
            Nghe nhạc không quảng cáo cùng kho nhạc VIP
          </span>
          <span className="sidebar__library-center-vip">Nâng cấp vip</span>
        </div> */}
        {isLogin && (
          <div className="sidebar__library-bot">
            <div className="sidebar__library-bot-title">PLAY LIST</div>
            {playlists?.map((playlist, key) => {
              return (
                <div
                  key={key}
                  onClick={() => {
                    dispatch(selectedPlaylistFunct({ _id: playlist._id }))
                  }}
                  className={`sidebar__library-bot-item sidebar__personal-item ${
                    playlist?._id === selectedPlaylist?._id && "active"
                  }`}
                >
                  {playlist.playlistName}
                  <span className="sidebar__library-bot-extra-option">
                    <AiTwotoneEdit />
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
      {isLogin && (
        <>
          <div onClick={showModal} className="sildebar__add-playlist">
            <GrFormAdd
              style={{ color: "white", fontSize: "2rem", background: "white" }}
            />
            <span className="pl-4">Tạo playlist mới</span>
          </div>
          <Modal
            className="modal-create-playlist"
            title="Playlist"
            open={isModalOpen}
            footer={[
              <div className="flex justify-end">
                <div
                  className="btn-create"
                  color="red"
                  key="create"
                  onClick={handleCreatePlaylist}
                >
                  Tạo
                </div>
                <div
                  className="btn-create cancel"
                  color="red"
                  key="back"
                  onClick={handleCancel}
                >
                  Hủy
                </div>
              </div>
            ]}
            onCancel={handleCancel}
          >
            <div className="flex">
              <Typography.Title
                editable={{
                  onChange: (string) => {
                    setNamePlayList(string)
                  },
                  maxLength: 30,
                  text: namePlaylist
                }}
                level={5}
                style={{
                  margin: 0,
                  color: "white"
                }}
              >
                {namePlaylist}
              </Typography.Title>
            </div>
          </Modal>
        </>
      )}
    </div>
  )
}
