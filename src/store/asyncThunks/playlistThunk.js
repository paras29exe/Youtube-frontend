import { createAsyncThunk } from "@reduxjs/toolkit";
import { fulfilled, rejected } from "../../utils/responses";
import AxiosInstance from "../../utils/AxiosInstance";
import { addPlaylistToUserData } from "../slices/AccountSlice";

// create playlist
export const createPlaylistAndAddVideos = createAsyncThunk(
    "playlists/createPlaylistAndAddVideos",
    async (data, thunkAPI) => {
        try {
            const response = await AxiosInstance.post(`/playlists/create-playlist-and-add-videos`, data);
            
            // adding playlist to userPlaylists in the store without making another API call
            thunkAPI.dispatch(addPlaylistToUserData(response.data));
            return fulfilled(response);
        } catch (err) {
            return thunkAPI.rejectWithValue(rejected(err));
        }
    }
)

// get playlists
export const getPlaylists = createAsyncThunk(
    "playlists/getPlaylists",
    async (userId, thunkAPI) => {
        try {
            const response = await AxiosInstance.get(`/playlists/get-all-playlists/${userId}`);
            console.log("Playlists fetched:", response.data);
            return fulfilled(response);
        } catch (err) {
            return thunkAPI.rejectWithValue(rejected(err));
        }
    }
)

// add videos to playlist
export const addVideosToSelectedPlaylist = createAsyncThunk(
    "playlists/addVideosToPlaylist",
    async (data, thunkAPI) => {
        try {
            const response = await AxiosInstance.post(`/playlists/add-videos-to-selected-playlist`, data);
            return fulfilled(response);
        } catch (err) {
            return thunkAPI.rejectWithValue(rejected(err));
        }
    }
)