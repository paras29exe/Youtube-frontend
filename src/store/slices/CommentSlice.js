import { createSlice } from "@reduxjs/toolkit";
import { addComment, getComments } from "../ayncThunks/commentThunk";

const initialState = {
    comments: [],
    loading: false,
    error: null,
};

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addComment.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addComment.fulfilled, (state, action) => {
            // state.comments = [...state.comments, action.payload.data];
            state.loading = false;
            state.error = null;
        })
        .addCase(addComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(getComments.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getComments.fulfilled, (state, action) => {
            state.comments = action.payload.data;
            state.loading = false;
            state.error = null;
        })
        .addCase(getComments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export default commentSlice.reducer;