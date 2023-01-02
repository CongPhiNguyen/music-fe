import React, { useState } from "react"
import "./MainSidebar.css"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { PlayCircleFilled } from "@ant-design/icons"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import {
  BsFillBarChartLineFill,
  BsFillStarFill,
  BsFillUmbrellaFill
} from "react-icons/bs"
import { FaTrash } from "react-icons/fa"
import { Divider, message, Radio, Typography } from "antd"
import { GoRadioTower } from "react-icons/go"
import { AiTwotoneEdit } from "react-icons/ai"
import { GrFormAdd } from "react-icons/gr"
import { SiTestinglibrary } from "react-icons/si"
import { Modal } from "antd"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { useEffect } from "react"
import {
  setPlaylists,
  selectedPlaylistFunct,
  removePlaylist
} from "../musicSlice"

import { BiRadio } from "react-icons/bi"

export default function MainSidebar() {
  const isLogin = useSelector((state) => state.authen.isLogin)
  const username = useSelector(
    (state) => state?.authen?.currentUserInfo?.username
  )
  const playlists = useSelector((state) => state.musicData.playlists)
  const selectedPlaylist = useSelector(
    (state) => state.musicData.selectedPlaylist
  )
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selected, setSelected] = useState("home")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [namePlaylist, setNamePlayList] = useState("Enter name playlist here")
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  useEffect(() => {
    if (username) {
      axios
        .get(`http://localhost:5050/api/v1/playlist/${username}`)
        .then((res) => {
          dispatch(setPlaylists({ playlists: res.data.playlists }))
        })
        .catch((err) => {
          message.error(err.message)
        })
    }
  }, [])

  const handleCreatePlaylist = async () => {
    await axios
      .post(`http://localhost:5050/api/v1/playlist`, {
        username,
        playlistName: namePlaylist
      })
      .then((res) => {
        console.log(res)
        setNamePlayList("Enter name playlist here")
        axios
          .get(`http://localhost:5050/api/v1/playlist/${username}`)
          .then((res) => {
            dispatch(setPlaylists({ playlists: res.data.playlists }))
          })
          .catch((err) => {
            message.error(err.message)
          })
      })
      .catch((err) => {
        message.error(err.response.data.message)
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

  const confirm = (playlistName) => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure delete playlist "${playlistName}" ?`,
      okText: "Delete",
      cancelText: "Cancel",
      onOk: () => {
        console.log(playlistName)
        axios
          .post("http://localhost:5050/api/v1/playlist/delete-playlist", {
            username,
            playlistName
          })
          .then((res) => {
            message.success("Delete success")
            dispatch(removePlaylist({ playlistName }))
          })
          .catch((err) => {
            message.error(err.response.data.message)
          })
      }
    })
  }

  useEffect(() => {
    switch (location.pathname) {
      case "/zing-chart":
        setSelected("zing-chart")
        break
      case "/":
        setSelected("home")
        break
      case "/radio":
        setSelected("radio")
        break
      default:
        setSelected("home")
        break
    }
  }, [])

  return (
    <div>
      <div className="MainSidebar">
        <div
          className="sidebar__logo flex mt-[10px] "
          onClick={() => navigate("/")}
        >
          <img src="/logo.png" alt="" className="w-[40px] ml-[20px] h-[40px]" />
          <p className="text-[#fff] ml-[8px] mt-[6px] text-[600] text-[20px] hover:cursor-pointer">
            P2Tune
          </p>
        </div>
        <div className="sidebar__personal">
          <ul className="sidebar__personal-list">
            <li
              onClick={() => {
                setSelected("home")
                navigate("/")
              }}
              className={`sidebar__personal-item ${
                selected === "home" && "active"
              }`}
            >
              <NavLink className={"link"} to={"/"}>
                <PlayCircleFilled style={{ fontSize: "2.2rem" }} />
                <span className="pl-4">Cá Nhân</span>
              </NavLink>
            </li>
            <li
              onClick={() => {
                setSelected("radio")
                navigate("/radio")
              }}
              className={`sidebar__personal-item ${
                selected === "radio" && "active"
              }`}
            >
              <NavLink className={"link"} to={"/radio"}>
                <BiRadio style={{ fontSize: "2.2rem" }} />
                <span className="pl-4">Radio</span>
              </NavLink>
            </li>
            <li
              onClick={() => {
                setSelected("zing-chart")
                navigate("/zing-chart")
              }}
              className={`sidebar__personal-item ${
                selected === "zing-chart" && "active"
              }`}
            >
              <NavLink className={"link"} to={"/zing-chart"}>
                <BsFillBarChartLineFill style={{ fontSize: "2rem" }} />
                <span className="pl-4"> Bảng xếp hạng</span>
              </NavLink>
            </li>
            <li
              className="sidebar__library-top-item"
              onClick={() => navigate("/interactive")}
            >
              <NavLink className={"link"} to={"/interactive"}>
                <BsFillUmbrellaFill style={{ fontSize: "2.2rem" }} />
                <span className="pl-4">Interactive</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="sildebar__line"></div>
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
                  <div
                    onClick={() => confirm(playlist.playlistName)}
                    className="sidebar__library-bot-extra-option trash"
                  >
                    <FaTrash />
                  </div>
                  <div className="sidebar__library-bot-extra-option">
                    <AiTwotoneEdit />
                  </div>
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
