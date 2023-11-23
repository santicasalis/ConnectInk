"use client"

import { configureStore } from "@reduxjs/toolkit"
import artistReducer from "./features/artists/artistsSlice"

export const store = configureStore({
    reducer: {
        artists: artistReducer
    }
})