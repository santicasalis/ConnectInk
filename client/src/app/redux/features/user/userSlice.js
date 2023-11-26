"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    id: "" 
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.id = action.payload
        },
    }
})

export const {getUser} = userSlice.actions


export default userSlice.reducer

