"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen : false,
}

export const modalLoading = createSlice({
    name : 'modalLoading',
    initialState,
    reducers : {
        openModal : (state) => {
            state.isOpen = true;
        },
        closeModal : (state) => {
            state.isOpen = false;
        }
    }
});

export const {openModal, closeModal} = modalLoading.actions;
export default modalLoading.reducer;