import { createSlice } from "@reduxjs/toolkit";
import { getVideos, searchVideos, getVideoById, playVideo, uploadVideo, updateVideoDetails, deleteVideo } from "../asyncThunks/videosThunk";

const initialState = {
    videos: null,
    searchedVideos: null,
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
            // get videos cases
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
                state.videos = null;
            })
            // searched videos
            .addCase(searchVideos.fulfilled, (state, action) => {
                state.searchedVideos = action.payload.data;
                state.loading = false;
                state.error = null;
            })
            .addCase(searchVideos.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchVideos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
                state.searchedVideos = null;
            })
            // specific video searching for editing it    
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
            // video upload
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
            // video editing
            .addCase(updateVideoDetails.fulfilled, (state, action) => {
                state.singleVideo = action.payload.data;
                state.loading = false;
                state.error = null;
            })
            .addCase(updateVideoDetails.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateVideoDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
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
            // delete video cases
            .addCase(deleteVideo.fulfilled, (state, action) => {
                // state.videos = state.videos.filter((video) => video._id !== action.payload.data._id);
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteVideo.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteVideo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
    }
})

export const { setUploadProgress } = videoSlice.actions
export default videoSlice.reducer