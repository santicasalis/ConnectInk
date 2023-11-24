import { getStyles } from "./stylesSlice";
import axios from "axios";

const URL_BASE = "http://localhost:3001"


export const getAllStyles = () => async (dispatch) =>{
    const allStyles = (await axios(`${URL_BASE}/tattooStyles`)).data
    console.log(allStyles)
    dispatch(getStyles(allStyles))
}

