import { getArtists } from "./artistsSlice";
import axios from "axios";

const URL_BASE = "http://localhost:3001"


export const getAllArtists = () => async (dispatch) =>{
    const allArtists = (await axios(`${URL_BASE}/tattooArtists`)).data
    dispatch(getArtists(allArtists))
}

