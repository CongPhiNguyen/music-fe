import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { get } from "../../../api/axios"
import URL from "../../../api/config"
import { setCurrentUserInfo } from "../../authen/authenSlice"
export default function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    get(URL.URL_REFESH)
      .then((data) => {
        console.log("data", data)
        dispatch(setCurrentUserInfo({ username: data?.data?.username }))
      })
      .catch((err) => {
        console.log("err", err)
      })
  }, [])
  return <div>Home</div>
}
