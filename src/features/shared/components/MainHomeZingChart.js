import React from 'react'
import "./MainHome.css"
import "./MainHomeZingChart.css"
import { FaArrowLeft, FaArrowRight, FaSearch, FaTshirt, FaUpload, FaPlay, FaCog, FaPhotoVideo, FaMicrophone, FaHeart, FaEllipsisH } from "react-icons/fa"
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentSong, changeIsPlay } from '../musicSlice'
import { Row, Col } from "antd"
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
                <div className='overview__allsong-item-left-box zingchart__item-left-img ' style={{ backgroundImage: `url(${props.song.background})` }}>
                    {
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
        </li>
    )
}

export default function MainHomeZingChart() {
    const songsData = useSelector(state => state.musicData.songsData)
    const indexSong = useSelector(state => state.musicData.indexSong)
    return (
        <div className='main-home'>
            <div className='main-home__header-wrapper'>
                <div className='main-home__header'>
                    <div className='main-home__header-undo'>
                        <div className='main-home__header-undo-icon'>
                            <FaArrowLeft  ></FaArrowLeft>
                        </div>
                        <div className='main-home__header-undo-icon'>
                            <FaArrowRight></FaArrowRight>
                        </div>
                    </div>
                    <div className='main-home__header-search'>
                        <div className='main-home__header-search-icon'>
                            <FaSearch></FaSearch>
                        </div>
                        <input placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV . . ." type="text" class="main-home__header-search-input"></input>
                    </div>
                    <div className='main-home__header-right'>
                        <div className='main-home__header-right-darkmode'>
                            <FaTshirt></FaTshirt>
                        </div>
                        <div className='main-home__header-right-darkmode'>
                            <FaUpload></FaUpload>
                        </div>
                        <div className='main-home__header-right-darkmode'>
                            <FaCog></FaCog>
                        </div>

                        <div className='main-home__header-right-user'>
                            <img alt='user' src='https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.6435-9/149261868_2662651750692098_1649444713054646857_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=4qEHkg4TpyYAX_AbTfW&_nc_ht=scontent.fsgn5-6.fna&oh=00_AT-qa1HN260fand9ODHVY5VkTK8kVdzODazbopBjZGmjbg&oe=635417F3' />
                        </div>
                    </div>

                </div>
            </div>
            <div className='zing-chart'>
                <div className='zing-chart__heading'>#zingchart</div>
                <ul style={{ listStyle: "none" }}>
                    {
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
                                <li className='zing-chart__week-item'>
                                    <span className='zingchart__item-left-stt'>{1}</span>
                                    <span className='zingchart__item-left-line'>-</span>
                                    <div className='overview__allsong-item-left-box zingchart__item-left-img ' style={{ backgroundImage: `url(./assets/img/songs/0.webp)` }}></div>
                                    <div className='overview__allsong-item-body'>
                                        <h3 className='overview__allsong-item-body-name'>
                                            aaa
                                        </h3>
                                        <span className='overview__allsong-item-body-singer'>
                                            aaa
                                        </span>
                                    </div>
                                </li>
                                <li className='zing-chart__week-item'>
                                    <span className='zingchart__item-left-stt'>{2}</span>
                                    <span className='zingchart__item-left-line'>-</span>
                                    <div className='overview__allsong-item-left-box zingchart__item-left-img ' style={{ backgroundImage: `url(./assets/img/songs/1.webp)` }}></div>
                                    <div className='overview__allsong-item-body'>
                                        <h3 className='overview__allsong-item-body-name'>
                                            aaa
                                        </h3>
                                        <span className='overview__allsong-item-body-singer'>
                                            aaa
                                        </span>
                                    </div>
                                </li>
                                <li className='zing-chart__week-item'>
                                    <span className='zingchart__item-left-stt'>{3}</span>
                                    <span className='zingchart__item-left-line'>-</span>
                                    <div className='overview__allsong-item-left-box zingchart__item-left-img ' style={{ backgroundImage: `url(./assets/img/songs/3.webp)` }}></div>
                                    <div className='overview__allsong-item-body'>
                                        <h3 className='overview__allsong-item-body-name'>
                                            aaa
                                        </h3>
                                        <span className='overview__allsong-item-body-singer'>
                                            aaa
                                        </span>
                                    </div>
                                </li>
                                <li className='zing-chart__week-item'>
                                    <span className='zingchart__item-left-stt'>{4}</span>
                                    <span className='zingchart__item-left-line'>-</span>
                                    <div className='overview__allsong-item-left-box zingchart__item-left-img ' style={{ backgroundImage: `url(./assets/img/songs/4.webp)` }}></div>
                                    <div className='overview__allsong-item-body'>
                                        <h3 className='overview__allsong-item-body-name'>
                                            aaa
                                        </h3>
                                        <span className='overview__allsong-item-body-singer'>
                                            aaa
                                        </span>
                                    </div>
                                </li>
                                <li className='zing-chart__week-item'>
                                    <span className='zingchart__item-left-stt'>{5}</span>
                                    <span className='zingchart__item-left-line'>-</span>
                                    <div className='overview__allsong-item-left-box zingchart__item-left-img ' style={{ backgroundImage: `url(./assets/img/songs/5.webp)` }}></div>
                                    <div className='overview__allsong-item-body'>
                                        <h3 className='overview__allsong-item-body-name'>
                                            aaa
                                        </h3>
                                        <span className='overview__allsong-item-body-singer'>
                                            aaa
                                        </span>
                                    </div>
                                </li>
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
                                <li className='zing-chart__week-item'>
                                    <span className='zingchart__item-left-stt'>{1}</span>
                                    <span className='zingchart__item-left-line'>-</span>
                                    <div className='overview__allsong-item-left-box zingchart__item-left-img ' style={{ backgroundImage: `url(./assets/img/songs/0.webp)` }}></div>
                                    <div className='overview__allsong-item-body'>
                                        <h3 className='overview__allsong-item-body-name'>
                                            aaa
                                        </h3>
                                        <span className='overview__allsong-item-body-singer'>
                                            aaa
                                        </span>
                                    </div>
                                </li>
                                <li className='zing-chart__week-item'>
                                    <span className='zingchart__item-left-stt'>{2}</span>
                                    <span className='zingchart__item-left-line'>-</span>
                                    <div className='overview__allsong-item-left-box zingchart__item-left-img ' style={{ backgroundImage: `url(./assets/img/songs/1.webp)` }}></div>
                                    <div className='overview__allsong-item-body'>
                                        <h3 className='overview__allsong-item-body-name'>
                                            aaa
                                        </h3>
                                        <span className='overview__allsong-item-body-singer'>
                                            aaa
                                        </span>
                                    </div>
                                </li>
                                <li className='zing-chart__week-item'>
                                    <span className='zingchart__item-left-stt'>{3}</span>
                                    <span className='zingchart__item-left-line'>-</span>
                                    <div className='overview__allsong-item-left-box zingchart__item-left-img ' style={{ backgroundImage: `url(./assets/img/songs/3.webp)` }}></div>
                                    <div className='overview__allsong-item-body'>
                                        <h3 className='overview__allsong-item-body-name'>
                                            aaa
                                        </h3>
                                        <span className='overview__allsong-item-body-singer'>
                                            aaa
                                        </span>
                                    </div>
                                </li>
                                <li className='zing-chart__week-item'>
                                    <span className='zingchart__item-left-stt'>{4}</span>
                                    <span className='zingchart__item-left-line'>-</span>
                                    <div className='overview__allsong-item-left-box zingchart__item-left-img ' style={{ backgroundImage: `url(./assets/img/songs/4.webp)` }}></div>
                                    <div className='overview__allsong-item-body'>
                                        <h3 className='overview__allsong-item-body-name'>
                                            aaa
                                        </h3>
                                        <span className='overview__allsong-item-body-singer'>
                                            aaa
                                        </span>
                                    </div>
                                </li>
                                <li className='zing-chart__week-item'>
                                    <span className='zingchart__item-left-stt'>{5}</span>
                                    <span className='zingchart__item-left-line'>-</span>
                                    <div className='overview__allsong-item-left-box zingchart__item-left-img ' style={{ backgroundImage: `url(./assets/img/songs/5.webp)` }}></div>
                                    <div className='overview__allsong-item-body'>
                                        <h3 className='overview__allsong-item-body-name'>
                                            aaa
                                        </h3>
                                        <span className='overview__allsong-item-body-singer'>
                                            aaa
                                        </span>
                                    </div>
                                </li>
                            </ul>
                            <div style={{ margin: 0 }} className='zing-chart__100more'>
                                <span className='zingchart__100more-body'>Xem tất cả</span>
                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className='zing-chart__week-vn'>
                            <span className='zing-chart__week-heading'>K - POP</span>
                            <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                                <li className='zing-chart__week-item'>
                                    <span className='zingchart__item-left-stt'>{1}</span>
                                    <span className='zingchart__item-left-line'>-</span>
                                    <div className='overview__allsong-item-left-box zingchart__item-left-img ' style={{ backgroundImage: `url(./assets/img/songs/0.webp)` }}></div>
                                    <div className='overview__allsong-item-body'>
                                        <h3 className='overview__allsong-item-body-name'>
                                            aaa
                                        </h3>
                                        <span className='overview__allsong-item-body-singer'>
                                            aaa
                                        </span>
                                    </div>
                                </li>
                                <li className='zing-chart__week-item'>
                                    <span className='zingchart__item-left-stt'>{2}</span>
                                    <span className='zingchart__item-left-line'>-</span>
                                    <div className='overview__allsong-item-left-box zingchart__item-left-img ' style={{ backgroundImage: `url(./assets/img/songs/1.webp)` }}></div>
                                    <div className='overview__allsong-item-body'>
                                        <h3 className='overview__allsong-item-body-name'>
                                            aaa
                                        </h3>
                                        <span className='overview__allsong-item-body-singer'>
                                            aaa
                                        </span>
                                    </div>
                                </li>
                                <li className='zing-chart__week-item'>
                                    <span className='zingchart__item-left-stt'>{3}</span>
                                    <span className='zingchart__item-left-line'>-</span>
                                    <div className='overview__allsong-item-left-box zingchart__item-left-img ' style={{ backgroundImage: `url(./assets/img/songs/3.webp)` }}></div>
                                    <div className='overview__allsong-item-body'>
                                        <h3 className='overview__allsong-item-body-name'>
                                            aaa
                                        </h3>
                                        <span className='overview__allsong-item-body-singer'>
                                            aaa
                                        </span>
                                    </div>
                                </li>
                                <li className='zing-chart__week-item'>
                                    <span className='zingchart__item-left-stt'>{4}</span>
                                    <span className='zingchart__item-left-line'>-</span>
                                    <div className='overview__allsong-item-left-box zingchart__item-left-img ' style={{ backgroundImage: `url(./assets/img/songs/4.webp)` }}></div>
                                    <div className='overview__allsong-item-body'>
                                        <h3 className='overview__allsong-item-body-name'>
                                            aaa
                                        </h3>
                                        <span className='overview__allsong-item-body-singer'>
                                            aaa
                                        </span>
                                    </div>
                                </li>
                                <li className='zing-chart__week-item'>
                                    <span className='zingchart__item-left-stt'>{5}</span>
                                    <span className='zingchart__item-left-line'>-</span>
                                    <div className='overview__allsong-item-left-box zingchart__item-left-img ' style={{ backgroundImage: `url(./assets/img/songs/5.webp)` }}></div>
                                    <div className='overview__allsong-item-body'>
                                        <h3 className='overview__allsong-item-body-name'>
                                            aaa
                                        </h3>
                                        <span className='overview__allsong-item-body-singer'>
                                            aaa
                                        </span>
                                    </div>
                                </li>
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
