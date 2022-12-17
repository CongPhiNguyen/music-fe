import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Route, Routes } from "react-router-dom"
import routes from "./router"
import { get } from "../api/axios"
import URL from "../api/config"
import { setCurrentUserInfo, handleLogin } from "../features/authen/authenSlice"
import Layout from "../features/shared/pages/Layout"
const Routers = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    get(URL.URL_REFESH)
      .then((data) => {
        dispatch(setCurrentUserInfo({ username: data?.data?.username }))
        dispatch(handleLogin({ info: data?.data?.data }))
      })
      .catch((err) => {
        console.log("err", err)
      })
  }, [dispatch])
  return (
    <React.Suspense>
      <Routes>
        {routes.publicRoute.map((route, index) => {
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
        <Route path="/" name="Home" element={<Layout></Layout>}>
          {routes.commonRoute.map((route, index) => {
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
        </Route>
      </Routes>
    </React.Suspense>
  )
}

export default Routers
