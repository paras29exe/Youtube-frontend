import { createSlice } from "@reduxjs/toolkit";
import { createPlaylistAndAddVideos, getPlaylists, addVideosToSelectedPlaylist } from "../asyncThunks/playlistThunk";

const initialState = {
    userPlaylists: null,
    playlistData: null,
    loading: false,
    creating: false,
    error: null,
};

const playlistSlice = createSlice({
    initialState,
    name: "playlists",
    reducers: {
        // clear playlist data on logout
        clearPlaylistData: (state) => {
            state.userPlaylists = [];
            state.playlistData = null;
            state.loading = false;
            state.creating = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // create a playlist
            .addCase(createPlaylistAndAddVideos.fulfilled, (state, action) => {
                state.userPlaylists = Array.isArray(state.userPlaylists)
                    ? [action.payload.data, ...state.userPlaylists]
                    : [action.payload.data];
                state.creating = false;
                state.error = null;
            })
            .addCase(createPlaylistAndAddVideos.rejected, (state, action) => {
                state.error = action.error;
                state.creating = false;
            })
            .addCase(createPlaylistAndAddVideos.pending, (state) => {
                state.creating = true;
                state.error = null;
            })

            // get all userPlaylists
            .addCase(getPlaylists.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPlaylists.fulfilled, (state, action) => {
                state.userPlaylists = action.payload.data;
                state.loading = false;
                state.error = null;
            })
            .addCase(getPlaylists.rejected, (state, action) => {
                state.error = action.error;
                state.loading = false;
            })

            // add videos to playlist
            .addCase(addVideosToSelectedPlaylist.pending, (state) => {
                state.error = null;
                state.creating = true;
            })
            .addCase(addVideosToSelectedPlaylist.fulfilled, (state, action) => {
                state.playlistData = action.payload.data;
                state.creating = false;
                state.error = null;
            })
            .addCase(addVideosToSelectedPlaylist.rejected, (state, action) => {
                state.error = action.error;
                state.creating = false;
            })
    }
})
export const { clearPlaylistData } = playlistSlice.actions;
export default playlistSlice.reducer;