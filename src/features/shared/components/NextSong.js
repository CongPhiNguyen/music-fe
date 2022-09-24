import React from 'react'
import "./NextSong.css"
import { FaStopwatch, FaEllipsisH } from "react-icons/fa"
import SongComponent from './SongComponent'
import { useSelector } from 'react-redux'
export default function NextSong() {
    const songsData = useSelector(state => state.musicData.songsData)
    const indexSong = useSelector(state => state.musicData.indexSong)

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
                    {
                        songsData.map((song, index) => {
                            if (indexSong !== null) {
                                if (index <= indexSong) {
                                    if (index === indexSong) {
                                        return (<SongComponent key={index} index={index} song={song} isActive={true}></SongComponent>)
                                    } else {
                                        return (<SongComponent key={index} index={index} song={song} isActive={false}></SongComponent>)
                                    }
                                } else return null
                            } else {
                                return (<SongComponent key={index} index={index} song={song} isActive={false}></SongComponent>)
                            }
                        })
                    }
                </div>
                <div className='next-song__last'>
                    <h3 className='next-song__last-heading'>Tiếp theo</h3>
                    {
                        indexSong !== null && songsData.map((song, index) => {
                            if (index > indexSong) {
                                return (<SongComponent song={song} index={index} isActive={false}></SongComponent>)
                            } else return null
                        })
                    }
                </div>
            </div>
        </div>
    )
}
