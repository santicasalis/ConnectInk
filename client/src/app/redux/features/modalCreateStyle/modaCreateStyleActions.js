import { openModal, closeModal } from "./modalCreateStyleSlice";

export const openModalCreateStyleAction = () => (dispatch) => {
    dispatch(openModal());
}

export const closeModalCreateStyleAction = () => (dispatch) => {
    dispatch(closeModal());
}