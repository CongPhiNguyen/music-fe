import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import NavUser from '../components/NavUser'
import SearchComponent from '../components/SearchComponent'
import "./ZingChart.css"
import axios from 'axios'
export default function Search() {

    const location = useLocation()
    const param = useParams()
    const [songs, setSongs] = useState(null)
    useEffect(() => {
        console.log(param)
        console.log(location)
        const fetchApiSearch = async () => {
            axios.get(`http://localhost:5050/api/v1/zing/search` + location.search)
                .then(res => {
                    console.log(res)
                    setSongs(res.data.data.data.songs)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetchApiSearch()
    }, [location])

    return (
        <div className='main-home'>
            <NavUser></NavUser>
            <SearchComponent songs={songs}></SearchComponent>
        </div>
    )
}
