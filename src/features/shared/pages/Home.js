import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { get } from "../../../api/axios"
import URL from "../../../api/config"
import { setCurrentUserInfo } from "../../authen/authenSlice"
import MusicControl from "../components/MusicControl"
import MainSidebar from "../components/MainSidebar"
import NextSong from "../components/NextSong"
import MainHome from "../components/MainHome"
import "./Home.css"
export default function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    get(URL.URL_REFESH)
      .then((data) => {
        console.log("data", data)
        dispatch(setCurrentUserInfo({ username: data?.data?.username }))
      })
      .catch((err) => {
        console.log("err", err)
      })
  }, [])
  return (
    <div
      className="w-screen h-screen home"
      style={{
        backgroundImage:
          "url(./assets/img/background-theme/backroundThemes/0.svg)"
      }}
    >
      <div className="w-full">
        <MainSidebar></MainSidebar>
        <MainHome></MainHome>
        <NextSong></NextSong>
      </div>
      <MusicControl></MusicControl>
    </div>
  )
}
