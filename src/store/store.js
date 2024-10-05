import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/AuthSlice";
import accountSlice from "./slices/AccountSlice";
import videosSlice from "./slices/VideosSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,

        videos: videosSlice
    },
})

