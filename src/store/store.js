import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/AuthSlice";
import videosSlice from "./slices/VideosSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        videos: videosSlice
    },
})

