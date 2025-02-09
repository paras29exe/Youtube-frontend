import { createSlice } from "@reduxjs/toolkit";
import { updateAccountDetails, getUserVideos, getChannelStats, getWatchHistory, removeVideoFromWatchHistory } from "../asyncThunks/accountThunk";
import WatchHistory from "../../pages/WatchHistory";

const initialState = {
    currentUser: null,
    stats: null,
    userVideos: null,
    watchHistory: null,
    loading: false,
    error: null,
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        // clear data on logout
        clearAccountData: (state) => {
            state.currentUser = null;
            state.stats = null;
            state.userVideos = null;
            state.loading = false;
            state.error = null;
        },
        // fetch videos again after updating details of video 
        resetUserVideos: (state) => {
            state.userVideos = null;
        },
        // adding video to userVideo without again making a call to database
        addVideoAfterUpload: (state, action) => {
            state.userVideos = [...state.userVideos, action.payload.data];
            state.stats.totalVideos += 1
        },
        // removing video from userVideo without again making a call to database
        removeVideoAfterDelete: (state, action) => {
            state.userVideos =  state.userVideos.filter((video) => video._id !== action.payload);
            state.stats.totalVideos -= 1
        },
        // remove video from watch history
        removeVideoFromUserData: (state, action) => {
            state.watchHistory = state.watchHistory.filter((video) => video._id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(updateAccountDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateAccountDetails.fulfilled, (state, action) => {
            state.currentUser = action.payload.data;
            state.loading = false;
            state.error = null;
        })
        .addCase(updateAccountDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })
        // get user videos
        .addCase(getUserVideos.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getUserVideos.fulfilled, (state, action) => {
            state.userVideos = action.payload.data;
            state.loading = false;
            state.error = null;
        })
        .addCase(getUserVideos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })
        // channel statistics
        .addCase(getChannelStats.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getChannelStats.fulfilled, (state, action) => {
            state.stats = action.payload.data;
            state.loading = false;
            state.error = null;
        })
        .addCase(getChannelStats.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })
        // get watch history of user
        .addCase(getWatchHistory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getWatchHistory.fulfilled, (state, action) => {
            state.loading = false;
            state.watchHistory = action.payload.data;
            state.error = null;
        })
        .addCase(getWatchHistory.rejected, (state, action) => {
            state.loading = false;
            state.watchHistory = null;
            state.error = action.error;
        })
        // remove video from watch history
        .addCase(removeVideoFromWatchHistory.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
        })
    }
})

export const { clearAccountData, resetUserVideos, addVideoAfterUpload, removeVideoAfterDelete, removeVideoFromUserData } = accountSlice.actions;
export default accountSlice.reducer