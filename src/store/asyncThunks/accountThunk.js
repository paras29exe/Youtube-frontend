import { createAsyncThunk } from "@reduxjs/toolkit";
import { fulfilled, rejected } from "../../utils/responses";
import AxiosInstance from "../../utils/AxiosInstance";
import { setUserData } from "../slices/AuthSlice";
import { removeVideoFromUserData } from "../slices/AccountSlice";

export const getAccountDetails = createAsyncThunk(
    "account/getDetails",
    async (_, thunkAPI) => {
        try {
            const response = await AxiosInstance.get("/users/get-current-user");
            return fulfilled(response);
        } catch (err) {
            return thunkAPI.rejectWithValue(rejected(err));
        }
    }
)

export const updateAccountDetails = createAsyncThunk(
    "account/updateDetails",
    async (data, thunkAPI) => {        
        const formdata = new FormData()
        data.fullName && formdata.append("fullName", data.fullName)
        data.username && formdata.append("username", data.username)
        data.avatar?.[0] && formdata.append("avatar", data.avatar[0])
        data.coverImage?.[0] && formdata.append("coverImage", data.coverImage[0])
        formdata.append("sameCover", data.sameCover)

        try {
            const response = await AxiosInstance.put("/users/update-account-details",
                formdata,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );
                await thunkAPI.dispatch(setUserData(response.data.data))
            return fulfilled(response);
        } catch (err) {
            return thunkAPI.rejectWithValue(rejected(err));
        }
    }
)

export const getChannelStats = createAsyncThunk(
    "account/getChannelStats",
    async (_, thunkAPI) => {
        try {
            const response = await AxiosInstance.get(`/dashboard/channel-stats`);
            return fulfilled(response);
        } catch (err) {
            return thunkAPI.rejectWithValue(rejected(err));
        }
    }
)

export const getUserVideos = createAsyncThunk(
    "account/getUserVideos",
    async (_, thunkAPI) => {
        try {
            const response = await AxiosInstance.get(`/dashboard/user-videos`);

            return fulfilled(response);
        } catch (err) {
            return thunkAPI.rejectWithValue(rejected(err));
        }
    }
)

export const getWatchHistory = createAsyncThunk(
    "account/getWatchHistory",
    async (_, thunkAPI) => {
        try {
            const response = await AxiosInstance.get(`/users/get-watch-history`);

            return fulfilled(response);
        } catch (err) {
            return thunkAPI.rejectWithValue(rejected(err));
        }
    }
)

export const removeVideoFromWatchHistory = createAsyncThunk(
    "account/removeVideoFromWatchHistory",
    async (videoId, thunkAPI) => {
        try {
            const response = await AxiosInstance.delete(`/users/remove-video-from-watch-history/${videoId}`);
            thunkAPI.dispatch(removeVideoFromUserData(videoId))
            return fulfilled(response);
        } catch (err) {
            return thunkAPI.rejectWithValue(rejected(err));
        }
    }
)