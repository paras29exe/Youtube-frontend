import { createSlice } from "@reduxjs/toolkit";
import { uploadVideo } from "../ayncThunks/videosThunk";

const initialState = {
    videos: [],
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
                state.videos = action.payload;
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
            
    }
})