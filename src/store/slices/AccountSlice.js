import { createSlice } from "@reduxjs/toolkit";
import { updateAccountDetails, getUserVideos, getChannelStats, getWatchHistory, removeVideoFromWatchHistory } from "../asyncThunks/accountThunk";
import WatchHistory from "../../pages/WatchHistory";

const initialState = {
    currentUser: null,
    stats: null,
    userVideos: null,
    userPlaylists: null,
    watchHistory: null,
    loading: false,
    error: null,
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        // clear data on logout
        clearAccountInfo: (state) => {
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
            // Safely handle null userVideos
            state.userVideos = state.userVideos ? [ action.payload.data, ...state.userVideos] : [action.payload.data];

            // Safely update stats
            if (state.stats) {
                state.stats.totalVideos += 1;
            }
        },
        // removing video from userVideo without again making a call to database
        removeVideoAfterDelete: (state, action) => {
            state.userVideos = state.userVideos.filter((video) => video._id !== action.payload);
            state.stats.totalVideos -= 1
        },
        // add playlist to user data after creating a playlist
        
        addPlaylistToUserData: (state, action) => {
            // Safely handle null state.userPlaylists
            state.userPlaylists = state.userPlaylists ? [action.payload.data, ...state.userPlaylists] : [action.payload.data];

            // Also handle null state.stats
            if (state.stats) {
                state.stats.totalPlaylists += 1;
            }
        },
        // remove playlist from user data without database call for now
        removePlaylistFromUserData: (state, action) => {
            state.userPlaylists = state.userPlaylists.filter((playlist) => playlist._id !== action.payload);
            state.stats.totalPlaylists -= 1;
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

export const { clearAccountInfo, resetUserVideos, addVideoAfterUpload, removeVideoAfterDelete, removeVideoFromUserData, addPlaylistToUserData, removePlaylistFromUserData } = accountSlice.actions;
export default accountSlice.reducer