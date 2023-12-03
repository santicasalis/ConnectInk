import { openModal, closeModal } from "./modalDeleteStyleSlice";

export const openModalDeleteStyleAction = (data) => (dispatch) => {
    dispatch(openModal(data));
    
}

export const closeModalDeleteStyleAction = () => (dispatch) => {
    dispatch(closeModal());
}