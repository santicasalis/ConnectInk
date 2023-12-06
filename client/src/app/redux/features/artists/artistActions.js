import {
  // addTimeAvailabilityExceptionSuccess,
  // setTimeAvailabilityExceptions,
  // updateTimeAvailability,
  // setTimeAvailabilities,
  getArtists,
  filterArtist,
  orderArtist,
  orderArtistRating,
  orderAndFilterArtists,
  deleteArtist,
  getDetail,
  cleanDetail
} from "./artistsSlice";
import axios from "axios";

const URL_BASE = "http://localhost:3001"


export const getAllArtists = () => async (dispatch) =>{
    const allArtists = (await axios(`${URL_BASE}/tattooArtists`)).data
    dispatch(getArtists(allArtists))
}

export const filterAllArtists = (filter) => async (dispatch) =>{
    const filteredArtists = (await axios.post(`${URL_BASE}/filters`, filter)).data
    dispatch(filterArtist(filteredArtists))
}


export const OrderAllArtists = (tag)=>(dispatch)=> {
    dispatch(orderArtist(tag))
}

export const OrderAndFilterArtists = (filters, sortCriteria) => (dispatch) => {
    dispatch(orderAndFilterArtists({ filters, sortCriteria }));
};

export const DeleteArtists = (id) => async (dispatch) => {
      await axios.delete(`${URL_BASE}/tattooArtists/${id}`)
    dispatch(deleteArtist(id))
}

/*MANEJO DE LA DISPONIBILIDAD HORARIA*/

// export const getTimeAvailabilities = (id) => async (dispatch) => {
//   try {
//     const response = await axios.get(`${URL_BASE}/tattooArtists/${id}`);
//     dispatch(
//       setTimeAvailabilities({
//         id,
//         availabilities: response.data.timeAvailabilities,
//       })
//     );
//   } catch (error) {
//     console.error("Error al obtener los horarios de disponibilidad:", error);
//   }
// };

// export const updateArtistTimeAvailability =
//   (id, { initialHour, finalHour }) =>
//   async (dispatch) => {
//     try {
//       const response = await axios.put(`${URL_BASE}/timeAvailabilities/${id}`, {
//         initialHour,
//         finalHour,
//       });
      
//       dispatch({
//         type: "UPDATE_TIME_AVAILABILITY_SUCCESS",
//         payload: { id, ...response.data },
//       });
//     } catch (error) {
//       console.error(
//         "Error al actualizar la disponibilidad de tiempo del artista:",
//         error
//       );
//     }
//   };


// export const addTimeAvailabilityException =
//   (tattooArtistId, date, initialHour, finalHour) => async (dispatch) => {
//     try {
//       const response = await axios.post(
//         `${URL_BASE}/timeAvailabilityExceptions`,
//         {
//           tattooArtistId,
//           date,
//           initialHour,
//           finalHour,
//         }
//       );
//       dispatch({
//         type: "ADD_TIME_AVAILABILITY_EXCEPTION_SUCCESS",
//         payload: response.data,
//       });
//     } catch (error) {
//       console.error("Error al crear la excepción de disponibilidad:", error);
//       alert("Error al crear la excepción de disponibilidad");
//     }
//   };


//   export const getTimeExceptions = (id) => async (dispatch) => {
//     try {
//       const response = await axios.get(`${URL_BASE}/tattooArtists/${id}`);
//       console.log(response.data.timeAvailabilityExceptions)
//       dispatch(
//         setTimeAvailabilityExceptions({
//           userId: id,
//           exceptions: response.data.timeAvailabilityExceptions,
//         })
//       );
//     } catch (error) {
//       console.error("Error al obtener las excepciones de tiempo:", error);
//     }
//   };

  export const getArtistDetail = (id) => async (dispatch) => {
    const response = await axios(`${URL_BASE}/tattooArtists/${id}`)

    dispatch(getDetail(response.data))
  }

  export const cleanArtistDetail = () => (dispatch) => {
    dispatch(cleanDetail())
  }