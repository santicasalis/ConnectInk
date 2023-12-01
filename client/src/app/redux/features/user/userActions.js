import { getUser, cleanUser } from "./userSlice";
import axios from "axios";

const URL_BASE = "http://localhost:3001";

export const getUserById =
  (tokenId) => async (dispatch) => {
    try {
      const response = await axios.post(`${URL_BASE}/auth`, {
        tokenId
      });

      dispatch(getUser(response.data))
      localStorage.setItem("user", JSON.stringify(response.data))
    } catch (error) {
      console.log(error)
    }
  };

export const logOut = () => async dispatch =>{
  dispatch(cleanUser());
}
