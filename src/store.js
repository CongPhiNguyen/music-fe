import { configureStore } from "@reduxjs/toolkit";
import authenSlice from "./features/authen/authenSlice";
import musicData from "./features/shared/musicSlice";
export const store = configureStore({
  reducer: {
    authen: authenSlice,
    musicData: musicData,
  },
});
