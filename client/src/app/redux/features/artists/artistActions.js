import {updateTimeAvailability, setTimeAvailabilities,getArtists, filterArtist, orderArtist,orderArtistRating, orderAndFilterArtists, deleteArtist } from "./artistsSlice";
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

export const getTimeAvailabilities = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${URL_BASE}/tattooArtists/${id}`);
    dispatch(
      setTimeAvailabilities({
        id,
        availabilities: response.data.timeAvailabilities,
      })
    );
  } catch (error) {
    console.error("Error al obtener los horarios de disponibilidad:", error);
  }
};

export const updateArtistTimeAvailability =
  (id, { initialHour, finalHour }) =>
  async (dispatch) => {
    try {
      await axios.put(`${URL_BASE}/timeAvailabilities/${id}`, {
        initialHour,
        finalHour,
      });
      dispatch(updateTimeAvailability({ id, initialHour, finalHour }));
    } catch (error) {
      console.error(
        "Error al actualizar la disponibilidad de tiempo del artista:",
        error
      );
    }
  };
