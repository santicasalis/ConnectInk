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
        addStyle: (state, action) => {
            state.names.push(action.payload);
        },
        deleteStyle: (state, action) => {
            state.names = state.names.filter((style) => style.id !== action.payload);
        },
       

    }
})

export const {getStyles, addStyle, deleteStyle} = stylesSlice.actions


export default stylesSlice.reducer

