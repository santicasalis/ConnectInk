import { openModal, closeModal } from "./modalDetailPostSlice";

export const openModalDetailPostAction = (information) => (dispatch) => {
    dispatch(openModal(information));
}

export const closeModalDetailPostAction = () => (dispatch) => {
    dispatch(closeModal());
}