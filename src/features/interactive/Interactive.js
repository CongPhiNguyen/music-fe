import Header from "./components/Layout/Header/Header"
import Home from "./pages/Home/Home"
import BookCafe from "./pages/BookCafe/BookCafe"
import Player from "./components/Layout/Player/Player"
import LateralMenu from "./components/Layout/LateralMenu/LateralMenu"
import { useContext } from "react"
import { StoreContext } from "./store"
import Session from "./new-component/Session"
export default function Interactive() {
  const valueCT = useContext(StoreContext)
  const enter = valueCT.enter
  return (
    <div className="App select-none">
      <Header />
      {enter ? <BookCafe /> : <Home />}
      <LateralMenu />
      <Player />
      <Session></Session>
    </div>
  )
}
