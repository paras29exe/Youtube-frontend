import { createSlice } from "@reduxjs/toolkit";
import { addComment, getComments, deleteComment } from "../asyncThunks/commentThunk";

const initialState = {
    comments: null,
    loading: false,
    error: null,
};

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addComment.fulfilled, (state, action) => {
            state.comments = [action.payload.data, ...state.comments];
            state.loading = false;
            state.error = null;
        })
        .addCase(getComments.fulfilled, (state, action) => {
            state.comments = action.payload.data;
            state.loading = false;
            state.error = null;
        })
        .addCase(deleteComment.fulfilled, (state, action) => {
            state.comments = state.comments.filter((comment) => comment._id !== action.payload.data.deleted);
            state.loading = false;
            state.error = null;
        })
    }
});

export default commentSlice.reducer;