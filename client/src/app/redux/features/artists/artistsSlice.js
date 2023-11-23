"use client"

import { createSlice } from "@reduxjs/toolkit"

//Hardcodeado hasta que tengamos las rutas, los tatuadores y los tatuajes
import tatuaje1 from "../../../../../public/assets/tatuaje1.jpeg"
import tatuaje2 from "../../../../../public/assets/tatuaje2.jpeg"
import tatuaje3 from "../../../../../public/assets/tatuaje3.jpeg"
import tatuaje4 from "../../../../../public/assets/tatuaje4.jpeg"

const allArtists = [
    {
        name: "Pablo",
        location: "Caballito",
        tattoos: [
            tatuaje1, tatuaje2
        ]
    },
    {
        name: "Marcos",
        location: "Zona norte",
        tattoos: [
            tatuaje3
        ]
    },
    {
        name: "Carla",
        location: "Devoto",
        tattoos: [
            tatuaje4
        ]
    }
]

const initialState = {
    people: []
}

export const artistsSlice = createSlice({
    name: "artists",
    initialState,
    reducers: {
        getArtists: (state) => {state.people = allArtists}
    }
})

export const {getArtists} = artistsSlice.actions

export default artistsSlice.reducer