import { getPosts } from "./postsSlice";
import axios from "axios";

const URL_BASE = "http://localhost:3001"


export const getAllPosts = () => async (dispatch) =>{
    try {
        const allPosts = (await axios.get(`${URL_BASE}/publications`)).data

    dispatch(getPosts(allPosts))

    } catch (error) {
        console.error(error)
    }
    

}