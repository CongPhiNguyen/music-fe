import React, { useEffect, useState } from 'react'
import "./MainHome.css"
import "./MainHomeZingChart.css"
import "../pages/ZingChart.css"
import { FaPhotoVideo, FaMicrophone, FaHeart, FaEllipsisH } from "react-icons/fa"
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentSong, changeIsPlay } from '../musicSlice'
import { Row, Col } from "antd"
import axios from 'axios'
import NavUser from './NavUser'
// const ComponentSongZingChart = (props) => {

//     const isPlay = useSelector(state => state.musicData.isPlay)
//     const dispatch = useDispatch()
//     const handleClickNextSong = () => {
//         if (!props.isActive) {
//             dispatch(setCurrentSong({ index: props.index }))
//         }
//     }
//     return (
//         <li className='zing-chart__song-item'>
//             <div className='zing-chart__song-item-left'>
//                 <span className='zingchart__item-left-stt'>{props.index + 1}</span>
//                 <span className='zingchart__item-left-line'>-</span>
//                 <div className='overview__allsong-item-left-box zingchart__item-left-img ' style={{ backgroundImage: `url(${props.song.background})` }}>
//                     {
//                         props.isActive ? (
//                             <div onClick={() => { dispatch(changeIsPlay()) }}>
//                                 {
//                                     isPlay ? (<div className='overview__allsong-item-left-playing'>
//                                         <img className='next-song__item-playing-box-img' alt='ảnh' src='./assets/img/songs/icon-playing.gif' />
//                                     </div>) : (
//                                         <div className='overview__allsong-item-left-play'>
//                                             <FaPlay />
//                                         </div>
//                                     )
//                                 }
//                             </div>
//                         ) : (
//                             <div onClick={handleClickNextSong} className='overview__allsong-item-left-play hover'>
//                                 <FaPlay />
//                             </div>
//                         )
//                     }

//                 </div>
//                 <div className='overview__allsong-item-body'>
//                     <h3 className='overview__allsong-item-body-name'>
//                         {props.song.name}
//                     </h3>
//                     <span className='overview__allsong-item-body-singer'>
//                         {props.song.singer}
//                     </span>
//                 </div>
//             </div>
//             <div className='overview__allsong-item-center'>
//                 <span>{props.song.name} (Remix)</span>
//             </div>
//             <div className='overview__allsong-item-end'>
//                 <span className='overview__allsong-item-end-mv'>
//                     <FaPhotoVideo />
//                 </span>
//                 <span className='overview__allsong-item-end-lyric'>
//                     <FaMicrophone />
//                 </span>
//                 <span className='overview__allsong-item-end-tym'>
//                     <FaHeart />
//                 </span>
//                 <span className='overview__allsong-item-end-duration'>
//                     {props.song.duration}
//                 </span>
//                 <span className='overview__allsong-item-end-more'>
//                     <FaEllipsisH></FaEllipsisH>
//                 </span>
//             </div>
//         </li>
//     )
// }

const ComponentSongZingChart = (props) => {
    const isPlay = useSelector(state => state.musicData.isPlay)
    const dispatch = useDispatch()
    const handleClickNextSong = () => {
        if (!props.isActive) {
            dispatch(setCurrentSong({ index: props.index }))
        }
    }
    return (
        <li className='zing-chart__song-item'>
            <div className='zing-chart__song-item-left'>
                <span className='zingchart__item-left-stt'>{props.index + 1}</span>
                <span className='zingchart__item-left-line'>-</span>
                <div className='overview__allsong-item-left-box zingchart__item-left-img ' style={{ backgroundImage: `url(${props.song.thumbnail})` }}>
                    {/* {
                        props.isActive ? (
                            <div onClick={() => { dispatch(changeIsPlay()) }}>
                                {
                                    isPlay ? (<div className='overview__allsong-item-left-playing'>
                                        <img className='next-song__item-playing-box-img' alt='ảnh' src='./assets/img/songs/icon-playing.gif' />
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
                    } */}
                </div>
                <div className='overview__allsong-item-body'>
                    <h3 className='overview__allsong-item-body-name'>
                        {props.song.name}
                    </h3>
                    <span className='overview__allsong-item-body-singer'>
                        {props.song.name}
                    </span>
                </div>
            </div>
            <div className='overview__allsong-item-center'>
                <span>{props.song.alias} (Remix)</span>
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
                    {/* {props.song.duration} */}
                </span>
                <span className='overview__allsong-item-end-more'>
                    <FaEllipsisH></FaEllipsisH>
                </span>
            </div>
        </li>
    )
}

