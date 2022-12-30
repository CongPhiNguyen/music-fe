import React, { useState } from "react"
import "./Personal.css"
import { FaEllipsisH } from "react-icons/fa"
import Overview from "./Overview"
export default function Personal() {
  const [option, setOption] = useState("tongquan")

  return (
    <div className="main-home-personal">
      <div className="main-home-personal__profile">
        <img
          className="main-home-personal__profile-img"
          alt="user"
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        />
        <span className="main-home-personal__profile-name">Username</span>
        <div className="main-home-personal__profile-vip">
          {/* <span className='main-home-personal__profile-vip-upgrate'>Nâng cấp vip</span> */}
          {/* <span className='main-home-personal__profile-vip-entercode'>Nâng cấp vip</span> */}
          {/* <span className="main-home-personal__profile-vip-option">
            <FaEllipsisH></FaEllipsisH>
          </span> */}
        </div>
      </div>
      <div className="main-home-personal__option">
        {/* <ul className="main-home-personal__option-list">
          <li
            onClick={() => {
              setOption("tongquan")
            }}
            className={`main-home-personal__option-item ${
              option === "tongquan" && "main-home-personal__option-item-active"
            } `}
          >
            Tổng quan
          </li>
          <li
            onClick={() => {
              setOption("baihat")
            }}
            className={`main-home-personal__option-item ${
              option === "baihat" && "main-home-personal__option-item-active"
            } `}
          >
            Bài hát
          </li>
          <li
            onClick={() => {
              setOption("playlist")
            }}
            className={`main-home-personal__option-item ${
              option === "playlist" && "main-home-personal__option-item-active"
            } `}
          >
            PlayList
          </li>
          <li
            onClick={() => {
              setOption("nghesi")
            }}
            className={`main-home-personal__option-item ${
              option === "nghesi" && "main-home-personal__option-item-active"
            } `}
          >
            Nghệ sĩ
          </li>
          <li className="main-home-personal__option-item">
            <FaEllipsisH />
          </li>
        </ul> */}
      </div>
      <Overview></Overview>
    </div>
  )
}
