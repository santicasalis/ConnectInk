import {
  getArtists,
  filterArtist,
  orderArtist,
  orderArtistRating,
  orderAndFilterArtists,
  deleteArtist,
  getDetail,
  cleanDetail,
  disabledArtists,
} from "./artistsSlice";
import axios from "axios";

const URL_BASE = "http://localhost:3001";

export const getAllArtists = () => async (dispatch) => {
  const allArtists = (await axios(`${URL_BASE}/tattooArtists`)).data;
  dispatch(getArtists(allArtists));
};

export const filterAllArtists = (filter) => async (dispatch) => {
  const filteredArtists = (await axios.post(`${URL_BASE}/filters`, filter))
    .data;

  dispatch(filterArtist(filteredArtists));
};

export const OrderAllArtists = (tag) => (dispatch) => {
  dispatch(orderArtist(tag));
};

export const OrderAllArtistsRating = (tag) => (dispatch) => {
  dispatch(orderArtistRating(tag));
};

export const OrderAndFilterArtists = (filters, sortCriteria) => (dispatch) => {
  dispatch(orderAndFilterArtists({ filters, sortCriteria }));
};

export const DeleteArtists = (id) => async (dispatch) => {
  await axios.delete(`${URL_BASE}/tattooArtists/${id}`);
  dispatch(deleteArtist(id));
};

export const CleanArtist = () => async (dispatch) => {
  dispatch(cleanDetail());
};

export const getDisabledArtists = () => async (dispatch) => {
  const response = await axios.get(`${URL_BASE}/tattooArtistsDisabled/`);
  const data = response.data;
  dispatch(disabledArtists(data));
};

export const getArtistDetail = (id) => async (dispatch) => {
  const response = await axios(`${URL_BASE}/tattooArtists/${id}`);

  dispatch(getDetail(response.data));
};

export const cleanArtistDetail = () => (dispatch) => {
  dispatch(cleanDetail());
};
