import { getArtists, filterArtist } from "./artistsSlice";
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

// export const getArtistById = (id) => async (dispatch) => {

//     const artistFound = (await axios.get(`${URL_BASE}/${id}`)).data
//     dispatch(artistFound)

// }
