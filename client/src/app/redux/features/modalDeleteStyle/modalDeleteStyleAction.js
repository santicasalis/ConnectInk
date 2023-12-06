import { openModal, closeModal } from "./modalDeleteStyleSlice";
import { removeStyle } from "../styles/stylesActions";

export const openModalDeleteStyleAction = (data) => (dispatch) => {
    dispatch(openModal(data));
    
}

export const closeModalDeleteStyleAction = () => (dispatch) => {
    dispatch(closeModal());
}