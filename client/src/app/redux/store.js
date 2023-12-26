"use client";

import { configureStore } from "@reduxjs/toolkit";
import artistReducer from "./features/artists/artistsSlice";
import stylesReducer from "./features/styles/stylesSlice";
import userReducer from "./features/user/userSlice";
import appointmentReducer from "./features/appointments/appointmentsSlice";
import modalEditReducer from "./features/modalEdit/modalEditSlice";
import modalCreateReducer from "./features/modalCreate/modalCreateSlice";
import postsReducer from "./features/posts/postsSlice";
import modalDeleteReducer from "./features/modalDelete/modaDeleteSlice";
import modalDeleteArtistReducer from "./features/modalDeleteArtist/modalDeleteArtistSlice";
import modaleDeleteStyleReducer from "./features/modalDeleteStyle/modalDeleteStyleSlice";
import ModalDeleteAppointmentReducer from "./features/modalDeleteAppointment/modalDeleteAppointmentSlice";
import ModalLoadingReducer from "./features/modalLoading/ModalLoadingSlice";
import ModalCreateStyleReducer from "./features/modalCreateStyle/modalCreateStyleSlice";
import ModalDisabledArtistReducer from "./features/modalDisabledArtist/modalDisabledArtistSlice";
import CommmentsReducer from "./features/comments/commentsSlice";
import ModalDetailPostReducer from "./features/modalDetailPost/modalDetailPostSlice";
export const store = configureStore({
  reducer: {
    artists: artistReducer,
    styles: stylesReducer,
    user: userReducer,
    appointments: appointmentReducer,
    modalEdit: modalEditReducer,
    modalCreate: modalCreateReducer,
    posts: postsReducer,
    modalDelete: modalDeleteReducer,
    modalDeleteArtist: modalDeleteArtistReducer,
    modalDeleteStyle: modaleDeleteStyleReducer,
    modalDeleteAppointment: ModalDeleteAppointmentReducer,
    modalLoading: ModalLoadingReducer,
    modalCreateStyle: ModalCreateStyleReducer,
    modalDisabledArtist: ModalDisabledArtistReducer,
    comments:CommmentsReducer,
    modalDetailPost:ModalDetailPostReducer,
  },
});
