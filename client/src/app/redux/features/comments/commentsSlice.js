"use client"

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comments : [],
}

export const commentsSlice = createSlice({
    name : "comments",
    initialState,
    reducers:{
        getComments : (state,action) => {
            state.comments = action.payload
        },
        addComments: (state,action) => {
            state.comments.unshift(action.payload)
        },
        deleteComments: (state,action) => {
            state.comments = state.comments.filter((comment) => comment.id != action.payload)
        },
        cleanComments: (state) => {
            state.comments = [];
        } 
    }
});

export const {getComments, addComments, deleteComments, cleanComments} = commentsSlice.actions

export default commentsSlice.reducer