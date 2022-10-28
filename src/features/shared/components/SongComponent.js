import React from 'react'
import { FaEllipsisH } from "react-icons/fa"
import { AiOutlineHeart } from "react-icons/ai"
import { BsPlayFill } from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentSong, changeIsPlay } from '../musicSlice'

export default function SongComponent(props) {
    const dispatch = useDispatch()
    const isPlay = useSelector(state => state.musicData.isPlay)
    const handleClickNextSong = () => {
        if (!props.isActive) {
            dispatch(setCurrentSong({ index: props.index }))
        }
    }

    return (
        <div className={`next-song__item ${props.isActive && "next-song__item-active"}`}>
            {
                props.isActive ? (
                    <div onClick={() => { dispatch(changeIsPlay()) }} className='next-song__item-img' style={{ backgroundImage: `url('${props.song.background}')` }}>
                        {
                            isPlay ? (
                                <div className='next-song__item-playing-box'>
                                    <img className='next-song__item-playing-box-img' alt='play' src='./assets/img/songs/icon-playing.gif' />
                                </div>
                            ) : (
                                <div className='next-song__item-play-btn !flex'>
                                    <BsPlayFill />
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <div onClick={handleClickNextSong} className='next-song__item-img' style={{ backgroundImage: `url('${props.song.background}')` }}>
                        <div className='next-song__item-play-btn'>
                            <BsPlayFill />
                        </div>
                    </div>
                )
            }
            <div className='next-song__item-body'>
                <span className='next-song__item-body-heading'>
                    {props.song.name}
                </span>
                <span className='next-song__item-body-description'>
                    {props.song.singer}
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
