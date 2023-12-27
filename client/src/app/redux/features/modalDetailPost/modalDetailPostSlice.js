'use client'

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen : false,
    publication:{},
    userId:'',
}

export const modalDetailPostSlice = createSlice({
    name : 'modalDetailPost',
     initialState,
     reducers:{
        openModal : (state, action) => {
            state.isOpen = true;
            state.publication = action.payload.publication;
            state.userId=action.payload.userId;
        },
        closeModal : (state,action) => {
            state.isOpen = false;
            state.publication={};
            state.userId='';
        }
     }
});

export const {openModal, closeModal} = modalDetailPostSlice.actions;
export default modalDetailPostSlice.reducer;