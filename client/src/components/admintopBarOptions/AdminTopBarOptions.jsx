"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  filterAllArtists,
  getAllArtists,
  OrderAllArtists,
} from "../../app/redux/features/artists/artistActions";
import { CgProfile } from "react-icons/cg";
import { MdAbc } from "react-icons/md";
import { FaMapPin, FaRegStar } from "react-icons/fa";
import { getAllStyles } from "../../app/redux/features/styles/stylesActions";
import { OrderAllArtistsRating } from "../../app/redux/features/artists/artistActions";

const TopBarOptions = ({ onFilterChange }) => {
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
    onFilterChange()
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

  const [ratingOrder, setRatingOrder] = useState("");

  useEffect(() => {
    dispatch(OrderAllArtistsRating(ratingOrder));
  }, [ratingOrder]);

  const handleSortChange = (event) => {
    const ratings = event.target.value;
    setRatingOrder(ratings);
  };

  const resetFilters = () => {
    setFilters({
      location: "",
      name: "",
      tattooStyle: [],
    });
    setStyleSelected([]);
    setRatingOrder("reset")
  };

  return (
    <div className="  bg-secondary-900  rounded-lg mb-8 ">
      <nav className="flex gap-x-10 items-center">
        <div className="flex flex-col items-center justify-center mb-8">
          <label
            className="text-2xl font-weight:800 flex items-center px-4 py-1 justify-center font-newrocker mb-[15px]"
            htmlFor="name"
          >
            <CgProfile className="mr-[8px] text-admin" />
            Nombre:
          </label>
          <input
            className="mb-8 w-[70%] bg-secondary-100 text-artistfont rounded-lg outline-none p-2"
            list="names"
            id="name"
            name="name"
            onChange={handleChange}
            value={filters.name}
            placeholder="Buscar por nombre"
          />
        </div>
        <div className="flex flex-col items-center justify-center mb-8 gap">
          <label
            className="text-2xl font-weight:800 flex items-center px-4 py-1 justify-center font-newrocker mb-[15px]"
            htmlFor="city"
          >
            <FaMapPin className="mr-[8px] text-admin" /> Ciudad:
          </label>
          <input
            className="mb-8 w-[70%] bg-secondary-100 text-artistfont rounded-lg outline-none p-2"
            list="cities"
            id="city"
            name="location"
            onChange={handleChange}
            value={filters.location}
            placeholder="Buscar por ciudad"
          />
        </div>
        <div className="flex flex-col items-center justify-center mb-8">
          <label
            className="text-2xl font-weight:800 flex items-center  px-4 py-1 justify-center mb-[15px] font-newrocker"
            htmlFor="sort"
          >
            <FaRegStar className="mr-[8px] text-admin" />
            Valoración:
          </label>
          <select
            className="mb-8 w-[80%] bg-secondary-100 text-artistfont rounded-lg outline-none p-2"
            id="sort"
            name="sort"
            onChange={handleSortChange}
          >
            <option value="">Rating</option>
            <option value="asc">1-5</option>
            <option value="desc">5-1</option>
          </select>
        </div>
        {/* <div className="flex flex-col items-center justify-center mb-8">
          <label
            className="text-2xl font-weight:800 flex items-center  px-4 py-1 justify-center mb-[15px] font-newrocker"
            htmlFor="sort"
          >
            <MdAbc className="mr-[8px] text-admin" />
            Alfabético:
          </label>
          <select
            className="mb-8 w-[80%] bg-secondary-100 text-artistfont rounded-lg outline-none p-2"
            id="sort"
            name="sort"
            onChange={handleSortChange}
          >
            <option value="">-</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div> */}
        {/* <div className="flex justify-center items-center">
            <button onClick={resetFilters} className="font-newrocker  border-[1px] border-primary text-sm rounded">
              Reiniciar Filtros
            </button>
          </div> */}
      </nav>
    </div>
  );
};

export default TopBarOptions;
