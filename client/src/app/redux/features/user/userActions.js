import { getUser, cleanUser, getFirebaseInfo, cleanFireBaseInfo, getUserPosts} from "./userSlice";
import axios from "axios";

const URL_BASE = "http://localhost:3001";

export const getUserById =
  (tokenId, router) => async (dispatch) => {
    try {
      const response = await axios.post(`${URL_BASE}/auth`, {
        tokenId
      });
      
      dispatch(getUser(response.data))
      localStorage.setItem("user", JSON.stringify(response.data))
    } catch (error) {
      router.replace("/auth/register");
    }
  };

export const logOut = () => async dispatch =>{
  dispatch(cleanUser());
  dispatch(cleanFireBaseInfo())
  localStorage.setItem("user", JSON.stringify({}))
}

export const getUserInformation = (user) => async dispatch => {
  dispatch(getFirebaseInfo(user))
}

export const bringUserPosts = (id) => async dispatch => {
  const response = await axios.post(`${URL_BASE}/publications/tattooArtistId`, {id})
  dispatch(getUserPosts(response.data))
}
