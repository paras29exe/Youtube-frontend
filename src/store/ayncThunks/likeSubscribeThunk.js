import { createAsyncThunk } from "@reduxjs/toolkit";
import { fulfilled , rejected } from "../../utils/responses";
import AxiosInstance from "../../utils/AxiosInstance";

export const toggleVideoLike = createAsyncThunk(
    "likeSubscribe/toggleVideoLike",
    async (videoId, thunkAPI) => {
        try {
            const response = await AxiosInstance.post("/likes/toggle-like-on-video/" + videoId);
            return fulfilled(response)
        } catch (err) {
            return thunkAPI.rejectWithValue(rejected(err))
        }
    }
)
export const toggleCommentLike = createAsyncThunk(
    "likeSubscribe/toggleCommentLike",
    async (commentId, thunkAPI) => {
        try {
            const response = await AxiosInstance.post("/likes/toggle-like-on-video/" + commentId);
            return fulfilled(response)
        } catch (err) {
            return thunkAPI.rejectWithValue(rejected(err))
        }
    }
)

export const toggleSubscribe = createAsyncThunk(
    "likeSubscribe/toggleSubscribe",
    async (channelId, thunkAPI) => {
        try {
            const response = await AxiosInstance.post("/subscriptions/toggle-subscription/" + channelId);
            return fulfilled(response)
        } catch (err) {
            return thunkAPI.rejectWithValue(rejected(err))
        }
    }
)