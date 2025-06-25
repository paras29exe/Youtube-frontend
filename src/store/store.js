import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/AuthSlice.js";
import accountSlice from "./slices/AccountSlice.js";
import videosSlice from "./slices/VideosSlice.js";
import likeSubscribeSlice from "./slices/temp.js";
import commentSlice from "./slices/CommentSlice.js";
import subscriptionSlice from "./slices/SubscriptionSlice.js";
import channelSlice from "./slices/ChannelSlice.js";
import playlistSlice from "./slices/PlaylistSlice.js";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        account: accountSlice,
        videos: videosSlice,
        likeSubscribe : likeSubscribeSlice,
        comments : commentSlice,
        subscriptions: subscriptionSlice,
        channel: channelSlice,
        playlists: playlistSlice,
    },
})

