import React, { useState } from "react"
import "./MainHome.css"
import {
  FaArrowLeft,
  FaArrowRight,
  FaSearch,
  FaTshirt,
  FaUpload,
  FaCog
} from "react-icons/fa"
import { BiLogIn } from "react-icons/bi"
import { useSelector, useDispatch } from "react-redux"
import { cookiesUtil } from "../../../utilities/cookiesUtils"
import { handleLogout, setCurrentUserInfo } from "../../authen/authenSlice"
import { useNavigate } from "react-router-dom"

export default function NavUser() {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  const isLogin = useSelector((state) => state.authen.isLogin)
  const dispatch = useDispatch()
  const handleSearch = () => {
    navigate(`/search?search=${search}`)
  }
  return (
    <div>
      <div className="main-home__header-wrapper">
        <div className="main-home__header">
          <div className="main-home__header-undo">
            <div onClick={() => navigate(-1)} className="main-home__header-undo-icon">
              <FaArrowLeft></FaArrowLeft>
            </div>
            <div onClick={() => navigate(1)} className="main-home__header-undo-icon">
              <FaArrowRight></FaArrowRight>
            </div>
          </div>
          <div className="main-home__header-search">
            <div
              onClick={handleSearch}
              className="main-home__header-search-icon cursor-pointer"
            >
              <FaSearch></FaSearch>
            </div>
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch()
                }
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV . . ."
              type="text"
              className="main-home__header-search-input"
            ></input>
          </div>
          <div className="main-home__header-right">
            {/* <div className="main-home__header-right-darkmode">
              <FaTshirt></FaTshirt>
            </div> */}
            {/* <div className="main-home__header-right-darkmode">
              <FaUpload></FaUpload>
            </div> */}
            {/* <div className="main-home__header-right-darkmode">
              <FaCog></FaCog>
            </div> */}
            {isLogin ? (
              <>
                <div
                  onClick={() => {
                    cookiesUtil.remove("jwt")
                    dispatch(setCurrentUserInfo({}))
                    dispatch(handleLogout())
                  }}
                  className="main-home__header-right-darkmode"
                >
                  <BiLogIn></BiLogIn>
                </div>
                <div className="main-home__header-right-user">
                  <img
                    alt="user"
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  />
                </div>
              </>
            ) : (
              <>
                <p
                  onClick={() => {
                    navigate("/login")
                  }}
                  className="btn-login"
                >
                  Login
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      {/* <div className="main-home__header-search">
        <div
          onClick={handleSearch}
          className="main-home__header-search-icon cursor-pointer"
        >
          <FaSearch></FaSearch>
        </div>
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch()
            }
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV . . ."
          type="text"
          class="main-home__header-search-input"
        ></input>
      </div>
      <div className="main-home__header-right">
        <div className="main-home__header-right-darkmode">
          <FaTshirt></FaTshirt>
        </div>
        <div className="main-home__header-right-darkmode">
          <FaUpload></FaUpload>
        </div>
        <div className="main-home__header-right-darkmode">
          <FaCog></FaCog>
        </div>
        {isLogin ? (
          <>
            <div
              onClick={() => {
                cookiesUtil.remove("jwt")
                dispatch(setCurrentUserInfo({}))
                dispatch(handleLogout())
              }}
              className="main-home__header-right-darkmode"
            >
              <BiLogIn></BiLogIn>
            </div>
            <div className="main-home__header-right-user">
              <img
                alt="user"
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              />
            </div>
          </>
        ) : (
          <>
            <p
              onClick={() => {
                navigate("/login")
              }}
              className="btn-login"
            >
              Login
            </p>
          </>
        )}
      </div> */}
    </div>
  )
}
