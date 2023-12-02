'use client'

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen : false,
    data : {},
}

export const modalDeleteSlice = createSlice({
    name : 'modalDelete',
    initialState,
    reducers:{
        openModal:(state,action) => {
            state.isOpen = true;
            state.data = action.payload;
        },
        closeModal : (state) => {
            state.isOpen = false;
            state.data = {};
        }
    }
});

export const {openModal, closeModal} = modalDeleteSlice.actions;
export default modalDeleteSlice.reducer;