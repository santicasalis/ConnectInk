"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen : false,
    data : {},
}

export const modalCreateSlice = createSlice({
    name : 'modalCreate',
    initialState,
    reducers : {
        openModalCreate : (state) => {
            state.isOpen = true;
            state.data = {};
        },
        closeModalCreate : (state) => {
            state.isOpen = false;
            state.data = {};
        }
    }
});

export const {openModalCreate, closeModalCreate} = modalCreateSlice.actions;
export default modalCreateSlice.reducer;