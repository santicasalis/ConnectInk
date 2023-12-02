"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    logedInUser: JSON.parse(localStorage.getItem("user")) || {}
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.logedInUser = action.payload
        },
        cleanUser: (state) => {
            state.logedInUser = {}
        }
    }
})

export const {getUser, cleanUser} = userSlice.actions


export default userSlice.reducer

