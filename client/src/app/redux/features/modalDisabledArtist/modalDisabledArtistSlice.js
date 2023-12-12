'use client'

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen : false,
    data : "",
}

export const modalDisabledArtistSlice = createSlice({
    name : 'modalDisabledArtist',
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

export const {openModal, closeModal} = modalDisabledArtistSlice.actions;
export default modalDisabledArtistSlice.reducer;