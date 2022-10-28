import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, Routes, Navigate } from "react-router-dom"
import routes from "./router"
// import { useSelector } from "react-redux";
import { get } from "../api/axios"
import URL from "../api/config"
import { setCurrentUserInfo } from "../features/authen/authenSlice"
const Routers = () => {
  const dispatch = useDispatch()
  const currentUserInfo = useSelector((state) => state.authen.currentUserInfo)
  console.log("currentUserInfo", currentUserInfo)
  // console.log(
  //   "Object.keys(currentUserInfo) === 0",
  //   Object.keys(currentUserInfo)
  // )
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
  return (
    <React.Suspense>
      <Routes>
        {Object.keys(currentUserInfo).length === 0 &&
          routes.publicRoute.map((route, index) => {
            return (
              route.element && (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              )
            )
          })}
        {Object.keys(currentUserInfo).length !== 0 &&
          routes.commonRoute.map((route, index) => {
            return (
              route.element && (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              )
            )
          })}
        {routes.protectedRoute.map((route, index) => {
          return (
            route.element && (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            )
          )
        })}
        {/* <Route path="*" element={<Navigate to={"/"} />} /> */}
      </Routes>
    </React.Suspense>
  )
}

export default Routers
