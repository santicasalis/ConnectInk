"use client";

// Importaciones
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../../components/nav/Nav";
import "./style.css";
import MapComponent from "../../../components/map/map";
import Link from "next/link";
import { CiShop } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ReviewCard from "../../../components/reviewCard/ReviewCard";

import {
  getArtistDetail,
  CleanArtist,
} from "../../../app/redux/features/artists/artistActions";
import {
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
  RiBuilding4Line,
} from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const artist = useSelector((state) => state.artists.detail);

  const user = useSelector((state) => state.user.logedInUser);
  const [priceRanges, setPriceRanges] = useState({});

  const handleAppoint = () => {
    if (!user.userType) {
      toast.error(`Deber registrarte para reservar un turno`, {
        className: "toastError",
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
      });
      router.replace(`/auth`);
    } else {
      router.replace(`/explore/${params.id}/reservas`);
    }
  };

  useEffect(() => {
    if (params.id) {
      dispatch(getArtistDetail(params.id));
    }
    return () => dispatch(CleanArtist());
  }, [params.id]);

  useEffect(() => {
    if (artist.fullName) {
    }
    if (artist?.priceRanges?.length) {
      let obj = {};
      artist.priceRanges.map((priceRange) => {
        obj[priceRange.size] = {
          priceMin: priceRange.priceMin,
          priceMax: priceRange.priceMax,
        };
      });
      setPriceRanges({ ...obj });
    }
  }, [artist]);

  // if (loading) return <div className="text-center">Cargando...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">Error al cargar los datos</div>
    );
  if (!artist)
    return <div className="text-center">No se encontró el tatuador</div>;

  return (
    <div className="w-full bg-secondary-900">
      <Nav />

      <div className="flex flex-wrap items-center justify-center">
        <div className="w-[70%] flex flex-col rounded-2xl shadow-primary/50 shadow-lg">
          <div className=" bg-secondary-100/30 px-4 rounded-2xl">
            <div className="flex justify-between border-b-[1px] border-primary/30 py-4 mb-4">
              <div className="flex gap-x-4">
                <div className="w-[130px] h-[130px] rounded-full overflow-hidden">
                  <img
                    src={artist?.image}
                    alt={artist?.name}
                    className="w-[130px] h-[130px] object-cover rounded-full "
                  />
                </div>
                <div className="flex flex-1 flex-col gap-y-3 items-center ">
                  <h2 className="w-full items-center text-left text-2xl font-bold flex gap-x-2">
                    <p className=" text-artistfont text-[47px] font-newrocker text-left">
                      {" "}
                      {artist?.fullName}{" "}
                    </p>
                  </h2>
                  <h2 className="w-full font-bold flex gap-x-1 items-center text-left">
                    <CiShop className="text-primary text-[20px]" />{" "}
                    <p className=" text-artistfont/90 text-[20px]">
                      {artist?.shopName}
                    </p>
                  </h2>
                  <p className="mr-5 font-newrocker text-artistfont/60">
                    "{artist?.description}"
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center ">
                <button
                  onClick={handleAppoint}
                  className="border-[1px] border-primary text-primary hover:bg-primary hover:text-black font-bold py-2 px-4 rounded-lg text-[20px]"
                >
                  Reservar
                </button>
              </div>
            </div>

            <div className="flex p-4 rounded mt-4 mb-5">
              <div className="w-[50%] pr-4">
                <h3 className="text-[29px] font-rocksalt mb-4 text-artistfont">
                  Información:
                </h3>
                <div className="flex justify-center items-center mb-3">
                  <span className="text-[20px] w-[50%] flex items-center gap-x-1 text-artistfont">
                    <RiMailLine className="text-lg text-primary" />
                    Email:
                  </span>
                  <p className="text-artistfont w-[50%]"> {artist?.email}</p>
                </div>
                <div className="flex justify-center items-center mb-3">
                  <span className="text-[20px] w-[50%] flex items-center gap-x-1 text-artistfont">
                    {" "}
                    <RiPhoneLine className="text-lg text-primary" /> Teléfono:
                  </span>
                  <p className="text-artistfont w-[50%]">
                    {" "}
                    {artist?.phone != ""
                      ? artist?.phone
                      : "No agregó su número de Teléfono"}
                  </p>
                </div>
                <div className="flex justify-center items-center mb-3">
                  <span className="text-[20px] w-[50%] flex items-center gap-x-1 text-artistfont">
                    {" "}
                    <RiMapPinLine className="text-lg text-primary" /> Dirección:
                  </span>
                  <p className="text-artistfont  w-[50%]"> {artist?.address}</p>
                </div>
                <div className="flex justify-center items-center mb-3">
                  <span className="text-[20px] w-[50%] flex items-center gap-x-1 text-artistfont">
                    {" "}
                    <RiBuilding4Line className="text-lg text-primary" /> Ciudad:
                  </span>
                  <p className="text-artistfont w-[50%]"> {artist?.location}</p>
                </div>
                <div className="flex justify-center items-center mb-3">
                  <span className="text-[20px] w-[50%] flex gap-x-1 items-center text-artistfont">
                    <FaInstagram className="text-lg text-primary" />
                    Instagram:
                  </span>
                  <p className="text-artistfont w-[50%]">
                    {" "}
                    No agregó su cuenta de instagram
                  </p>
                </div>
              </div>

              <div className="border-l-[1px] border-primary/30 pl-8">
                <h3 className="text-[29px] font-rocksalt mb-5 text-artistfont">
                  Estilos de tatuaje:
                </h3>
                <div className="flex flex-wrap gap-4">
                  {artist?.tattooStyles?.map((style, index) => (
                    <label
                      key={index}
                      className="flex items-center text-artistfont/80 border-[1px] border-artistfont/80 rounded-lg p-2"
                    >
                      {style}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col items-center justify-center border-b-[1px] border-primary/30 pb-8">
              <h3 className="font-rocksalt text-[29px] w-full text-center mb-4 text-artistfont">
                Rango de precios:
              </h3>
              <div className="flex  gap-0">
                <div className="flex flex-col items-center  border-r-[1px] border-artistfont/30 w-[150px]">
                  <label className="text-md  font-newrocker w-full text-artistfont border-b-[1px] border-artistfont/30 text-center">
                    Pequeño
                  </label>
                  <span className="text-artistfont/80 pt-2">
                    $ {priceRanges.Pequeño?.priceMin} -{" "}
                    {priceRanges.Pequeño?.priceMax}
                  </span>
                </div>
                <div className="flex flex-col items-center  border-r-[1px] border-artistfont/30 w-[150px]">
                  <label className="text-md  font-newrocker w-full text-artistfont border-b-[1px] border-artistfont/30 text-center">
                    Pequeño a Color
                  </label>
                  <span className="text-artistfont/80 pt-2">
                    $ {priceRanges["Pequeño a color"]?.priceMin} -{" "}
                    {priceRanges["Pequeño a color"]?.priceMax}
                  </span>
                </div>
                <div className="flex flex-col items-center   border-r-[1px] border-artistfont/30 w-[150px]">
                  <label className="text-md  font-newrocker w-full text-artistfont border-b-[1px] border-artistfont/30 text-center">
                    Mediano
                  </label>
                  <span className="text-artistfont/80 pt-2">
                    $ {priceRanges.Mediano?.priceMin} -{" "}
                    {priceRanges.Mediano?.priceMax}
                  </span>
                </div>
                <div className="flex flex-col items-center  border-r-[1px] border-artistfont/30 w-[150px]">
                  <label className="text-md  font-newrocker w-full text-artistfont border-b-[1px] border-artistfont/30 text-center">
                    Mediano a Color
                  </label>
                  <span className="text-artistfont/80 pt-2">
                    $ {priceRanges["Mediano a color"]?.priceMin} -{" "}
                    {priceRanges["Mediano a color"]?.priceMax}
                  </span>
                </div>
                <div className="flex flex-col items-center  border-r-[1px] border-artistfont/30 w-[150px]">
                  <label className="text-md  font-newrocker w-full text-artistfont border-b-[1px] border-artistfont/30 text-center">
                    Grande
                  </label>
                  <span className="text-artistfont/80 pt-2">
                    $ {priceRanges.Grande?.priceMin} -{" "}
                    {priceRanges.Grande?.priceMax}
                  </span>
                </div>
                <div className="flex flex-col items-center w-[150px]">
                  <label className="text-md  font-newrocker w-full text-artistfont border-b-[1px] border-artistfont/30 text-center">
                    Grande a Color
                  </label>
                  <span className="text-artistfont/80 pt-2">
                    $ {priceRanges["Grande a color"]?.priceMin} -{" "}
                    {priceRanges["Grande a color"]?.priceMax}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex pt-8 mb-8">
              <div className="w-1/2  flex flex-col">
                <div className="p-4 rounded  flex-grow pr-4">
                  <h3 className="font-bold  font-rocksalt flex gap-2 text-[29px] mb-4">
                    Ubicación:
                  </h3>
                  {artist.location && artist.address && (
                    <div className="opacity-70 rounded-lg overflow-hidden h-[500px]">
                      <MapComponent
                        location={artist.location}
                        address={artist.address}
                        className="opacity-50 h-[500px]"
                      />
                    </div>
                  )}
                </div>
              </div>
              {artist.reviews ? (
                <div className="w-1/2 p-4">
                  <h3 className=" text-artistfont text-[29px] mb-4 font-rocksalt w-full text-center">
                    Reseñas:
                  </h3>
                  <div className="flex flex-col items-center justify-center h-[500px] overflow-hidden">
                    <div className="w-[70%] mb-4 relative">
                      <div className="absolute custom-gradient-reviews w-full h-full"></div>
                      {artist.reviews.map((review) => {
                        return (
                          <ReviewCard
                            key={review.appointmentId}
                            customerId={review.customerId}
                            comment={review.comment}
                            image={review?.image}
                            rating={review.rating}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <h1>
                  El artista todavía no tiene reseñas, saca un turno y se el
                  primero en dejar una!
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-4">
        <h3 className="text-xl font-bold mb-2 text-artistfont">
          PUBLICACIONES
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {artist?.publications?.map((publication, index) => (
            <div
              key={index}
              className=" bg-secondary-100 rounded-lg shadow-lg p-4"
            >
              <img
                src={publication.image}
                alt={`Publicación de ${artist?.fullName}`}
                className="w-full h-60 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <p className="text-md font-semibold text-artistfont">
                  {publication.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
