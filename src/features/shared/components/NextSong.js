import React from 'react'
import "./NextSong.css"
import { FaStopwatch, FaEllipsisH } from "react-icons/fa"
import { AiOutlineHeart } from "react-icons/ai"
import { BsPlayFill } from "react-icons/bs"

import SongComponent from './SongComponent'
export default function NextSong() {
    return (
        <div className='next-song'>
            <div className='next-song__option'>
                <div className='next-song__option-wrapper'>
                    <div className='next-song__option-wrapper-list-play'>
                        Danh sách phát
                    </div>
                    <div className='next-song__option-wrapper-history'>
                        Nghe gần đây
                    </div>
                </div>
                <div className='next-song__option-alarm'>
                    <FaStopwatch className='next-song__option-alarm-icon' />
                </div>
                <div className='next-song__option-more'>
                    <FaEllipsisH className='next-song__option-alarm-icon'></FaEllipsisH>
                </div>
            </div>
            <div className='next-song__box'>
                <div className='next-song__list'>
                    <SongComponent></SongComponent>
                    <SongComponent></SongComponent>
                    <SongComponent isActive={true}></SongComponent>
                    <SongComponent></SongComponent>
                    <SongComponent></SongComponent>
                </div>
                <div className='next-song__last'>
                    <h3 className='next-song__last-heading'>Tiếp theo</h3>
                    <SongComponent></SongComponent>
                    <SongComponent></SongComponent>
                    <SongComponent></SongComponent>
                    <SongComponent></SongComponent>
                    <SongComponent></SongComponent>
                    <SongComponent></SongComponent>
                    <SongComponent></SongComponent>
                    <SongComponent></SongComponent>
                </div>
            </div>
        </div>
    )
}
