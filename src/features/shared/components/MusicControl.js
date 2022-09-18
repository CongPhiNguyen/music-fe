import React from 'react'
import "./MusicControl.css"
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { FaEllipsisH, FaPhotoVideo, FaMicrophone, FaRandom, FaRedoAlt } from "react-icons/fa"
import { BiSquare } from "react-icons/bi"
import { BsFillVolumeDownFill, BsCaretLeftFill, BsCaretRightFill, BsPauseFill, BsPlayFill } from "react-icons/bs"
import { Col, Row } from 'antd';
export default function MusicControl() {
    return (
        <div className='music-control'>
            <Row>
                <Col span={6}>
                    <div className='music-control__left' >
                        <div className='music-control__left-img-box'>
                            <div className='music-control__left-img'>
                            </div>
                        </div>
                        <div className='music-control__left-content flex flex-col'>
                            <span className='music-control__left-content-song'>
                                Chạy Về Khóc Với Anh
                            </span>
                            <span className='music-control__left-content-singer'>
                                Erik, Duzme Remix
                            </span>
                        </div>
                        <div className='music-control__left-action'>
                            <div className='music-control__left-action-tym-box'>
                                <AiOutlineHeart className='music-control__left-action-tym-none' />
                                <AiFillHeart className='music-control__left-action-tym' />
                            </div>
                            <div className='music-control__left-action-tym-box'>
                                <FaEllipsisH className='music-control__left-action-option'></FaEllipsisH>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={12}>
                    <div className='music-control-center'>
                        <div className='music-control__center-action'>
                            <FaRandom className='music-control__center-icon' />
                            <BsCaretLeftFill className='music-control__center-icon' />
                            <BsPlayFill className='music-control__center-icon music-control__center-icon-main' />
                            <BsPauseFill className='music-control__center-icon music-control__center-icon-main !hidden' />
                            <BsCaretRightFill className='music-control__center-icon' />
                            <FaRedoAlt style={{ fontSize: '3.2rem' }} className='music-control__center-icon' />
                        </div>
                        <div className='music-control__center-progress'>
                            <span className='music-control__center-progress-time-start'>
                                00:00
                            </span>
                            <input id="progress" class="music-control__center-progress-input" type="range" value="0" step="1" min="0" max="100" />
                            <span className='music-control__center-progress-time-end'>
                                00:00
                            </span>
                        </div>
                    </div>
                </Col>
                <Col span={6}>
                    <div className='music-control-right'>
                        <FaPhotoVideo className='music-control__right-action-option'></FaPhotoVideo>
                        <FaMicrophone className='music-control__right-action-option'></FaMicrophone>
                        <BiSquare className='music-control__right-action-option'></BiSquare>
                        <BsFillVolumeDownFill style={{ fontSize: '4rem' }} className='music-control__right-action-option'></BsFillVolumeDownFill>
                        <div className='music-control__right-progress'>
                            <input id='progress-volumn' value={100} type={"range"} step={1} min={0} max={100} className='music-control__right-volumn-input' />
                            {/* <Progress percent={50} showInfo={false} size="small" status="active" /> */}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
