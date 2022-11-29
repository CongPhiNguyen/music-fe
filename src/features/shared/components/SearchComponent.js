import axios from 'axios'
import React from 'react'
import { FaPhotoVideo, FaMicrophone, FaHeart, FaEllipsisH, FaPlay } from "react-icons/fa"

import "./SearchComponent.css"
const ComponentMusic = ({ song, key }) => {

    const handleClickListenMusic = (id) => {
        axios.get(`http://localhost:5050/api/v1/zing/get-detail-song?idSong=${id}`)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <li key={key} className='zing-chart__song-item'>
            <div className='zing-chart__song-item-left'>
                <div className='overview__allsong-item-left-box zingchart__item-left-img ' style={{ backgroundImage: `url(${song.thumbnail})` }}>
                </div>
                <div className='overview__allsong-item-body'>
                    <h3 className='overview__allsong-item-body-name'>
                        {song.title}
                    </h3>
                    <span className='overview__allsong-item-body-singer'>
                        {song.artistsNames}
                    </span>
                </div>
            </div>
            {/* <div className='overview__allsong-item-center'>
                <span>123</span>
            </div> */}
            <div className='overview__allsong-item-end'>
                <span className='overview__allsong-item-end-tym !text-white'>
                    <FaPhotoVideo />
                </span>
                <span className='overview__allsong-item-end-tym !text-white'>
                    <FaMicrophone />
                </span>
                <span onClick={() => handleClickListenMusic(song.encodeId)} className='overview__allsong-item-end-tym !text-white'>
                    <FaPlay />
                </span>
                <span className='overview__allsong-item-end-tym'>
                    <FaHeart />
                </span>
                <span className='overview__allsong-item-end-tym !text-white'>
                    <FaEllipsisH></FaEllipsisH>
                </span>
            </div>
        </li>
    )
}


export default function SearchComponent(props) {
    return (
        <div className='search-main'>
            <div className='zing-chart__heading'>Kết quả tìm kiếm</div>
            <ul style={{ listStyle: "none" }}>
                {
                    props?.songs?.map((song, key) => <ComponentMusic song={song} key={key}></ComponentMusic>)
                }
            </ul>
        </div>
    )
}
