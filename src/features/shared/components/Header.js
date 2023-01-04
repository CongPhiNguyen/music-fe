import { message } from "antd"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { cookiesUtil } from "../../../utilities/cookiesUtils"
import { setCurrentUserInfo } from "../../authen/authenSlice"
const navItem = "border-[1px] p-[0.4em] inline-block mr-[1em] hover:opacity"

export default function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const makeClass = (isActive) => {
    return isActive
      ? `${navItem} bg-[#ffff92] text-[black]`
      : `${navItem} text-[black]`
  }
  const currentUserInfo = useSelector((state) => state.authen.currentUserInfo)
  return (
    <div className="p-[0.2rem] border-[1px] flex justify-between overflow-hidden h-[42px]">
      <div className="left-nav">
        <NavLink className={({ isActive }) => makeClass(isActive)} to="/">
          Home
        </NavLink>
      </div>
      {Object.keys(currentUserInfo).length === 0 ? (
        <div className="right-nav">
          <NavLink
            className={({ isActive }) => makeClass(isActive)}
            to="/login"
          >
            Login
          </NavLink>
          <NavLink
            className={({ isActive }) => makeClass(isActive)}
            to="/sign-up"
          >
            Sign up
          </NavLink>
        </div>
      ) : (
        <React.Fragment>
          {currentUserInfo?.username}
          <button
            className={({ isActive }) => makeClass(isActive)}
            onClick={() => {
              cookiesUtil.remove("jwt")
              navigate("/login")
              message.success("Đăng xuất thành công")
              dispatch(setCurrentUserInfo({}))
            }}
          >
            Log out
          </button>
        </React.Fragment>
      )}
    </div>
  )
}
