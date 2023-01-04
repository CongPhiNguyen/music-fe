import React, { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router"
import NavUser from "../components/NavUser"
import SearchComponent from "../components/SearchComponent"
import "./ZingChart.css"
import axios from "axios"
import URL from "../../../api/config"
export default function Search() {
  const location = useLocation()
  const param = useParams()
  const [songs, setSongs] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchApiSearch = async () => {
      axios
        .get(URL.BASE_API_ENDPOINT + `/zing/search` + location.search)
        .then((res) => {
          setSongs(res.data.data.data.songs)
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    fetchApiSearch()
  }, [location])

  return (
    <div className="main-home">
      <NavUser></NavUser>
      <SearchComponent songs={songs} isLoading={isLoading}></SearchComponent>
    </div>
  )
}
