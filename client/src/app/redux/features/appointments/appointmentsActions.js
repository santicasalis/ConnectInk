import { getAppointment, deleteAppointment } from "./appointmentsSliceSlice";
import axios from "axios";

const URL_BASE = "http://localhost:3001"


export const getAllAppointments = (id) => async (dispatch) =>{
    const allApointments = (await axios(`${URL_BASE}/appointments${id}`)).data
    dispatch(getAppointment(allApointments))
}

  export const removeAppointment = (id) => async (dispatch) => {
    const deleteApp = await axios.delete(`${URL_BASE}/appointments/${id}`);
    dispatch(deleteAppointment(deleteApp));
  };