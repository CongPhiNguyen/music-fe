import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

export const interactiveSlice = createSlice({
  name: "interactive",
  initialState,
  reducers: {
    // setCurrentUserInfo: (state, action) => {
    //   // state.currentUserInfo = action.payload
    // },
    // handleLogin: (state, action) => {
    //   state.isLogin = true
    //   state.currentUserInfo = action.payload.info
    // },
    // handleLogout: (state) => {
    //   state.isLogin = false
    // }
    changeSong: (state, action) => {
      state.currentSong = action.payload
    },
    setPlaying: (state, action) => {
      state.isPlaying = action.payload
    },
    setCurrenstSession: (state, action) => {
      state.currentSession = action.payload
    }
  }
})

export const { changeSong, setPlaying } = interactiveSlice.actions

export default interactiveSlice.reducer
