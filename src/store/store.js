import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/AuthSlice";
import accountSlice from "./slices/AccountSlice";
import videosSlice from "./slices/VideosSlice";
import likeSubscribeSlice from "./slices/LikeSubscribeSlice";
import commentSlice from "./slices/CommentSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,

        videos: videosSlice,
        likeSubscribe : likeSubscribeSlice,
        comments : commentSlice,
    },
})

