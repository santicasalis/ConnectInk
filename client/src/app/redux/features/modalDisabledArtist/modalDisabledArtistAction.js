import { openModal, closeModal } from "./modalDisabledArtistSlice";

export const openModalDisabledArtistAction = (data) => (dispatch) => {
    dispatch(openModal(data));
    
}

export const closeModalDisabledArtistAction = () => (dispatch) => {
    dispatch(closeModal());
}