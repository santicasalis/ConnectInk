"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import React from 'react'
import {
    filterAllArtists,
    getAllArtists,
    OrderAllArtists,
  } from "../../app/redux/features/artists/artistActions";
  

const TopBarOptions = () => {
    const dispatch = useDispatch();
    const [artistOrder, setArtistOrder] = useState("");
    const [filters, setFilters] = useState({
        location: "",
        name: "",
        tattooStyle: [],
      });
    const { people, filtered } = useSelector((state) => state.artists);

//orden alfabetico
useEffect(() => {
    dispatch(OrderAllArtists(artistOrder));
  }, [artistOrder]);

  const handleSortChange = (event) => {
    const order = event.target.value;
    setArtistOrder(order);
  };

  // filtro x nombre
  useEffect(() => {
    dispatch(filterAllArtists(filters));
  }, [filters]);

  const handleChange = (event) => {
    let value = event.target.value;
    setFilters({
      ...filters,
      [event.target.name]: value,
    });
  };


  return (
    <div className='  bg-secondary-900 rounded-lg mb-8 '>
        <nav className="flex gap-x-5 items-center">
        <div className="flex flex-col items-center justify-center mb-8">
            <label
              className="text-lg font-weight:800 flex items-center px-4 py-1 justify-center"
              htmlFor="name"
            >
              Nombre:
            </label>
            <input
              className="mb-8 mx-auto text-black"
              list="names"
              id="name"
              name="name"
              onChange={handleChange}
            />
          </div>
            <div className="flex flex-col items-center justify-center mb-8">
            <label
              className="text-lg font-weight:800 flex items-center gap-4 px-4 py-1 justify-center mb-6"
              htmlFor="sort"
            >
              Rating:
            </label>
            <select
              className="mb-8 mx-auto text-black"
              id="sort"
              name="sort"
              onChange={handleSortChange}
            >
              <option value="">Rating</option>
              <option value="asc">1-5</option>
              <option value="desc">5-1</option>
            </select>
          </div>
            <div className="flex flex-col items-center justify-center mb-8">
            <label
              className="text-lg font-weight:800 flex items-center gap-4 px-4 py-1 justify-center mb-6"
              htmlFor="sort"
            >
              Alfabetico:
            </label>
            <select
              className="mb-8 mx-auto text-black"
              id="sort"
              name="sort"
              onChange={handleSortChange}
            >
              <option value="">Sin orden</option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>
        </nav>
    </div>
  )
}

export default TopBarOptions