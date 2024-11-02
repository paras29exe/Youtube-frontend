import { fulfilled, rejected } from "../../utils/responses";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../utils/AxiosInstance";

export const getChannel  = createAsyncThunk(
    "channel/getChannel",
    async (username, thunkAPI) => {

        try {
            const response = await AxiosInstance.get("users/get-channel/" + username);
            return fulfilled(response);
        } catch (err) {
            return thunkAPI.rejectWithValue(rejected(err));
        }
    }
)

export const getChannelVideos = createAsyncThunk(
    "channel/getChannelVideos",
    async (channelId, thunkAPI) => {
        try {
            const response = await AxiosInstance.get(`videos/get-channel-videos/` + channelId);
            return fulfilled(response);
        } catch (err) {
            return thunkAPI.rejectWithValue(rejected(err));
        }
    }
)