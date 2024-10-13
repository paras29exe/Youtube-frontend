import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../utils/AxiosInstance";
import { fulfilled, rejected } from "../../utils/responses";
import { useSearchParams } from "react-router-dom";


export const addComment = createAsyncThunk(
    "comments/addComment",
    async (data, thunkAPI) => {
        const videoId = window.location.href.split("?v_id=")[1];

        const formData = new FormData();
        formData.append("content", data.content);

        try {
            const response = await AxiosInstance.post("/comments/add-comment/" + videoId , formData);
            return fulfilled(response);
        } catch (err) {
            return thunkAPI.rejectWithValue(rejected(err));
        }
    }
)

export const getComments = createAsyncThunk(
    "comments/getComments",
    async (_, thunkAPI) => {
        const videoId = window.location.href.split("?v_id=")[1];

        try {
            const response = await AxiosInstance.get(`/comments/get-comments/${videoId}`);
            return fulfilled(response);
        } catch (err) {
            return thunkAPI.rejectWithValue(rejected(err));
        }
    }
)