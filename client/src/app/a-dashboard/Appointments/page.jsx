"use client";
import React from "react";

import ArtistBookingCard from "../../../components/ArtistBookingCard/ArtistBookingCard";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Appointments() {
  const user = useSelector((state) => state.user.logedInUser);
  const appointment = user.appointments;
  const router = useRouter();

  useEffect(() => {
    if (!user.userType) {
      router.replace("/auth");
    } else if (user.userType !== "artist") {
      router.replace("/");
    }
  }, []);

  useEffect(() => {}, [user]);

  console.log(user, "holaaa");

  return (
    <div className=" bg-secondary-900 w-full shadow-artist/50 shadow-lg">
      <div className=" w-full px-10 mb-10">
        <h1 className="text-4xl font-rocksalt w-full py-10 text-left border-transparent border-b-artist/30 border-[1px]"> Mis turnos</h1>
      </div>
      {appointment && appointment.length > 0 ? (
        [...user.appointments]
          .sort((a, b) => new Date(a.dateAndTime) - new Date(b.dateAndTime))
          .map((tur) => (
            <div className="mt-[50px]">
              <ArtistBookingCard
                id={tur.id}
                bodyPlace={tur.bodyPlace}
                description={tur.description}
                duration={tur.duration}
                image={tur.image}
                size={tur.size}
                dateAndTime={tur.dateAndTime}
                depositPrice={tur.depositPrice}
                CustomerId={tur.CustomerId}
              />
            </div>
          ))
      ) : (
        <div className="flex flex-col items-center">
          <h5 className="text-artistfont font-newrocker text-[25px] mb-8 ">
              "No tienes ninguna reserva aún."
          </h5>
          <div className="w-1/2 flex mb-10 flex-col py-8 px-10 text-[17px] text-artistfont items-center justify-center bg-secondary-100/40 shadow-inner shadow-artist/10 rounded-xl">
              
              <ul className="list-disc mb-6 ">
                <li>
                  Recuerda ingresar el rango de precios para los diferentes tamaños de
                  tatuajes y mantenerlo actualizado.
                </li>
                <li>
                  Asegúrate de cargar tu
                  disponibilidad horaria y cualquier fecha de excepción.
                </li>
              </ul>
              Estos
                detalles son esenciales para que los clientes puedan programar sus
                turnos de manera más efectiva.
              
          </div>
          <br />
        </div>
      )}
    </div>
  );
}
