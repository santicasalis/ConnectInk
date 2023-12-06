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
  const user = useSelector((state) => state.user.logedInUser);
  const URL_BASE = "http://localhost:3001"

  const [prices, setPrices] = useState({
    "Pequeño": { size: "Pequeño" ,priceMin: '', priceMax: '' , artistId:user.id },
    "Pequeño a color": { size: "Pequeño a color" ,priceMin: '', priceMax: '' , artistId:user.id},
    "Mediano": { size: "Mediano" ,priceMin: '', priceMax: '' , artistId:user.id},
    "Mediano a color": { size: "Mediano a color" ,priceMin: '', priceMax: '' , artistId:user.id},
    "Grande": { size: "Grande" ,priceMin: '', priceMax: '', artistId:user.id },
    "Grande a color": { size: "Grande a color" ,priceMin: '', priceMax: '' , artistId:user.id},
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

    for( let size in prices){
      const data = { 
        size:prices[size].size , 
        priceMin:prices[size].priceMin , 
        priceMax:prices[size].priceMax , 
        artistId: prices[size].artistId,
      }
      try {
        
         await axios.post(`${URL_BASE}/priceRange`, data);
        
      } catch (error) {
        console.error(error);
      }
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
                  onChange={(event) => handleInputChange(size, 'priceMin', event.target.value)}
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