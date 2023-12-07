'use client'

// Importaciones
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "@/components/nav/Nav";
import "./style.css"; 
import MapComponent from "@/components/map/Map"
import Link from "next/link";
import { CiShop } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getArtistDetail } from "@/app/redux/features/artists/artistActions";


export default function Page({ params }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch()
  const artist = useSelector((state) => state.artists.detail)

  useEffect(() => {
    if (params.id) {
      setLoading(true);
      dispatch(getArtistDetail(params.id))
    }
  }, [params.id]);

  useEffect(() => {
    if(artist.fullName){
      setLoading(false)
    }
  }, [artist])

  if (loading) return <div className="text-center">Cargando...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">Error al cargar los datos</div>
    );
  if (!artist)
    return <div className="text-center">No se encontró el tatuador</div>;

    console.log(artist)

  return (
    <div className="container mx-auto p-4">
      <Nav />

      <div className="text-center text-white bg-secondary-900 text-6xl font-bold p-10 font-rocksalt m-4 rounded">
        Artista
      </div>

      <div className="flex flex-wrap ">
        <div className="w-full md:w-1/2 p-4 flex flex-col ">
          <div className="p-4 rounded bg-secondary-900   flex-grow">
            <img
              src={artist?.image}
              alt={artist?.name}
              className="w-48 h-48 object-cover rounded-full mx-auto"
            />
            <h2 className="items-center justify-center text-2xl font-bold mt-4 flex gap-2">
            <VscAccount className="text-primary" /> {artist?.fullName}
            </h2>
            <div className="mt-[10px]">
              <h2 className="text-2xl font-bold flex gap-2">
              <CiShop className="text-primary" /> <p>{artist?.shopName}</p>
              </h2>
              <Link href={`/explore/${params.id}/reservas`}>
                <button className="mt-[20px] ml-[50px] border-[1px] border-primary/75 text-primary/75 hover:border-primary hover:text-primary font-bold py-2 px-4 rounded">
                  Reservar
                </button>
              </Link>
            </div>
            
          </div>

          
        </div>

        <div className="w-full md:w-1/2 p-4 flex flex-col">
          <div className="p-4 rounded  bg-secondary-900 flex-grow">
            <h3 className="text-xl font-bold  font-rocksalt flex gap-2 mb-4"> <FaMapLocationDot className="text-primary" /> Ubicacion</h3>
            <MapComponent location={artist?.location} address={artist?.address} />
          </div>

          <div className="flex flex-wrap justify-around p-4 rounded mt-4  bg-secondary-900">
            <div>
              <h3 className="text-xl font-bold mb-2 font-rocksalt">Estilos de tatuaje</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {artist?.tattooStyles?.map((style, index) => (
                  <p key={index} className="flex items-center">
                    {style}
                  </p>
                ))}
              </div>
            </div>

            <div className="p-4 ">
              <h3 className="text-xl  font-rocksalt mb-2">Contacto</h3>
              <p> {artist?.fullName}</p>
              <p>{artist?.email}</p>
              <p>{artist?.phone}</p>
              <p>{artist?.address}</p>
              <p>{artist?.location}</p>
              <p className="mb-1"><FaInstagram className="text-xl"/></p>
            </div>

            <div className="p-4 rounded ">
              <div className="flex flex-col items-center">
                <label className="text-md  font-rocksalt">Pequeñoo</label>
                <span className="text-gray-600">$</span>
              </div>
              <div className="flex flex-col items-center mt-2">
                <label className="text-md  font-rocksalt">Medianoo</label>
                <span className="text-gray-600">$$</span>
              </div>
              <div className="flex flex-col items-center mt-2">
                <label className="text-md  font-rocksalt">Grandee</label>
                <span className="text-gray-600">$$$</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-4">
        <h3 className="text-xl font-bold mb-2">PUBLICACIONES</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {artist?.publications?.map((publication, index) => (
            <div
              key={index}
              className="border-[5px] border-secondary-900/50 bg-secondary-900 rounded-lg shadow-lg p-4"
            >
              <img
                src={publication.image}
                alt={`Publicación de ${artist?.fullName}`}
                className="w-full h-60 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <p className="text-md font-semibold">
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