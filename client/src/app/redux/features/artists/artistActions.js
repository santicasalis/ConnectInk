import { getArtists, filterArtist, orderArtist,orderArtistRating, orderAndFilterArtists, deleteArtist } from "./artistsSlice";
import axios from "axios";

const URL_BASE = "http://localhost:3001"


export const getAllArtists = () => async (dispatch) =>{
    const allArtists = (await axios(`${URL_BASE}/tattooArtists`)).data
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

export const DeleteArtists = (id) => async (dispatch) => {
      await axios.delete(`${URL_BASE}/tattooArtists/${id}`)
    dispatch(deleteArtist(id))
}

// export const OrderAllArtistsRating = (tag)=>(dispatch)=> {
//     dispatch(orderArtistRating(tag))
// }

