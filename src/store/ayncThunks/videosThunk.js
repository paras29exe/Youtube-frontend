import { createAsyncThunk } from "@reduxjs/toolkit";
import { fulfilled, rejected } from "../../utils/responses";
import AxiosInstance from "../../utils/AxiosInstance";

export const uploadVideo = createAsyncThunk(
    "videos/uploadVideo",
    async (data, thunkAPI) => {
        try {
            const response = await AxiosInstance.post("videos/upload-video", data);
            return fulfilled(response);
        } catch (err) {
            return thunkAPI.rejectWithValue(rejected(err));
        }
    }
)

export const updateVideoDetails = createAsyncThunk(
    "videos/updateVideoDetails",
    async (data, thunkAPI) => {
        try {
            const response = await AxiosInstance.patch("videos/update-video-details", data);
            return fulfilled(response);
        } catch (err) {
            return thunkAPI.rejectWithValue(rejected(err));
        }
    }
)

export const getVideos = createAsyncThunk(
    "videos/getVideos",
    async (_, thunkAPI) => {
        try {
            const response = await AxiosInstance.get("videos/get-videos");
            return fulfilled(response);
        } catch (err) {
            return thunkAPI.rejectWithValue(rejected(err));
        }
    }
)
