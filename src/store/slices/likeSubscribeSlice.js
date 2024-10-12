import { createSlice } from "@reduxjs/toolkit";
import { toggleVideoLike, toggleCommentLike, toggleSubscribe } from "../ayncThunks/likeSubscribeThunk";

const initialState = {
    videoLiked: false,
    videoCommentLiked: false,
    videoSubscribed: false,
    error: null
};

const likeSubscribeSlice = createSlice({
    name: "likeSubscribe",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(toggleVideoLike.fulfilled, (state, action) => {
                state.videoLiked = action.payload;
                state.error = null;
            })
            .addCase(toggleVideoLike.rejected, (state, action) => {
                state.error = action.error;
            })
            .addCase(toggleCommentLike.fulfilled, (state, action) => {
                state.videoCommentLiked = action.payload;
                state.error = null;
            })
            .addCase(toggleCommentLike.rejected, (state, action) => {
                state.error = action.error;
            })
            .addCase(toggleSubscribe.fulfilled, (state, action) => {
                state.videoSubscribed = action.payload;
                state.error = null;
            })
            .addCase(toggleSubscribe.rejected, (state, action) => {
                state.error = action.error;
            })
    },
});

export default likeSubscribeSlice.reducer;