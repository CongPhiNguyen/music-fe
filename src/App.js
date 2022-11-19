import React from "react"
import { BrowserRouter } from "react-router-dom"
import Routers from "./routers"
import Header from "./features/shared/components/Header"
import "./App.css"
import "antd/dist/antd.min.css"
import { store } from "./store"
import { Provider } from "react-redux"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <div className="header-container">
          <Header />
        </div> */}
        <div className="page-container overflow-y-hidden">
          <Routers />
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
