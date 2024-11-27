import { createSlice } from "@reduxjs/toolkit";
import { getVideos, getVideoById, playVideo, uploadVideo } from "../asyncThunks/videosThunk";

const initialState = {
    videos: null,
    singleVideo: null,
    uploadProgress: 0,
    uploading: false,
    loading: false,
    error: null,
};

const videoSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {
        setUploadProgress: (state, action) => {
            state.uploadProgress = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadVideo.fulfilled, (state, action) => {
                // state.videos.docs = [...state.videos.docs, action.payload]
                state.uploading = false;
                state.error = null;
                state.uploadProgress = 100;
            })
            .addCase(uploadVideo.pending, (state, action) => {
                state.uploading = true;
                state.error = null;
            })
            .addCase(uploadVideo.rejected, (state, action) => {
                state.uploading = false;
                state.error = action.error;
                state.uploadProgress = 0;
            })
            .addCase(getVideos.fulfilled, (state, action) => {
                state.videos = action.payload.data;
                state.loading = false;
                state.error = null;
            })
            .addCase(getVideos.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getVideos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
                state.videos = [];
            })
            // give play video cases
            .addCase(playVideo.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(playVideo.fulfilled, (state, action) => {
                state.singleVideo = action.payload.data;
                state.loading = false;
                state.error = null;
            })
            .addCase(playVideo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getVideoById.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getVideoById.fulfilled, (state, action) => {
                state.singleVideo = action.payload.data;
                state.loading = false;
                state.error = null;
            })
            .addCase(getVideoById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
    }
})

export const { setUploadProgress } = videoSlice.actions
export default videoSlice.reducer