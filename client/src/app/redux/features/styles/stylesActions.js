import { getStyles,addStyle,deleteStyle } from "./stylesSlice";
import axios from "axios";

const URL_BASE = "http://localhost:3001"


export const getAllStyles = () => async (dispatch) =>{
    const allStyles = (await axios(`${URL_BASE}/tattooStyles`)).data
    dispatch(getStyles(allStyles))
}

export const addNewStyle = (newStyle) => async (dispatch) => {
    const addedStyle = (await axios.post(`${URL_BASE}/tattooStyles`, newStyle)).data;
    dispatch(addStyle(addedStyle));
  };

  export const removeStyle = (styleId) => async (dispatch) => {
    await axios.delete(`${URL_BASE}/tattooStyles/${styleId}`);
    dispatch(deleteStyle(styleId));
  };