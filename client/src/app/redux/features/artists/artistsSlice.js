"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  people: [],
  filtered: [],
  detail: {},
  disabled: [],
};

export const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {
    getArtists: (state, action) => {
      state.people = action.payload;
      state.filtered = action.payload;
    },

    filterArtist: (state, action) => {
      state.filtered = action.payload;
    },
    deleteArtist: (state, action) => {
      const deletedId = action.payload;
      state.people = state.people.filter((artist) => artist.id !== deletedId);
      state.filtered = state.filtered.filter(
        (artist) => artist.id !== deletedId
      );
    },

    disabledArtists: (state, action) => {
      state.disabled = action.payload;
    },

    orderArtist: (state, action) => {
      switch (action.payload) {
        case "asc":
          state.filtered = state.filtered.sort((a, b) =>
            a.fullName.localeCompare(b.fullName)
          );
          break;
        case "desc":
          state.filtered = state.filtered.sort((a, b) =>
            b.fullName.localeCompare(a.fullName)
          );
          break;
      }
    },

    orderArtistRating: (state, action) => {
      const filterdCopy = state.filtered;
      let reviewedArtists = state.filtered.map((artist) => ({
        ...artist,
        averageRating: artist.reviews?.length
          ? artist.reviews.reduce((acc, review) => acc + review.rating, 0) /
            artist.reviews.length
          : 0,
      }));

      switch (action.payload) {
        case "asc":
          reviewedArtists.sort((a, b) => a.averageRating - b.averageRating);
          break;
        case "desc":
          reviewedArtists.sort((a, b) => b.averageRating - a.averageRating);

          break;
        case "reset":
          return {
            ...state,
            filtered: filterdCopy,
          };
          break;
      }

      state.filtered = reviewedArtists;
    },

    orderAndFilterArtists: (state, action) => {
      const { filters, sortCriteria } = action.payload;
      let filteredArtists = state.people;

      if (filters.location) {
        filteredArtists = filteredArtists.filter((artist) =>
          artist.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      if (filters.tattooStyle.length > 0) {
        filteredArtists = filteredArtists.filter((artist) =>
          artist.tattooStyle.some((style) =>
            filters.tattooStyle.includes(style)
          )
        );
      }

      if (filters.artistName) {
        filteredArtists = filteredArtists.filter(
          (artist) =>
            artist.name
              .toLowerCase()
              .includes(filters.artistName.toLowerCase()) ||
            artist.lastName
              .toLowerCase()
              .includes(filters.artistName.toLowerCase())
        );
      }

      if (sortCriteria.tag) {
        switch (sortCriteria.tag) {
          case "asc":
            filteredArtists = filteredArtists.sort((a, b) =>
              a.name.localeCompare(b.name)
            );
            break;
          case "desc":
            filteredArtists = filteredArtists.sort((a, b) =>
              b.name.localeCompare(a.name)
            );
            break;
        }
      }

      state.filtered = filteredArtists;
    },

    /*MANEJO DE LA DISPONIBILIDAD HORARIA*/

    getDetail: (state, action) => {
      state.detail = action.payload;
    },

    cleanDetail: (state) => {
      state.detail = {};
    },
  },
});

export const {
  getArtists,
  filterArtist,
  orderArtist,
  orderAndFilterArtists,
  deleteArtist,
  getDetail,
  cleanDetail,
  orderArtistRating,
  disabledArtists,
} = artistsSlice.actions;

export default artistsSlice.reducer;
