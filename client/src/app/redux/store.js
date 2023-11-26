"use client"

import { configureStore } from "@reduxjs/toolkit"
import artistReducer from "./features/artists/artistsSlice"
import stylesReducer from "./features/styles/stylesSlice"
import userReducer from "./features/user/userSlice"

export const store = configureStore({
    reducer: {
        artists: artistReducer,
        styles: stylesReducer,
        user: userReducer
    }
})