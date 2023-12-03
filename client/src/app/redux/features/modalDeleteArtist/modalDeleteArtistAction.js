import { openModal, closeModal } from "./modalDeleteArtistSlice";

export const openModalDeleteArtistAction = (data) => (dispatch) => {
    dispatch(openModal(data));
    
}

export const closeModalDeleteArtistAction = () => (dispatch) => {
    dispatch(closeModal());
}