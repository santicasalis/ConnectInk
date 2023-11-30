import { openModal, closeModal } from "./modalEditSlice";

export const openModalAction = (data) => (dispatch) => {
    dispatch(openModal(data));
}

export const closeModalAction = () => (dispatch) => {
    dispatch(closeModal());
}