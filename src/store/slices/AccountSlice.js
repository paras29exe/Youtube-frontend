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
         
    }
})