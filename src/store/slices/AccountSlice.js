import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    loading: false,
    error: null,
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase("account/login/pending", (state, action) => {
            state.loading = true;
        })
         
    }
})

export default accountSlice.reducer