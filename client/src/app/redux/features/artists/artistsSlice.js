"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    people: [],
    filtered:[]
}

export const artistsSlice = createSlice({
    name: "artists",
    initialState,
    reducers: {
        getArtists: (state, action) => {
            state.people = action.payload
            state.filtered = action.payload
        },
        filterArtist:(state,action)=>{
            state.filtered = action.payload
        }

    }
})

export const {getArtists, filterArtist} = artistsSlice.actions



export default artistsSlice.reducer