export default function MainHomeZingChart() {
    const [musicOutstanding, setMusicOutstanding] = useState([])
    const [vietNam, setVietNam] = useState([])
    const [chauA, setChauA] = useState([])
    const [chauAu, setChauAu] = useState([])
    useEffect(() => {
        const fetAPI = async () => {
            await axios.get("http://localhost:5050/api/v1/user/top10")
                .then(res => {
                    setMusicOutstanding(res.data.data[0].items.map((item => {
                        return item.artists
                    })).flat())
                    setVietNam(res.data.data[1].items.map((item => {
                        return item.artists
                    })).flat())
                    setChauA(res.data.data[2].items.map((item => {
                        return item.artists
                    })).flat())
                    setChauAu(res.data.data[3].items.map((item => {
                        return item.artists
                    })).flat())
                })
                .catch(err => {
                    console.log(err)
                })

            await axios.get("http://localhost:5050/api/v1/user/test")
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetAPI()
    }, [])



    const songsData = useSelector(state => state.musicData.songsData)
    const indexSong = useSelector(state => state.musicData.indexSong)
    return (
        <div className='main-home'>
            <NavUser></NavUser>
            <div className='zing-chart'>
                <div className='zing-chart__heading'>#zingchart</div>
                <ul style={{ listStyle: "none" }}>
                    {/* {
                        songsData.map((song, index) => {
                            if (indexSong !== null) {
                                if (index === indexSong) {
                                    return (<ComponentSongZingChart key={index} index={index} song={song} isActive={true}></ComponentSongZingChart>)
                                } else {
                                    return (<ComponentSongZingChart key={index} index={index} song={song} isActive={false}></ComponentSongZingChart>)
                                }
                            } else {
                                return (<ComponentSongZingChart key={index} index={index} song={song} isActive={false}></ComponentSongZingChart>)
                            }
                        })
                    } */}
                    {
                        musicOutstanding?.map((song, index) => {
                            return (<ComponentSongZingChart key={index} index={index} song={song} isActive={false}></ComponentSongZingChart>)
                        })
                    }
                </ul>
                <div className='zing-chart__100more'>
                    <span className='zingchart__100more-body'>Xem top 100</span>
                </div>
                <div className='zing-chart__week'>Bảng Xếp Hạng Tuần</div>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <div className='zing-chart__week-vn'>
                            <span className='zing-chart__week-heading'>Việt Nam</span>
                            <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                                {
                                    vietNam.map((song, key) => {
                                        if (key < 5) {
                                            return (
                                                <li key={key} className='zing-chart__week-item'>
                                                    <span className='zingchart__item-left-stt'>{key + 1}</span>
                                                    <span className='zingchart__item-left-line'>-</span>
                                                    <div className='overview__allsong-item-left-box zingchart__item-left-img ' style={{ backgroundImage: `url(${song.thumbnail})` }}></div>
                                                    <div className='overview__allsong-item-body'>
                                                        <h3 className='overview__allsong-item-body-name'>
                                                            {song.name}
                                                        </h3>
                                                        <span className='overview__allsong-item-body-singer'>
                                                            {song.name}
                                                        </span>
                                                    </div>
                                                </li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                            <div style={{ margin: 0 }} className='zing-chart__100more'>
                                <span className='zingchart__100more-body'>Xem tất cả</span>
                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className='zing-chart__week-vn'>
                            <span className='zing-chart__week-heading'>US - UK</span>
                            <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                                {
                                    chauAu.map((song, key) => {
                                        if (key < 5) {
                                            return (
                                                <li key={key} className='zing-chart__week-item'>
                                                    <span className='zingchart__item-left-stt'>{key + 1}</span>
                                                    <span className='zingchart__item-left-line'>-</span>
                                                    <div className='overview__allsong-item-left-box zingchart__item-left-img ' style={{ backgroundImage: `url(${song.thumbnail})` }}></div>
                                                    <div className='overview__allsong-item-body'>
                                                        <h3 className='overview__allsong-item-body-name'>
                                                            {song.name}
                                                        </h3>
                                                        <span className='overview__allsong-item-body-singer'>
                                                            {song.name}
                                                        </span>
                                                    </div>
                                                </li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                            <div style={{ margin: 0 }} className='zing-chart__100more'>
                                <span className='zingchart__100more-body'>Xem tất cả</span>
                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className='zing-chart__week-vn'>
                            <span className='zing-chart__week-heading'>Châu Á</span>
                            <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                                {
                                    chauA.map((song, key) => {
                                        if (key < 5) {
                                            return (
                                                <li key={key} className='zing-chart__week-item'>
                                                    <span className='zingchart__item-left-stt'>{key + 1}</span>
                                                    <span className='zingchart__item-left-line'>-</span>
                                                    <div className='overview__allsong-item-left-box zingchart__item-left-img ' style={{ backgroundImage: `url(${song.thumbnail})` }}></div>
                                                    <div className='overview__allsong-item-body'>
                                                        <h3 className='overview__allsong-item-body-name'>
                                                            {song.name}
                                                        </h3>
                                                        <span className='overview__allsong-item-body-singer'>
                                                            {song.name}
                                                        </span>
                                                    </div>
                                                </li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                            <div style={{ margin: 0 }} className='zing-chart__100more'>
                                <span className='zingchart__100more-body'>Xem tất cả</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div >
    )
}
