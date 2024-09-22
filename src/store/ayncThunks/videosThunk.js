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
