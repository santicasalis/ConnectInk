"use client";

import { useEffect, useState } from "react";

import React from "react";
import Nav from "@/components/nav/Nav";
import axios from "axios";

export default function Page({ params }) {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const URL_BASE = "http://localhost:3001";

  useEffect(() => {
    if (params.id) {
      setLoading(true);
      axios
        .get(`${URL_BASE}/tattooArtists/${params.id}`)
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

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los datos</div>;
  if (!artist) return <div>No se encontró el tatuador</div>;

  return (
    <div className="bg-secondary-100 shadow-lg">
      <Nav />

      <div className="bg-black text-white text-center text-6xl font-bold p-10 h-29 shadow-lg">
        Artista
      </div>

      <div className="flex flex-wrap md:flex-nowrap shadow-lg">
        <div className=" md:w-1/3 p-4 shadow-lg">
          <div className="p-4 rounded border-primary border-[2px] shadow-lg">
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
              

              <button>Reservar</button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3 p-4 shadow-lg">
          <div className="p-4 rounded border-primary border-[2px] shadow-lg">
            <h3 className="text-xl font-bold mb-2">Tattoo Styles</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {artist.tattooStyles.map((style, index) => (
                <p key={index} className="flex items-center">
                  {style}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-around  p-4 rounded mt-4 border-primary border-[2px] shadow-lg">
            <div className=" p-4 border-primary border-[2px]">
              <h3 className="text-xl font-bold mb-2  ">Contacto</h3>
              <p>FullName: {artist.name}</p>
              <p>Email: {artist.email}</p>
              <p>Mobile: {artist.phone}</p>
              <p>Address: {artist.address}</p>
              <p>City: {artist.location}</p>
            </div>

            <div className="border-primary border-[2px] p-4">
              <p>Instagram</p>
              <p>Facebook</p>
              <p>Medium</p>
              <p>Twitter</p>
            </div>

            <div className=" p-4 rounded border-primary border-[2px] shadow-lg">
              <div className="flex flex-col items-center">
                <label className="text-md font-semibold">Small Tattoo</label>
                <span className="text-gray-600">$</span>
              </div>
              <div className="flex flex-col items-center mt-2">
                <label className="text-md font-semibold">Medium Tattoo</label>
                <span className="text-gray-600">$$</span>
              </div>
              <div className="flex flex-col items-center mt-2">
                <label className="text-md font-semibold">Large Tattoo</label>
                <span className="text-gray-600">$$$</span>
              </div>
            </div>
          </div>

          <div className="border-primary border-[2px] p-4">
            <h3>PUBLICACIONES</h3>
            <div className="flex flex-wrap justify-around gap-4">
              {artist.publications.map((publication, index) => (
                <div
                  key={index}
                  className="card bg-white rounded-lg shadow-lg p-4 w-full md:w-1/2 lg:w-1/3"
                >
                  <img
                    src={publication.image}
                    alt={`Publicación de ${artist.name}`}
                    className="w-full h-48 object-cover rounded-t-lg"
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
      </div>
    </div>
  );
}
