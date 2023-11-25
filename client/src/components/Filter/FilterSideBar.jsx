"use client"

import React, {useState} from 'react'
import Link from 'next/link'
import {IoIosStarOutline } from 'react-icons/io'

const FilterSideBars = ({ onFilterChange }) => {
  // const [selectedCity, setSelectedCity] = useState('');
  // const [selectedRating, setSelectedRating] = useState('');

  // const cities = ['Caballito', 'Zona Norte', 'Devoto', 'Palermo', 'Belgrano'];
  // const ratings = ['1', '2', '3', '4', '5'];

  // const handleCityChange = (event) => {
  //   const city = event.target.value;
  //   setSelectedCity(city);
    
  //   onFilterChange({ city, rating: selectedRating });
  //   console.log(selectedCity);
  // };

  // const handleRatingChange = (rating) => {
  //   setSelectedRating(rating);
  //   onFilterChange({ city: selectedCity, rating });
  // };

  const [ filters, setFilters] = useState([])

  const handleChange = (event)=> {
    setFilters({
      ...filters,
      
      [event.target.name]:event.target.value
      })
      console.log(filters);
  }




  //dispatch de action


//{ location: "location", tatoostyles: ["estilo1", "estilo2"] }
  return (
    <>
    <div className={`xl:h-[100vh] overflow-y-scroll fixed xl:static md:w-[40%] ls:w-[30%] xl:w-auto w-[80%] h-full top-0 bg-secondary-100 p-4 flex flex-col  transition-all`}>
   <h2 className='text-center text-2xl font-bold mb-[50px]'> Investiga <span className='text-primary text-4xl'>.</span></h2>
   <div>
  <label className='text-lg font-weight:800 text flex items-center gap-4 px-4 py-1 justify-center ' htmlFor="city">Ciudad:</label>
  <input list="cities" id="city" onChange={handleChange} />
  {/* <datalist id="cities"> */}
    {/* <option className='mb-[50px]' value="">Selecciona una ciudad</option>
    {cities.map((city) => (
      <option key={city} value={city} className='text-black'>
        {city}
      </option>
    ))} */}
  {/* </datalist> */}
</div>
      {/* <div>
      <div className="text-lg font-weight:800 text flex items-center px-4 py-1 justify-center mt-[50px]">
        <IoIosStarOutline className="text-primary mr-2" />
        <label htmlFor="rating">Rating:</label>
      </div>
       <select id="rating" onChange={(e) => handleChange(e.target.value)}>
          <option  value="">Selecciona un rating</option>
          {ratings.map((rating) => (
            <option key={rating} value={rating} className='text-secondary-100'>
              {rating}
            </option>
          ))}
        </select>
      </div> */}
      </div>
      
    </>
  )
}

export default FilterSideBars