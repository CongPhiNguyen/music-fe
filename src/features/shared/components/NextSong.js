import React from 'react'
import "./NextSong.css"
import { FaStopwatch, FaEllipsisH } from "react-icons/fa"
import SongComponent from './SongComponent'
import { useDispatch, useSelector } from 'react-redux'
import { changeSelected } from '../musicSlice'
import { useState } from 'react'
export default function NextSong() {
    const dispatch = useDispatch()
    const selected = useSelector(state => state.musicData.selected)
    const songsData = useSelector(state => state.musicData?.songsData)
    const indexSong = useSelector(state => state.musicData?.indexSong)
    const isLogin = useSelector(state => state.authen.isLogin)
    const selectedPlaylist = useSelector(state => state.musicData.selectedPlaylist)
    return (
        <div className='next-song'>
            <div className='next-song__option'>
                <div className='next-song__option-wrapper'>
                    <div onClick={() => { if (isLogin) dispatch(changeSelected({ type: "PLAYLIST" })) }} className={`${selected === "PLAYLIST" ? "next-song__option-wrapper-list-play" : "next-song__option-wrapper-history"}`}>
                        Danh sách phát
                    </div>
                    <div onClick={() => { dispatch(changeSelected({ type: "HEARD_RECENTLY" })) }} className={`${selected === "HEARD_RECENTLY" ? "next-song__option-wrapper-list-play" : "next-song__option-wrapper-history"}`}>
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
            {
                selected === "HEARD_RECENTLY" ? (
                    <div className='next-song__box'>
                        {
                            songsData.length === 0 ? (
                                <h3 className='next-song__last-heading'>Bạn hiện chưa nghẹ nhạc</h3>
                            ) : (
                                <>
                                    <div className='next-song__list'>
                                        {
                                            songsData?.map((song, index) => {
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
                                            indexSong !== null && songsData?.map((song, index) => {
                                                if (index > indexSong) {
                                                    return (<SongComponent song={song} index={index} isActive={false}></SongComponent>)
                                                } else return null
                                            })
                                        }
                                    </div>
                                </>
                            )
                        }

                    </div>
                ) : (<>
                    {
                        selectedPlaylist ? (<div className='next-song__box'>
                            <h2 style={{ fontSize: "35px" }} className='next-song__last-heading'> {selectedPlaylist.playlistName}</h2>
                            {
                                songsData.length === 0 ? (
                                    <h3 className='next-song__last-heading'>Bạn hiện chưa nghẹ nhạc</h3>
                                ) : (
                                    <>
                                        <div className='next-song__list'>
                                            {
                                                songsData?.map((song, index) => {
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
                                                indexSong !== null && songsData?.map((song, index) => {
                                                    if (index > indexSong) {
                                                        return (<SongComponent song={song} index={index} isActive={false}></SongComponent>)
                                                    } else return null
                                                })
                                            }
                                        </div>
                                    </>
                                )
                            }

                        </div>) : (
                            <h3 className='next-song__last-heading'>Chọn một play list bất kỳ</h3>
                        )
                    }
                </>)
            }

        </div>
    )
}
