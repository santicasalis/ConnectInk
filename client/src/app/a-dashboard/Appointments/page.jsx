"use client";
import React, { useState } from "react";

import ArtistBookingCard from "../../../components/ArtistBookingCard/ArtistBookingCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserById } from "../../redux/features/user/userActions";

export default function Appointments() {
  const user = useSelector((state) => state.user.logedInUser);
  const fireBaseUser = useSelector((state) => state.user.fireBaseUser)
  const [appointment, setAppointment] = useState(user.appointments || []) ;
  const router = useRouter();
  const dispatch = useDispatch()
  const {isOpen,data} = useSelector((state) => state.modalDeleteAppointment);

  useEffect(() => {
    if (!user.userType) {
      router.replace("/auth");
    } else if (user.userType !== "artist") {
      router.replace("/");
    }
  }, []);

  useEffect(() => {
    dispatch(getUserById(fireBaseUser.tokenId))
  }, [isOpen]);

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
              />
            </div>
          ))
      ) : (
        <div className="flex flex-col items-center">
          {" "}
          <p className="text-center mt-8">
            No tienes ninguna reserva aún.
          </p>{" "}
          <br />{" "}
          <p className="text-center mr-5 ml-5">
            Recuerda ingresar el rango de precios para los diferentes tamaños de
            tatuajes y mantenerlo actualizado. Además, asegúrate de cargar tu
            disponibilidad horaria y cualquier fecha de excepción. Estos
            detalles son esenciales para que los clientes puedan programar sus
            turnos de manera más efectiva.{" "}
          </p>{" "}
        </div>
      )}
    </div>
  );
}
