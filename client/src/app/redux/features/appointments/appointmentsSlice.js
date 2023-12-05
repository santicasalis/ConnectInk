"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    appointments: [],
    
}

export const appointmentsSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {
        getAppointment: (state, action) => {
            state.appointments = action.payload
        },
 
        deleteAppointment: (state, action) => {
            state.appointments = state.appointments.filter((app) => app.id !== action.payload);
        },
       

    }
})

export const {getAppointment , deleteAppointment} = appointmentsSlice.actions


export default appointmentsSlice.reducer

