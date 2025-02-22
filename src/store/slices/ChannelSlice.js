import { createSlice } from "@reduxjs/toolkit";
import { getChannel, getChannelVideos } from "../asyncThunks/channelThunk";

const initialState = {
    channel: null,
    channelVideos: null,
    loading: false,
    videosLoading: false,
    error: null,
};

const channelSlice = createSlice({
    name: "channel",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder
            .addCase(getChannel.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getChannel.fulfilled, (state, action) => {
                state.channel = action.payload.data;
                state.loading = false;
                state.error = null;
            })
            .addCase(getChannel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            // get channel videos thunk
            .addCase(getChannelVideos.pending, (state, action) => {
                state.videosLoading = true;
                state.error = null;
            })
            .addCase(getChannelVideos.fulfilled, (state, action) => {
                state.channelVideos = action.payload.data;
                state.videosLoading = false;
                state.error = null;
            })
            .addCase(getChannelVideos.rejected, (state, action) => {
                state.videosLoading = false;
                state.error = action.error;
            });
            // create playlist thunk

    },
});

export default channelSlice.reducer;