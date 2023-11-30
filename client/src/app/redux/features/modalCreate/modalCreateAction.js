import { openModalCreate, closeModalCreate } from "./modalCreateSlice";

export const openModalCreateAction = () => (dispatch) => {
    dispatch(openModalCreate());
}

export const closeModalCreateAction = () => (dispatch) => {
    dispatch(closeModalCreate());
}