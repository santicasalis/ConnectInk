import { openModal, closeModal } from "./modalCancelBookingSlice";

export const openModalCancelBookingAction = (data) => (dispatch) => {
    dispatch(openModal(data));
}

export const closeModalCancelBookingAction = () => (dispatch) => {
    dispatch(closeModal());
}