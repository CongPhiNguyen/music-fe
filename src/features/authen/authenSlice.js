import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentUserInfo: {},
  isLogin: false,
}

export const authenSlice = createSlice({
  name: "authen",
  initialState,
  reducers: {
    setCurrentUserInfo: (state, action) => {
      state.currentUserInfo = action.payload;
    },
    handleLogin: (state, action) => {
      state.isLogin = true
      state.currentUserInfo = action.payload.info
    },
    handleLogout: (state) => {
      state.isLogin = false
    }
  }
})

export const { setCurrentUserInfo, handleLogin, handleLogout } = authenSlice.actions

export default authenSlice.reducer
