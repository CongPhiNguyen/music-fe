import React, { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import "./Overview.css"
import { FaChevronRight, FaUpload, FaPhotoVideo, FaMicrophone, FaHeart, FaEllipsisH, FaPlay } from "react-icons/fa"
import { Col, Row } from 'antd';
import { setCurrentSong, changeIsPlay } from '../musicSlice';

function ComponentSong(props) {
    const isPlay = useSelector(state => state.musicData.isPlay)
    const dispatch = useDispatch()
    const handleClickNextSong = () => {
        if (!props.isActive) {
            dispatch(setCurrentSong({ index: props.index }))
        }
    }
    return (<li className={`overview__allsong-item ${props.isActive && "overview__allsong-item-active"}`}>
        <div className='overview__allsong-item-left'>
            <div className='overview__allsong-item-left-box' style={{ backgroundImage: `url(${props.song.background})` }}>
                {
                    props.isActive ? (
                        <div onClick={() => { dispatch(changeIsPlay()) }}>
                            {
                                isPlay ? (<div className='overview__allsong-item-left-playing'>
                                    <img className='next-song__item-playing-box-img' src='./assets/img/songs/icon-playing.gif' />
                                </div>) : (
                                    <div className='overview__allsong-item-left-play'>
                                        <FaPlay />
                                    </div>
                                )
                            }
                        </div>
                    ) : (
                        <div onClick={handleClickNextSong} className='overview__allsong-item-left-play hover'>
                            <FaPlay />
                        </div>
                    )
                }

            </div>
            <div className='overview__allsong-item-body'>
                <h3 className='overview__allsong-item-body-name'>
                    {props.song.name}
                </h3>
                <span className='overview__allsong-item-body-singer'>
                    {props.song.singer}
                </span>
            </div>
        </div>
        <div className='overview__allsong-item-center'>
            <span>{props.song.name} (Remix)</span>
        </div>
        <div className='overview__allsong-item-end'>
            <span className='overview__allsong-item-end-mv'>
                <FaPhotoVideo />
            </span>
            <span className='overview__allsong-item-end-lyric'>
                <FaMicrophone />
            </span>
            <span className='overview__allsong-item-end-tym'>
                <FaHeart />
            </span>
            <span className='overview__allsong-item-end-duration'>
                {props.song.duration}
            </span>
            <span className='overview__allsong-item-end-more'>
                <FaEllipsisH></FaEllipsisH>
            </span>
        </div>
    </li>)
}

const OverviewSilder = (props) => {
    const [indexShow, setIndexShow] = useState(0);

    useEffect(() => {
        let a = setInterval(() => {
            if (props.songsData.length - 1 === indexShow) {
                setIndexShow(0)
            } else {
                setIndexShow(prev => prev + 1)
            }
        }, 1000)
        return () => { clearInterval(a) }
    }, [])

    return (<div className='overview-slider'>
        {
            props.songsData.map((song, index) => {
                if (indexShow === props.songsData.length - 2) {
                    if (index === indexShow) {
                        return (<img key={index} src={song.background} alt="anh slider" className="option-all__song-slider-img option-all__song-slider-img-first" />)
                    } else if (index === props.songsData.length - 1) {
                        return (<img key={index} src={song.background} alt="anh slider" className="option-all__song-slider-img option-all__song-slider-img-second" />)
                    } else {
                        return (<img key={index} src={song.background} alt="anh slider" className="option-all__song-slider-img option-all__song-slider-img-third" />)
                    }
                } else if (indexShow === props.songsData.length - 1) {
                    if (index === indexShow) {
                        return (<img key={index} src={song.background} alt="anh slider" className="option-all__song-slider-img option-all__song-slider-img-first" />)
                    } else if (index === 0) {
                        return (<img key={index} src={song.background} alt="anh slider" className="option-all__song-slider-img option-all__song-slider-img-second" />)
                    } else {
                        return (<img key={index} src={song.background} alt="anh slider" className="option-all__song-slider-img option-all__song-slider-img-third" />)
                    }
                } else {
                    if (index === indexShow) {
                        return (<img key={index} src={song.background} alt="anh slider" className="option-all__song-slider-img option-all__song-slider-img-first" />)
                    } else if (index === indexShow + 1) {
                        return (<img key={index} src={song.background} alt="anh slider" className="option-all__song-slider-img option-all__song-slider-img-second" />)
                    } else {
                        return (<img key={index} src={song.background} alt="anh slider" className="option-all__song-slider-img option-all__song-slider-img-third" />)
                    }
                }
            })
        }
    </div>)
}


export default function Overview() {
    const songsData = useSelector(state => state.musicData.songsData)
    const indexSong = useSelector(state => state.musicData.indexSong)
    return (
        <div className='overview'>
            <div className='overview-option-song'>
                <div className='overview-option-song__heading flex'>
                    <h3 className='p-0 m-[0 0 20px 0] text-[2rem] text-[white] '>Bài Hát</h3>
                    <div className='overview-option-song__right ml-[auto] flex items-center'>
                        <div className='overview-option-song__right-more-list'>
                            <span>Tất cả</span>
                            <div>
                                <FaChevronRight></FaChevronRight>
                            </div>
                        </div>
                        <div className='overview-option-song__right-upload hover:opacity-80'>
                            <span className='pr-2'><FaUpload></FaUpload></span>
                            <span>Tải lên</span>
                        </div>
                        <div className='overview-option-song__right-playall hover:opacity-80'>
                            <span className='pr-2'><FaUpload></FaUpload></span>
                            <span>Tải lên</span>
                        </div>
                    </div>
                </div>
                <Row>
                    <Col span={8}>
                        <OverviewSilder songsData={songsData}></OverviewSilder>
                    </Col>
                    <Col span={16}>
                        <div className='overview__allsong'>
                            <ul className='overview__allsong-list'>
                                {
                                    songsData.map((song, index) => {
                                        if (indexSong !== null) {
                                            if (index === indexSong) {
                                                return (<ComponentSong key={index} index={index} song={song} isActive={true}></ComponentSong>)
                                            } else {
                                                return (<ComponentSong key={index} index={index} song={song} isActive={false}></ComponentSong>)
                                            }
                                        } else {
                                            return (<ComponentSong key={index} index={index} song={song} isActive={false}></ComponentSong>)
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
