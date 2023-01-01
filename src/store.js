import { configureStore } from "@reduxjs/toolkit"
import authenSlice from "./features/authen/authenSlice"
import musicData from "./features/shared/musicSlice"
import interactiveSlice from "./features/interactive/interactiveSlice"
import audioSlice from "./features/radio/audioSlice"
export const store = configureStore({
  reducer: {
    authen: authenSlice,
    musicData: musicData,
    interactive: interactiveSlice,
    audio: audioSlice
  }
})
