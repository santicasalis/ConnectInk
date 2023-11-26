import { getUser, cleanUser } from "./userSlice";
import axios from "axios";

const URL_BASE = "http://localhost:3001"


export const getUserId = (email) => async (dispatch) =>{
    const allArtists = (await axios(`${URL_BASE}/tattooArtists`)).data
    
    const user = allArtists.find((artist) => artist.email == email)

    dispatch(getUser(user))
}

export const logOut = () => (dispatch) => {
    dispatch(cleanUser())
}

