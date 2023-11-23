"use client"

import { configureStore } from "@reduxjs/toolkit"
import getArtists from "./features/artists/artistsSlice"

export const store = configureStore({
    reducer: {
        artists: getArtists
    }
})