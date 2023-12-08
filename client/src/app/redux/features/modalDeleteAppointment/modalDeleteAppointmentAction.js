import { openModal, closeModal } from "./modalDeleteAppointmentSlice";

export const openModalDeleteAppointmentAction = (data) => (dispatch) => {
    dispatch(openModal(data));
}

export const closeModalDeleteAppointmentAction = () => (dispatch) => {
    dispatch(closeModal());
}