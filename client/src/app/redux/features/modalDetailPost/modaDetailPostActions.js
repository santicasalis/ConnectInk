import { openModal, closeModal } from "./modalDetailPostSlice";

export const openModalDetailPostAction = (information) => (dispatch) => {
    console.log(information,'abriendo modal')
    dispatch(openModal(information));
}

export const closeModalDetailPostAction = () => (dispatch) => {
    dispatch(closeModal());
}