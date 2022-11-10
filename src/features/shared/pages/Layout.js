import React from "react";
import MusicControl from "../components/MusicControl";
import MainSidebar from "../components/MainSidebar";
import NextSong from "../components/NextSong";
import { Outlet } from "react-router-dom";
import "./Home.css"
export default function ZingChart() {
    return <div className="w-screen h-screen home" style={{ backgroundImage: "url(./assets/img/background-theme/backroundThemes/0.svg)" }}>
        <div className="w-full">
            <MainSidebar></MainSidebar>
            <Outlet></Outlet>
            <NextSong></NextSong>
        </div>
        <MusicControl></MusicControl>
    </div>
}
