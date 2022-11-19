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
    handleLogin: (state) => {
      state.isLogin = true
    },
    handleLogout: (state) => {
      state.isLogin = false
    }
  }
})

export const { setCurrentUserInfo, handleLogin, handleLogout } = authenSlice.actions

export default authenSlice.reducer
