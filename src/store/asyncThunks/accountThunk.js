import { createAsyncThunk } from "@reduxjs/toolkit";
import { fulfilled, rejected } from "../../utils/responses";
import AxiosInstance from "../../utils/AxiosInstance";

export const updateAccountDetails = createAsyncThunk(
    "account/updateDetails",
    async (data, thunkAPI) => {
        try {
            const response = await AxiosInstance.put("http://localhost:5000/api/v1/account/update-details", data);
            return fulfilled(response);
        } catch (err) {
            return thunkAPI.rejectWithValue(rejected(err));
        }
    }
)