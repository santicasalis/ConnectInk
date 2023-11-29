"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  filterAllArtists,
  getAllArtists,
  OrderAllArtists,
} from "../../app/redux/features/artists/artistActions";
import { getAllStyles } from "../../app/redux/features/styles/stylesActions";

export default function FilterSideBar() {
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

  // useEffect(() => {
  //   dispatch(OrderAllArtists(artistOrder));
  // }, [artistOrder]);


  useEffect(() => {
    const orderAndFilter = async () => {
        const filters = {
            location: filters.location,
            tattooStyle: styleSelected,
            artistName: filters.artistName,
        };

        const sortCriteria = {
            tag: artistOrder,
        };

        dispatch(OrderAndFilterArtists(filters, sortCriteria));
    };

    orderAndFilter();
}, [artistOrder, filters.location, styleSelected, filters.artistName]);




  // const handleSortChange = (event) => {
  //   const order = event.target.value;
  //   setArtistOrder(order);
  // };

  return (
    <div>
      <div className="bg-secondary-100 p-4 flex flex-col transition-all">
        <h2 className="text-center text-2xl font-bold mb-[50px]">
          Filtros <span className="text-primary text-4xl">.</span>
        </h2>
        <form onSubmit={handleSubmit}>
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
              htmlFor="style"
            >
              Estilo de Tatuaje:
            </label>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {styles.map((style) => {
                const isSelected = styleSelected.includes(style.name);
                return (
                  <label
                    className={`flex items-center gap-2 px-3 py-1 border rounded cursor-pointer ${
                      isSelected
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                    }`}
                    htmlFor={style.name}
                    key={style.name}
                    onClick={() => handleStyleChange(style.name)}
                  >
                    {style.name}
                  </label>
                );
              })}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
