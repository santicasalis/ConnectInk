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
    <div className="">
      <h1 className=" text-center font-rocksalt text-artistfont text-[28px]">
        {" "}
        Mis turnos
      </h1>
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
                paymentStatus={tur.paymentStatus}
              />
            </div>
          ))
      ) : (
        <div className="flex flex-col items-center">
          {" "}
          <p className="text-center mt-[120px] font-rocksalt text-3xl text-artist/75">
            No tienes ninguna reserva aún.
          </p>{" "}
          <br />{" "}
          <p className=" mt-[100px] text-lg">
            <ul className="list-disc ml-[80px] ">
               <li>
                  Recuerda ingresar el rango de precios para los diferentes tamaños de tatuajes y mantenerlo actualizado. 
                </li>
                <li>
                  Asegúrate de cargar tu disponibilidad horaria y cualquier fecha de excepción. 
                </li>
            </ul>
            <p className="text-2xl font-bold mt-12 text text-center">
            Estos detalles son esenciales para que los clientes puedan programar sus turnos de manera más efectiva.{" "}
            </p>
          </p>{" "}
          
        </div>
      )}
    </div>
  );
}
