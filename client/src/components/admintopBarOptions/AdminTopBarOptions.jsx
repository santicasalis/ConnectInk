"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  filterAllArtists,
  getAllArtists,
  OrderAllArtists,
} from "../../app/redux/features/artists/artistActions";
import { getAllStyles } from "../../app/redux/features/styles/stylesActions";

const TopBarOptions = () => {
  const dispatch = useDispatch();
  const styles = useSelector((state) => state.styles.names);
  const { people, filtered } = useSelector((state) => state.artists);

  const [artistOrder, setArtistOrder] = useState("");
  const [styleSelected, setStyleSelected] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    name: "",
    tattooStyle: [],
  });

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

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleStyleChange = (styleName) => {
    if (styleSelected.includes(styleName)) {
      setStyleSelected(styleSelected.filter((style) => style !== styleName));
    } else {
      setStyleSelected([...styleSelected, styleName]);
    }
  };

  useEffect(() => {
    setFilters({ ...filters, tattooStyle: styleSelected });
  }, [styleSelected]);

  useEffect(() => {
    dispatch(OrderAllArtists(artistOrder));
  }, [artistOrder]);

  const handleSortChange = (event) => {
    const order = event.target.value;
    setArtistOrder(order);
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
              className="text-lg font-weight:800 flex items-center px-4 py-1 justify-center"
              htmlFor="city"
            >
              Ciudad:
            </label>
            <input
              className="mb-8 mx-auto text-black"
              list="cities"
              id="city"
              name="location"
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
              <option value="asc">Z-A</option>
              <option value="desc">A-Z</option>
            </select>
          </div>
        </nav>
    </div>
  )
}

export default TopBarOptions