import { createSlice } from "@reduxjs/toolkit";
import { updateAccountDetails, getUserVideos, getChannelStats } from "../asyncThunks/accountThunk";

const initialState = {
    currentUser: null,
    stats: null,
    userVideos: null,
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
            state.userVideos =  state.userVideos.filter((video) => video._id !== action.payload.data._id);
            state.stats.totalVideos -= 1
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
    }
})

export const { clearAccountData, resetUserVideos, addVideoAfterUpload, removeVideoAfterDelete } = accountSlice.actions;
export default accountSlice.reducer