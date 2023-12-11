"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    logedInUser: {},
    fireBaseUser: {},
  };
  
  if (typeof window !== "undefined") {
    initialState.logedInUser = JSON.parse(localStorage.getItem("user")) || {};
    initialState.fireBaseUser = JSON.parse(localStorage.getItem("fireBaseUser")) || {};
  }

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.logedInUser = action.payload;
    },
    cleanUser: (state) => {
      state.logedInUser = {};
    },
    getFirebaseInfo: (state, action) => {
      state.fireBaseUser = action.payload;
    },
    cleanFireBaseInfo: (state) => {
      state.fireBaseUser = {};
    },
    getUserPosts: (state, action) => {
      state.logedInUser.publications = action.payload;
    },
    bringInformation: (state, action) => {
        state.logedInUser.fullName = action.payload.fullName
        state.logedInUser.email = action.payload.email;
        state.logedInUser.phone = action.payload.phone;
        state.logedInUser.address = action.payload.address;
        state.logedInUser.location = action.payload.location;
        state.logedInUser.shopName = action.payload.shopName;
        state.logedInUser.image = action.payload.image;
    },
    getAppointment: (state, action) => {
      state.logedInUser.appointments = action.payload
  },
  },
});

export const {
  bringInformation,
  getUser,
  cleanUser,
  getFirebaseInfo,
  cleanFireBaseInfo,
  getUserPosts,
  getAppointment
} = userSlice.actions;

export default userSlice.reducer;
