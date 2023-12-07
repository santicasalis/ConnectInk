"use client";
import axios from "axios";
import React from "react";
import { RiEdit2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import Image from "next/image";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Price = () => {
  // const dispatch = useDispatch();
  const user = useSelector((state) => state.user.logedInUser);
  const URL_BASE = "http://localhost:3001";

  const [prices, setPrices] = useState({
    Pequeño: { size: "Pequeño", priceMin: "", priceMax: "", artistId: user.id },
    "Pequeño a color": { size: "Pequeño a color",priceMin: "", priceMax: "", artistId: user.id },
    Mediano: { size: "Mediano", priceMin: "", priceMax: "", artistId: user.id },
    "Mediano a color": {size: "Mediano a color", priceMin: "", priceMax: "", artistId: user.id },
    Grande: { size: "Grande", priceMin: "", priceMax: "", artistId: user.id },
    "Grande a color": {size: "Grande a color",  priceMin: "", priceMax: "", artistId: user.id  },
  });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const artist = await axios.get(`${URL_BASE}/tattooArtists/${user.id}`);

        if (artist && artist.data.priceRanges) {
          const fetchedPrices = artist.data.priceRanges.reduce((acc, price) => {
            acc[price.size] = {
              size: price.size,
              priceMin: price.priceMin,
              priceMax: price.priceMax,
              artistId: user.id,
              priceRangeId: price.id,
            };

            return acc;
          }, {});

          setPrices((prevPrices) => ({
            ...prevPrices,
            ...fetchedPrices,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrices();
  }, [user.id]);

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
       for (const size in prices) {
      const priceData = prices[size];
      if (priceData.priceRangeId) {
        await updatePrice(priceData);
      } else {
        await createPrice(priceData);
      }
    }
    
  };

  const createPrice = async (data) => {
    try {
      await axios.post(`${URL_BASE}/priceRanges`, data);
    } catch (error) {
      console.error(error);
      
    }
  };

  const updatePrice = async (data) => {
    try {
      await axios.put(`${URL_BASE}/priceRanges/${data.priceRangeId}`, data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="flex items-center justify-center h-screen font-rocksalt">
    <div className="bg-secondary-100 p-8 rounded-xl w-full">
      <form onSubmit={handleSubmit}>
        {Object.keys(prices).map((size) => (
          <div key={size} className="flex items-center mr-50 mb-4">
            <div className="w-1/4">
              <p className="mb-2" >{size}:</p>
            </div>
            <div className="flex-1 flex items-center gap-4">
            <p> $ </p>
              <div className="w-1/3">
                
                <input
                  type="number"
                  placeholder="Precio mínimo"
                  value={prices[size].priceMin}
                  onChange={(event) =>
                    handleInputChange(size, "priceMin", event.target.value)
                  }
                  className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900"
                />
              </div>
              <p> $ </p>
              <div className="w-1/3">
                <input
                  type="number"
                  placeholder="Precio máximo"
                  value={prices[size].priceMax}
                  onChange={(event) =>
                    handleInputChange(size, "priceMax", event.target.value)
                  }
                  className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="hover:bg-primary hover:text-black flex items-center justify-center gap-1 border-primary text-gray-300 border-[1px] px-2 py-3 rounded-md cursor-pointer"
        >
          Guardar Precios
        </button>
      </form>
    </div>
    </div>
  );
};

export default Price;