import { createSlice } from "@reduxjs/toolkit";
import { getVideos, playVideo, uploadVideo } from "../asyncThunks/videosThunk";

const initialState = {
    videos: null,
    singleVideo: null,
    loading: false,
    error: null,
};

const videoSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadVideo.fulfilled , (state, action) => {
                state.videos.docs = [...state.videos.docs, action.payload]
                state.loading = false;
                state.error = null;
            })
            .addCase(uploadVideo.pending , (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadVideo.rejected , (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getVideos.fulfilled , (state, action) => {
                state.videos = action.payload.data;
                state.loading = false;
                state.error = null;
            })
            .addCase(getVideos.pending , (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getVideos.rejected , (state, action) => {
                state.loading = false;
                state.error = action.error;
                state.videos = [];
            })
            // give play video cases
            .addCase(playVideo.pending , (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(playVideo.fulfilled , (state, action) => {
                state.singleVideo = action.payload.data;
                state.loading = false;
                state.error = null;
            })
            .addCase(playVideo.rejected , (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
    }
})

export default videoSlice.reducer