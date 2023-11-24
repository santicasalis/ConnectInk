"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    people: [],
    
}

export const artistsSlice = createSlice({
    name: "artists",
    initialState,
    reducers: {
        getArtists: (state, action) => {
            state.people = action.payload
        },
    }
})

export const {getArtists} = artistsSlice.actions


export default artistsSlice.reducer

