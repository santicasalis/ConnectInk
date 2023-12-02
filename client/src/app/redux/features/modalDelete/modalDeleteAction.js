import { openModal, closeModal } from "./modaDeleteSlice";

export const openModalDeleteAction = (data) => (dispatch) => {
    dispatch(openModal(data));
}

export const closeModalDeleteAction = () => (dispatch) => {
    dispatch(closeModal());
}