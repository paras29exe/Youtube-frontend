import { createSlice } from "@reduxjs/toolkit";
import { updateAccountDetails } from "../asyncThunks/accountThunk";

const initialState = {
    currentUser: null,
    loading: false,
    error: null,
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(updateAccountDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateAccountDetails.fulfilled, (state, action) => {
            state.currentUser = action.payload.data;
            state.loading = false;
            state.error = null;
        })
        .addCase(updateAccountDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })
    }
})

export default accountSlice.reducer