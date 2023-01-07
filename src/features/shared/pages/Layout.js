import React from "react"
import MusicControl from "../components/MusicControl"
import MainSidebar from "../components/MainSidebar"
import NextSong from "../components/NextSong"
import "../components/MainHomeZingChart.css"
import "../components/Overview.css"
import { Outlet } from "react-router-dom"
import "./Home.css"
import "./ZingChart.css"
import "../components/MainHomeZingChart.css"
import "../components/Overview.css"
import { useSelector } from "react-redux"
import RadioController from "../../radio/components/RadioController"
export default function ZingChart() {
  const isRadioCurrent = useSelector((state) => state.audio.isRadioCurrent)
  const isPlayMusic = useSelector((state) => state.musicData.isPlay)
  return (
    <div
      className="w-screen h-screen home"
    // style={{
    //   backgroundImage:
    //     "url(./assets/img/background-theme/backroundThemes/0.svg)"
    // }}
    >
      <div className="w-full">
        <MainSidebar></MainSidebar>
        <Outlet></Outlet>
        <NextSong></NextSong>
      </div>
      {!isRadioCurrent ? (
        <MusicControl></MusicControl>
      ) : (
        <RadioController></RadioController>
      )}
    </div>
  )
}
