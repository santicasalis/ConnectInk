"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts: [],
    
}

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        getPosts: (state, action) => {
            state.posts = action.payload
            
        },
       

    }
})

export const {getPosts} = postsSlice.actions


export default postsSlice.reducer

