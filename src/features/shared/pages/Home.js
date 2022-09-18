import React from "react";
import "./Home.css"
import MusicControl from "../components/MusicControl";
import MainSidebar from "../components/MainSidebar";
import NextSong from "../components/NextSong";
import MainHome from "../components/MainHome";
export default function Home() {
  return <div className="w-screen h-screen home" style={{ backgroundImage: "url(./assets/img/background-theme/backroundThemes/0.svg)" }}>
    <div className="w-full">
      <MainSidebar></MainSidebar>
      <MainHome></MainHome>
      <NextSong></NextSong>
    </div>
    <MusicControl></MusicControl>
  </div>;
}
