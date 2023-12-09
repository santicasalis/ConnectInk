import { openModal, closeModal } from "./ModalLoadingSlice";

export const openModalLoadingAction = () => (dispatch) => {
    dispatch(openModal());
}

export const closeModalLoadingAction = () => (dispatch) => {
    dispatch(closeModal());
}