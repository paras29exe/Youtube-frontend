import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../utils/AxiosInstance";
import {fulfilled , rejected } from "../../utils/responses"

export const getSubscribedVideos = createAsyncThunk(
    "subscriptions/getSubscribedVideos",
    
    async (_, thunkAPI) => {
        try {
            const response = await AxiosInstance.get("subscriptions/subscribed-channel-videos");
            return fulfilled(response);
        } catch (err) {
            return thunkAPI.rejectWithValue(rejected(err));
        }
    }
)