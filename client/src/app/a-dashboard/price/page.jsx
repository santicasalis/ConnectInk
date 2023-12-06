"use client"
import axios from "axios"
import React from 'react'
import {RiEdit2Line} from "react-icons/ri"
import { useSelector } from 'react-redux'
import Image from 'next/image'
import {  RiEyeLine,  RiEyeOffLine,} from "react-icons/ri";
import { useState } from 'react'
import { useEffect } from 'react'

const Price = () => {
 // const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const URL_BASE = "http://localhost:3001"

  const [prices, setPrices] = useState({
    "Pequeño": { priceMin: '', priceMax: '' },
    "Pequeño a color": { priceMin: '', priceMax: '' },
    "Mediano": { priceMin: '', priceMax: '' },
    "Mediano a color": { priceMin: '', priceMax: '' },
    "Grande": { priceMin: '', priceMax: '' },
    "Grande a color": { priceMin: '', priceMax: '' },
  });

  const handleInputChange = (size, field, value) => {
    setPrices((prevPrices) => ({
      ...prevPrices,
      [size]: {
        ...prevPrices[size],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      
      const response = await axios.post(`${URL_BASE}/priceRange`, prices);
      console.log(response.data), "MUESTRATEEE"; 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='bg-secondary-100 p-8 rounded-xl w-full'>
      <form onSubmit={handleSubmit}>
        
        {Object.keys(prices).map((size) => (
          <div key={size} className='flex items-center mb-4'>
            <div className='w-1/4'>
              <p>{size}:</p>
            </div>
            <div className='flex-1 flex items-center gap-4'>
              <div className='w-1/2'>
                <input
                  type="number"
                  placeholder="Precio mínimo"
                  value={prices[size].priceMin}
                  onChange={(event) => handleInputChange(size, 'min', event.target.value)}
                  className='w-full py-3 px-4 outline-none rounded-lg bg-secondary-900'
                />
              </div>
              <div className='w-1/2'>
                <input
                  type="number"
                  placeholder="Precio máximo"
                  value={prices[size].max}
                  onChange={(event) => handleInputChange(size, 'priceMax', event.target.value)}
                  className='w-full py-3 px-4 outline-none rounded-lg bg-secondary-900'
                />
              </div>
            </div>
          </div>
        ))}

        <button type="submit" className="bg-primary text-white py-2 px-4 rounded-lg">
          Guardar Precios
        </button>
      </form>
    </div>
  );
};

export default Price;