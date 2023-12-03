'use client'

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen : false,
    data : "",
}

export const modalDeleteStyleSlice = createSlice({
    name : 'modalDeleteStyle',
    initialState,
    reducers:{
        openModal:(state,action) => {
            state.isOpen = true;
            state.data = action.payload;
        },
        closeModal : (state) => {
            state.isOpen = false;
            state.data = "";
        }
    }
});

export const {openModal, closeModal} = modalDeleteStyleSlice.actions;
export default modalDeleteStyleSlice.reducer;