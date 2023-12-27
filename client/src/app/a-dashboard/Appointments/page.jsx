"use client";
import React, { useState } from "react";

import ArtistBookingCard from "../../../components/ArtistBookingCard/ArtistBookingCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserById } from "../../redux/features/user/userActions";

export default function Appointments() {
  const user = useSelector((state) => state.user.logedInUser);
  const fireBaseUser = useSelector((state) => state.user.fireBaseUser);
  const [appointment, setAppointment] = useState(user.appointments || []);
  const router = useRouter();
  const dispatch = useDispatch();
  const { isOpen, data } = useSelector((state) => state.modalDeleteAppointment);

  useEffect(() => {
    if (!user.userType) {
      router.replace("/auth");
    } else if (user.userType !== "artist") {
      router.replace("/");
    }
  }, []);

  useEffect(() => {
    dispatch(getUserById(fireBaseUser.tokenId));
  }, [isOpen]);

  return (
    <div className=" bg-secondary-900 w-full rounded-xl shadow-artist/50 shadow-lg">
      <div className="w-full p-7">
        <h1 className="text-4xl text-artistfont font-rocksalt mb-8">
          {" "}
          Mis turnos
        </h1>
        <hr className="border-artist/20 border-[1px]" />

        {appointment &&
          appointment.length > 0 &&
          user?.appointments &&
          user?.appointments.some(
            (tur) =>
              new Date(tur.dateAndTime) >= new Date() &&
              tur.paymentStatus != "rejected"
          ) && (
            <>
              <h4 className="text-artistfont text-center text-xl m-6 font-rocksalt">
                Próximos turnos
              </h4>
              {user?.appointments
                .filter((tur) => new Date(tur.dateAndTime) >= new Date())
                .sort(
                  (a, b) => new Date(a.dateAndTime) - new Date(b.dateAndTime)
                )
                .map((tur) => (
                  <div className="h-full flex items-center justify-center text-[#FDECDA] mt-3">
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
                ))}
            </>
          )}

        {appointment &&
          appointment.length > 0 &&
          user?.appointments &&
          user?.appointments.some(
            (tur) =>
              new Date(tur.dateAndTime) < new Date() &&
              tur.paymentStatus != "rejected"
          ) && (
            <>
              <h4 className="text-artistfont text-center text-xl m-6 font-rocksalt">
                Turnos pasados
              </h4>
              {user?.appointments
                .filter((tur) => new Date(tur.dateAndTime) < new Date())
                .sort(
                  (a, b) => new Date(b.dateAndTime) - new Date(a.dateAndTime)
                )
                .map((tur) => (
                  <div className="h-full flex items-center justify-center text-[#FDECDA] mt-3">
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
                ))}
            </>
          )}

        {appointment && appointment.length === 0 && (
          <div className="flex flex-col items-center">
            <h5 className="text-artistfont font-newrocker text-[25px] mt-5 mb-5">
              No tienes ninguna reserva aún.
            </h5>
            <ul className="list-disc mb-6 ">
              <li>
                Recuerda ingresar el rango de precios para los diferentes
                tamaños de tatuajes y mantenerlo actualizado.
              </li>
              <li>
                Asegúrate de cargar tu disponibilidad horaria y cualquier fecha
                de excepción.
              </li>
            </ul>
            Estos detalles son esenciales para que los clientes puedan programar
            sus turnos de manera más efectiva.
            <br />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className=" bg-secondary-900 w-full rounded-xl shadow-artist/50 shadow-lg">
      <div className="w-full p-7">
        <h1 className="text-4xl text-artistfont font-rocksalt mb-8">
          {" "}
          Mis turnos
        </h1>
        <hr className="border-artist/20 border-[1px]" />
        <h4 className="text-center text-xl m-6 font-rocksalt">
          Próximos turnos
        </h4>
        {appointment && appointment.length > 0 ? (
          [...user?.appointments]
            .sort((a, b) => new Date(a.dateAndTime) - new Date(b.dateAndTime))
            .map((tur) => (
              <div className="h-full flex items-center justify-center text-[#FDECDA]">
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
            <h5 className="text-artistfont font-newrocker text-[25px] mt-5 mb-5">
              No tienes ninguna reserva aún.
            </h5>
            <ul className="list-disc mb-6 ">
              <li>
                Recuerda ingresar el rango de precios para los diferentes
                tamaños de tatuajes y mantenerlo actualizado.
              </li>
              <li>
                Asegúrate de cargar tu disponibilidad horaria y cualquier fecha
                de excepción.
              </li>
            </ul>
            Estos detalles son esenciales para que los clientes puedan programar
            sus turnos de manera más efectiva.
            <br />
          </div>
        )}
      </div>
    </div>
  );
}
