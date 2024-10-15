import { createSlice } from "@reduxjs/toolkit";
import { getVideos, playVideo, uploadVideo } from "../ayncThunks/videosThunk";

const initialState = {
    videos: [],
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
                state.videos = [...state.videos, action.payload]
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
                state.videos = action.payload.data.docs;
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