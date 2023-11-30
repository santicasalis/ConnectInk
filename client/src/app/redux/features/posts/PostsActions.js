import { getPosts } from "./PostSlice";
import axios from 'axios'

const URL_BASE = 'http://localhost:3001'

export const getPostsAction = () => async (dispatch) => {
    const posts = (await axios.get(`${URL_BASE}/publications`)).data
    dispatch(getPosts());
}
