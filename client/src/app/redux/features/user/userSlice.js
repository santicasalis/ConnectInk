"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    id: "",
    image: "",
    publications: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    location: "",
    shopName: "",
    password: ""

}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.id = action.payload.id,
            state.name = action.payload.name,
            state.lastName = action.payload.lastName,
            state.password = action.payload.password,
            state.email = action.payload.email,
            state.phone = action.payload.phone,
            state.address = action.payload.address,
            state.location = action.payload.location,
            state.shopName = action.payload.phone,
            state.publications = action.payload.publications,
            state.image = action.payload.image
        },
        cleanUser: (state) => {
            state.id = "",
            state.name = "",
            state.lastName = "",
            state.password = "",
            state.email = "",
            state.phone = "",
            state.address = "",
            state.location = "",
            state.shopName = "",
            state.publications = "",
            state.image = ""
        }
    }
})

export const {getUser, cleanUser} = userSlice.actions


export default userSlice.reducer

