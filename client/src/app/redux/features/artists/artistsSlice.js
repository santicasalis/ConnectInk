"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    people: [],
    filtered:[],
    
}

export const artistsSlice = createSlice({
    name: "artists",
    initialState,
    reducers: {
        getArtists: (state, action) => {
            state.people = action.payload
            state.filtered = action.payload
            
        },

        filterArtist:(state,action)=>{
            state.filtered = action.payload
        },
        orderArtist:(state,action)=>{
            switch(action.payload){
                case "asc":
                state.filtered = state.filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
                case "desc":
                state.filtered = state.filtered.sort((a, b) => b.name.localeCompare(a.name));
                break;
            }
        },
        orderAndFilterArtists: (state, action) => {
            const { filters, sortCriteria } = action.payload;
            let filteredArtists = state.people;

            if (filters.location) {
                filteredArtists = filteredArtists.filter(artist => artist.location.toLowerCase().includes(filters.location.toLowerCase()));
            }

            if (filters.tattooStyle.length > 0) {
                filteredArtists = filteredArtists.filter(artist =>
                    artist.tattooStyle.some(style => filters.tattooStyle.includes(style))
                );
            }

            if (filters.artistName) {
                filteredArtists = filteredArtists.filter(artist =>
                    artist.name.toLowerCase().includes(filters.artistName.toLowerCase()) ||
                    artist.lastName.toLowerCase().includes(filters.artistName.toLowerCase())
                );
            }

            if (sortCriteria.tag) {
                switch (sortCriteria.tag) {
                    case "asc":
                        filteredArtists = filteredArtists.sort((a, b) => a.name.localeCompare(b.name));
                        break;
                    case "desc":
                        filteredArtists = filteredArtists.sort((a, b) => b.name.localeCompare(a.name));
                        break;
                 
                }
            }

            state.filtered = filteredArtists;
},



        // orderArtistRating:(state,action)=>{
        //     switch(action.payload){
        //         case "asc":
        //         state.filtered = state.filtered.sort((a, b) => a.name.localeCompare(b.name));
        //         break;
        //         case "desc":
        //         state.filtered = state.filtered.sort((a, b) => b.name.localeCompare(a.name));
        //         break;
        //     }
        // }
    }
})

export const {getArtists, filterArtist, orderArtist, orderArtistRating, orderAndFilterArtists} = artistsSlice.actions



export default artistsSlice.reducer

