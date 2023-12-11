"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen : false,
    data : {},
}

export const modalCreateStyleSlice = createSlice({
    name : 'modalCreateStyle',
    initialState,
    reducers : {
        openModal : (state) => {
            state.isOpen = true;
            state.data = {};
        },
        closeModal : (state) => {
            state.isOpen = false;
            state.data = {};
        }
    }
});

export const {openModal, closeModal} = modalCreateStyleSlice.actions;
export default modalCreateStyleSlice.reducer;