"use client";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useState } from "react";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Price = () => {
  // const dispatch = useDispatch();
  const user = useSelector((state) => state.user.logedInUser);
  const URL_BASE = "http://localhost:3001";

  let errorIndicator = false;
  const router = useRouter();

  const [prices, setPrices] = useState({
    Pequeño: {
      size: "Pequeño",
      priceMin: "",
      priceMax: "",
      tattooArtistId: user.id,
    },

    "Pequeño a color": {
      size: "Pequeño a color",
      priceMin: "",
      priceMax: "",
      tattooArtistId: user.id,
    },
    Mediano: {
      size: "Mediano",
      priceMin: "",
      priceMax: "",
      tattooArtistId: user.id,
    },
    "Mediano a color": {
      size: "Mediano a color",
      priceMin: "",
      priceMax: "",
      tattooArtistId: user.id,
    },
    Grande: {
      size: "Grande",
      priceMin: "",
      priceMax: "",
      tattooArtistId: user.id,
    },
    "Grande a color": {
      size: "Grande a color",
      priceMin: "",
      priceMax: "",
      tattooArtistId: user.id,
    },
  });
  const [errorMessages, setErrorMessages] = useState([]);

  const fetchPrices = async () => {
    try {
      const artist = await axios.get(`${URL_BASE}/tattooArtists/${user.id}`);

      if (artist && artist.data.priceRanges) {
        const fetchedPrices = artist.data.priceRanges.reduce((acc, price) => {
          acc[price.size] = {
            size: price.size,
            priceMin: price.priceMin,
            priceMax: price.priceMax,
            tattooArtistId: user.id,
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
      toast.error(`Error al crear precios`, {
        className: "toastError",
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  useEffect(() => {
    if (!user.userType) {
      router.replace("/auth");
    } else if (user.userType !== "artist") {
      router.replace("/");
    }

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

    setErrorMessages([]);

    for (const size in prices) {
      const priceData = prices[size];

      if (parseInt(priceData.priceMin) > parseInt(priceData.priceMax)) {
        setErrorMessages((prevMessages) => [
          ...prevMessages,
          `Error: El precio mínimo para ${size} no puede ser mayor al precio máximo.`,
        ]);
        return;
      }

      if (priceData.priceRangeId) {
        await updatePrice(priceData);
      } else {
        await createPrice(priceData);
      }
    }

    if (errorIndicator) {
      toast.error(`Error al guardar precios`, {
        className: "toastError",
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
      });
    } else {
      fetchPrices();
      toast.success(`Precios guardados con éxito`, {
        className: "toastSuccess",
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  const updatePrice = async (data) => {
    try {
      await axios.put(`${URL_BASE}/priceRanges/${data.priceRangeId}`, data);
    } catch (error) {
      toast.error(`Error al actualizar precios`, {
        className: "toastError",
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  const createPrice = async (data) => {
    try {
      const response = await axios.post(`${URL_BASE}/priceRanges`, data);
    } catch (error) {
      console.error(error);
      errorIndicator = true;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-secondary-900 w-full rounded-lg shadow-artist/50 shadow-lg">
      <div className=" w-full px-10">
        <h1 className="text-4xl font-rocksalt w-full py-10 text-left border-transparent border-b-artist/30 border-[1px]"> Rango de Precios</h1>
      </div>
      <div className=" p-8 rounded-xl w-full">
        <form onSubmit={handleSubmit}>
          {Object.keys(prices).map((size) => (
            <div key={size} className="flex items-center mr-50 mb-6">
              <div className="w-1/4 font-rocksalt">
                <p className="mb-2">{size}:</p>
              </div>
              <div className="flex-1 flex items-center gap-4 ">
                <p className="font-rocksalt"> $ </p>
                <div className="w-1/3">
                  <input
                    type="number"
                    placeholder="Precio mínimo"
                    value={prices[size].priceMin}
                    onChange={(event) =>
                      handleInputChange(size, "priceMin", event.target.value)
                    }
                    className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 shadow-md shadow-artist/60 "
                  />
                </div>
                <p className="font-rocksalt"> $ </p>
                <div className="w-1/3">
                  <input
                    type="number"
                    placeholder="Precio máximo"
                    value={prices[size].priceMax}
                    onChange={(event) =>
                      handleInputChange(size, "priceMax", event.target.value)
                    }
                    className="w-full py-3 px-4 outline-none rounded-lg bg-secondary-900 shadow-md shadow-artist/60 "
                  />
                </div>
              </div>
            </div>
          ))}
          {errorMessages.length > 0 && (
            <div className="mb-4 text-red-500">
              {errorMessages.map((errorMessage, index) => (
                <p key={index}>{errorMessage}</p>
              ))}
            </div>
          )}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="hover:bg-artist font-rocksalt  flex items-center justify-center gap-1 border-artist text-gray-300 border-[1px] px-2 py-3 rounded-md cursor-pointer"
            >
              Guardar Precios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Price;
