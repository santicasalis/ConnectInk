"use client"

import { configureStore } from "@reduxjs/toolkit"
import artistReducer from "./features/artists/artistsSlice"
import stylesReducer from "./features/styles/stylesSlice"
import userReducer from "./features/user/userSlice"
import modalEditReducer from "./features/modalEdit/modalEditSlice"
import modalCreateReducer from "./features/modalCreate/modalCreateSlice"
import modalDeleteReducer from "./features/modalDelete/modaDeleteSlice"

export const store = configureStore({
    reducer: {
        artists: artistReducer,
        styles: stylesReducer,
        user: userReducer,
        modalEdit: modalEditReducer,
        modalCreate: modalCreateReducer,
        modalDelete: modalDeleteReducer,
    }
})