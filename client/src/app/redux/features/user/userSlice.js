"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    id: "",
    image: "",
    publications: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    location: "",
    shopName: "",
    priceRanges: [],
    timeAvailabilities: [],
    timeAvailabilityExceptions: []

}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.id = action.payload.id,
            state.fullName = action.payload.fullName,
            state.email = action.payload.email,
            state.phone = action.payload.phone,
            state.address = action.payload.address,
            state.location = action.payload.location,
            state.shopName = action.payload.shopName,
            state.publications = action.payload.publications,
            state.image = action.payload.image,
            state.priceRanges = action.payload.priceRanges,
            state.timeAvailabilities = action.payload.timeAvailabilities,
            state.timeAvailabilityExceptions = action.payload.timeAvailabilityExceptions
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

