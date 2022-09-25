import React from 'react'
import "./MainHome.css"
import { FaArrowLeft, FaArrowRight, FaSearch, FaTshirt, FaUpload, FaCog } from "react-icons/fa"
import Personal from './Personal'
export default function MainHome() {
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
            <Personal></Personal>
        </div >
    )
}
