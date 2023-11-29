import { getArtists, filterArtist, orderArtist,orderArtistRating, orderAndFilterArtists } from "./artistsSlice";
import axios from "axios";

const URL_BASE = "http://localhost:3001"


export const getAllArtists = () => async (dispatch) =>{
    const allArtists = (await axios(`${URL_BASE}/tattooArtists`)).data
    console.log(allArtists, "MOSTRATE")
    dispatch(getArtists(allArtists))
}

export const filterAllArtists = (filter) => async (dispatch) =>{
    const filteredArtists = (await axios.post(`${URL_BASE}/filters`, filter)).data
    console.log(filteredArtists, "filteredartisttt")
    dispatch(filterArtist(filteredArtists))

}


export const OrderAllArtists = (tag)=>(dispatch)=> {
    dispatch(orderArtist(tag))
}

export const OrderAndFilterArtists = (filters, sortCriteria) => (dispatch) => {
    dispatch(orderAndFilterArtists({ filters, sortCriteria }));
};
