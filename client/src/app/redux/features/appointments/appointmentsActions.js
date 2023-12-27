import { getAppointment, deleteAppointment , deleteApp} from "./appointmentsSlice";
import axios from "axios";

const URL_BASE = "http://localhost:3001"


// export const getAllAppointments = (id) => async (dispatch) =>{
//     const allApointments = (await axios(`${URL_BASE}/appointments${id}`)).data
//     dispatch(getAppointment(allApointments))
// }

  export const removeAppointment = (id) => async (dispatch) => {
    console.log(id, "dfgdfgdf")
    await axios.delete(`${URL_BASE}/appointments/${id}`);
       dispatch(deleteApp(id));
  };