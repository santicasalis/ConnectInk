"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    names: [],
    
}

export const stylesSlice = createSlice({
    name: "styles",
    initialState,
    reducers: {
        getStyles: (state, action) => {
            state.names = action.payload
        },
       

    }
})

export const {getStyles} = stylesSlice.actions


export default stylesSlice.reducer

