import React from 'react'
import { FaEllipsisH } from "react-icons/fa"
import { AiOutlineHeart } from "react-icons/ai"
import { BsPlayFill } from "react-icons/bs"
export default function SongComponent(props) {
    return (
        <div className={`next-song__item ${props.isActive && "next-song__item-active"}`}>
            <div className='next-song__item-img' style={{ backgroundImage: "url('./assets/img/songs/0.webp')" }}>
                <div className='next-song__item-play-btn'>
                    <BsPlayFill />
                </div>
            </div>
            <div className='next-song__item-body'>
                <span className='next-song__item-body-heading'>
                    Anh đã lạc vào
                </span>
                <span className='next-song__item-body-description'>
                    Green, Đại Mèo Remix
                </span>
            </div>
            <div className='next-song__item-action'>
                <span className='next-song__item-action-heart'>
                    <AiOutlineHeart />
                </span>
                <span className='next-song__item-action-dot'>
                    <FaEllipsisH />
                </span>
            </div>
        </div>
    )
}
