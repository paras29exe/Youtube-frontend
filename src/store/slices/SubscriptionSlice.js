import { createSlice } from "@reduxjs/toolkit";
import { getSubscribedVideos } from "../asyncThunks/subscriptionThunk";

const initialState = {
    subscribedVideos: null,
    loading: false,
    error: null,
}

const subscriptionSlice = createSlice({
    name: "subscriptions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // subs videos
            .addCase(getSubscribedVideos.fulfilled, (state, action) => {
                state.subscribedVideos = action.payload.data;
                state.loading = false;
                state.error = null;
            })
            .addCase(getSubscribedVideos.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSubscribedVideos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
    }
})

export default subscriptionSlice.reducer