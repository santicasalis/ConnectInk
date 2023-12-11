'use client'

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen : false,
    data : '',
}

export const modalCancelBookingSlice = createSlice({
    name : 'modalCancelBooking',
    initialState,
    reducers:{
        openModal:(state,action) => {
            state.isOpen = true;
            state.data = action.payload;
        },
        closeModal : (state) => {
            state.isOpen = false;
            state.data = '';
        }
    }
});

export const {openModal, closeModal} = modalCancelBookingSlice.actions;
export default modalCancelBookingSlice.reducer;