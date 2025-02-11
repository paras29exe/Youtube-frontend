import { createSlice } from "@reduxjs/toolkit";
import { signup, login, loginWithGoogle, logout, autoLogin } from "../asyncThunks/authThunk"

const initialState = {
    userData: null,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserData(state, action) {
            state.userData = {
                ...state.userData,
                fullName: action.payload.fullName,
                username: action.payload.username,
                avatar: action.payload.avatar,
                coverImage: action.payload.coverImage,
            };
        },
        clearUserData(state, action) {
                state.userData = null;
                state.error = null;
                state.loading = null;
        }
    },
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
            // login with google
            .addCase(loginWithGoogle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            // auto login thunk
            .addCase(autoLogin.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(autoLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload.data;
                state.error = null;
            })
            .addCase(autoLogin.rejected, (state, action) => {
                state.loading = false;
                state.userData = null;
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

export const { setUserData, clearUserData } = authSlice.actions;
export default authSlice.reducer;