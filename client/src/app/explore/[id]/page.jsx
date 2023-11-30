'use client'

// Importaciones
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "@/components/nav/Nav";
import "./style.css"; 
import MapComponent from "@/components/map/Map"


export default function Page({ params }) {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (params.id) {
      setLoading(true);
      axios
        .get(`http://localhost:3001/tattooArtists/${params.id}`)
        .then((response) => {
          setArtist(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener los datos del tatuador", error);
          setError(error);
          setLoading(false);
        });
    }
  }, [params.id]);

  if (loading) return <div className="text-center">Cargando...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">Error al cargar los datos</div>
    );
  if (!artist)
    return <div className="text-center">No se encontró el tatuador</div>;

  return (
    <div className="container mx-auto p-4">
      <Nav />

      <div className="text-center text-white bg-black text-6xl font-bold p-10">
        Artista
      </div>

      <div className="flex flex-wrap ">
        <div className="w-full md:w-1/2 p-4 flex flex-col">
          <div className="p-4 rounded border-2 border-primary boxShadow  flex-grow">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-48 h-48 object-cover rounded-full mx-auto"
            />
            <h2 className="text-center text-2xl font-bold mt-4">
              {artist.name}
            </h2>
            <div className="flex flex-wrap justify-around">
              <h2 className="text-2xl font-bold">
                Tienda: <p>{artist.shopName}</p>
              </h2>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Reservar
              </button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-4 flex flex-col">
          <div className="p-4 rounded border-2 border-primary boxShadow flex-grow">
            <h3 className="text-xl font-bold mb-2">Direccion</h3>
            <MapComponent location={artist.location} address={artist.address} />
          </div>

          <div className="flex flex-wrap justify-around p-4 rounded mt-4 border-2 border-primary boxShadow">
            <div>
              <h3 className="text-xl font-bold mb-2">Estilos de tatuaje</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {artist.tattooStyles.map((style, index) => (
                  <p key={index} className="flex items-center">
                    {style}
                  </p>
                ))}
              </div>
            </div>

            <div className="p-4 ">
              <h3 className="text-xl font-bold mb-2">Contacto</h3>
              <p> {artist.fullName}</p>
              <p>{artist.email}</p>
              <p>{artist.phone}</p>
              <p>{artist.address}</p>
              <p>{artist.location}</p>
              <p className="mb-1">Logo Instagram</p>
            </div>

            <div className="p-4 rounded ">
              <div className="flex flex-col items-center">
                <label className="text-md font-semibold">Pequeñoo</label>
                <span className="text-gray-600">$</span>
              </div>
              <div className="flex flex-col items-center mt-2">
                <label className="text-md font-semibold">Medianoo</label>
                <span className="text-gray-600">$$</span>
              </div>
              <div className="flex flex-col items-center mt-2">
                <label className="text-md font-semibold">Grandee</label>
                <span className="text-gray-600">$$$</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-4">
        <h3 className="text-xl font-bold mb-2">PUBLICACIONES</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {artist.publications.map((publication, index) => (
            <div
              key={index}
              className="polaroidStyle bg-white rounded-lg shadow-lg p-4"
            >
              <img
                src={publication.image}
                alt={`Publicación de ${artist.name}`}
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