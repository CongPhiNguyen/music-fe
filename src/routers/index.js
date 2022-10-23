import React from "react"
import { useSelector } from "react-redux"
import { Route, Routes, Navigate } from "react-router-dom"
import routes from "./router"
// import { useSelector } from "react-redux";

const Routers = () => {
  const currentUserInfo = useSelector((state) => state.authen.currentUserInfo)
  console.log("currentUserInfo", currentUserInfo)
  console.log(
    "Object.keys(currentUserInfo) === 0",
    Object.keys(currentUserInfo)
  )
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
