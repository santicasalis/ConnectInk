"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    appointments: [],
    filtered:[]
    
}

export const appointmentsSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {
        // getAppointment: (state, action) => {
        //     state.appointments = action.payload
        // },
 
        // deleteAppointment: (state, action) => {
        //     state.appointments = state.appointments.filter((app) => app.id !== action.payload);
        // },
        deleteApp: (state, action) => {
            const deletedId = action.payload;
            state.appointments = state.appointments.filter((app) => app.id !== deletedId);
            state.filtered = state.filtered.filter(
              (app) => app.id !== deletedId
            );
          },

    }
})

export const {getAppointment , deleteAppointment, deleteApp} = appointmentsSlice.actions


export default appointmentsSlice.reducer

