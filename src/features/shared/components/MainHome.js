import React from 'react'
import "./MainHome.css"
import Personal from './Personal'
import NavUser from './NavUser'
export default function MainHome() {
    return (
        <div className='main-home'>
            <NavUser></NavUser>
            <Personal></Personal>
        </div >
    )
}
