// import { getAppointment, deleteAppointment } from "./appointmentsSliceSlice";
// import axios from "axios";

// const URL_BASE = "http://localhost:3001"


// export const getAllAppointments = () => async (dispatch) =>{
//     const allApointments = (await axios(`${URL_BASE}/appointments`)).data
//     dispatch(getAppointment(allApointments))
// }

// export const addNewStyle = (newStyle) => async (dispatch) => {
//     const addedStyle = (await axios.post(`${URL_BASE}/tattooStyles`, newStyle)).data;
//     dispatch(addStyle(addedStyle));
//   };

//   export const removeAppointment = (appId) => async (dispatch) => {
//     await axios.delete(`${URL_BASE}/appointments/${appId}`);
//     dispatch(deleteStyle(appId));
//   };