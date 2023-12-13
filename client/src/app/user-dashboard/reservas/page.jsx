"use client";
import React from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import BookingCard from "../../../components/bookingCard/BookingCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ModalDeleteAppointment from "../../../components/modal/ModalDeleteAppointment.jsx";
import { getAllAppointments } from "../../redux/features/user/userActions";
import Link from "next/link";
import AdminCard from "../../../components/adminCard/AdminCard";
import { getAllArtists } from "../../redux/features/artists/artistActions";
import Card from "../../../components/card/Card";

export default function Reservas() {
  const user = useSelector((state) => state.user.logedInUser);
  const artist = useSelector((state) => state.artists.people.slice(0, 3));

  const appointment = user.appointments;
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!user.userType) {
      router.replace("/auth");
    } else if (user.userType !== "customer") {
      router.replace("/");
    }
  }, []);
  useEffect(() => {
    dispatch(getAllArtists());
  }, []);
  const isOpenModalDeleteAppointment = useSelector(
    (state) => state.ModalDeleteAppointment?.isOpen
  );

  useEffect(() => {
    dispatch(getAllAppointments(user.id));
  }, [isOpenModalDeleteAppointment]);

  return (
    <div className="">
      <h1 className=" text-center font-rocksalt text-artistfont text-[28px]">
        {" "}
        Mis turnos
      </h1>
      {appointment && appointment.length > 0 ? (
        [...user.appointments]
          .sort((a, b) => new Date(a.dateAndTime) - new Date(b.dateAndTime))
          .map(
            (tur) =>
              tur.paymentStatus && (
                <div key={tur.id} className="mt-[50px]">
                  <BookingCard
                    id={tur.id}
                    bodyPlace={tur.bodyPlace}
                    description={tur.description}
                    duration={tur.duration}
                    image={tur.image}
                    size={tur.size}
                    dateAndTime={tur.dateAndTime}
                    depositPrice={tur.depositPrice}
                    tattooArtistId={tur.tattooArtistId}
                    paymentStatus={tur.paymentStatus}
                  />
                </div>
              )
          )
      ) : (
        <div className="flex flex-col items-center">
          {" "}
          <p className="text-artistfont mt-8">
            No tienes ninguna reserva aún. ¡Descubre increíbles artistas y sus
            últimas obras!
          </p>{" "}
          <br />{" "}
          <p className="text-artistfont mr-5 ml-5 mb-5">
            Si te gusta el trabajo de alguno de ellos, puedes acceder a su
            perfil y reservar un turno para hacer realidad ese tatuaje que tanto
            deseas.{" "}
          </p>{" "}
          <div className="scroll-fade flex justify-center items-center">
            <div>
              {artist?.map((filter) => (
                <div
                  key={filter.id}
                  className="mb-4 w-full flex justify-center items-center   "
                >
                  <Card
                    id={filter.id}
                    fullName={filter.fullName}
                    location={filter.location}
                    shopName={filter.shopName}
                    publications={filter.publications}
                    image={filter.image}
                    reviews={filter.reviews}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
