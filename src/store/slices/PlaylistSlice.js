import { createSlice } from "@reduxjs/toolkit";
import { createPlaylistAndAddVideos, getPlaylists, addVideosToSelectedPlaylist } from "../asyncThunks/playlistThunk";

const initialState = {
    userPlaylists: [],
    playlistData: null,
    loading: false,
    error: null,
};

const playlistSlice = createSlice({
    initialState,
    name: "playlists",
    reducers: {},
    extraReducers: (builder) => {
        builder
         // create a playlist
         .addCase(createPlaylistAndAddVideos.fulfilled, (state, action) => {
            state.userPlaylists = [...state.userPlaylists, action.payload.data];
            state.loading = false;
            state.error = null;
        })
        .addCase(createPlaylistAndAddVideos.rejected, (state, action) => {
            state.error = action.error;
            state.loading = false;
        })
        .addCase(createPlaylistAndAddVideos.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        // get all playlists
        .addCase(getPlaylists.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getPlaylists.fulfilled, (state, action) => {
            state.playlists = action.payload.data;
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
            state.loading = true;
        })
        .addCase(addVideosToSelectedPlaylist.fulfilled, (state, action) => {
            state.playlistData = action.payload.data;
            state.loading = false;
            state.error = null;
        })
        .addCase(addVideosToSelectedPlaylist.rejected, (state, action) => {
            state.error = action.error;
            state.loading = false;
        })
    }
})
export default playlistSlice.reducer;