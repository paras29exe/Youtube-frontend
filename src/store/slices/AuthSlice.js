import { createSlice } from "@reduxjs/toolkit";
import { signup, login, logout, autoLogin } from "../asyncThunks/authThunk"

const initialState = {
    userData: null,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload.data;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            // login thunk
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload.data;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            // refresh token thunk
            .addCase(autoLogin.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.userData = null; // Reset user data when refresh token is expired or invalid
            })
            .addCase(autoLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload.data;
                state.error = null;
            })
            .addCase(autoLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            
            // logout thunk
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.userData = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
    }
})

export default authSlice.reducer;