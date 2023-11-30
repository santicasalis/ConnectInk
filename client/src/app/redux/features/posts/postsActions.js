import { getPosts } from "./postsSlice";
import axios from "axios";

const URL_BASE = "http://localhost:3001"


export const getAllPosts = () => async (dispatch) =>{
    const allPosts = (await axios(`${URL_BASE}/puclications`)).data
    dispatch(getPosts(allPosts))
}