import React, { useState } from "react"
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
import { GoRadioTower } from "react-icons/go"
import { AiTwotoneEdit } from "react-icons/ai"
import { GrFormAdd } from "react-icons/gr"
import { SiTestinglibrary } from "react-icons/si"

export default function MainSidebar() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState("home")

  return (
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
      <div className="sidebar__library-bot">
        <div className="sidebar__library-bot-title">PLAY LIST</div>
        <div className="sidebar__library-bot-item">
          Play list 1
          <span className="sidebar__library-bot-extra-option">
            <AiTwotoneEdit />
          </span>
        </div>
        <div className="sidebar__library-bot-item">
          Play list 2
          <span className="sidebar__library-bot-extra-option">
            <AiTwotoneEdit />
          </span>
        </div>
        <div className="sidebar__library-bot-item">
          Play list 3
          <span className="sidebar__library-bot-extra-option">
            <AiTwotoneEdit />
          </span>
        </div>
        <div className="sidebar__library-bot-item">
          Play list 4
          <span className="sidebar__library-bot-extra-option">
            <AiTwotoneEdit />
          </span>
        </div>
      </div>
      {/* </div> */}
      <div className="sildebar__add-playlist">
        <GrFormAdd
          style={{ color: "white", fontSize: "2rem", background: "white" }}
        />
        <span className="pl-4">Tạo playlist mới</span>
      </div>
    </div>
  )
}
