import {getComments, addComments, deleteComments, cleanComments} from  './commentsSlice';
import axios from 'axios';

const URL_BASE = "http://localhost:3001"

export const getCommentsAction = (id) => async(dispatch) => {
    const comments = (await axios.post(`${URL_BASE}/comments/publication`,{publicationId:id})).data;
    const orderedComments = comments.data.sort((a,b) => {
        const A = new Date(a.createdAt);
        const B = new Date(b.createdAt);
        return B-A;
    })
    dispatch(getComments(orderedComments))
}

export const postCommentAction = (comment) => async(dispatch) => {
    const newComment = (await axios.post(`${URL_BASE}/comments`,comment)).data;
    // dispatch(addComments(comment));
    dispatch(getCommentsAction(comment.publicationId));
}

export const deleteCommentAction = (id) => async(dispatch) => {
    await axios.delete(`${URL_BASE}/comments/${id}`);
    dispatch(deleteComments(id));
}

export const cleanCommentsAction = () => (dispatch) => {
    dispatch(cleanComments());
}