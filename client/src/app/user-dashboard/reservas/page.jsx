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

export default function Reservas() {
  const user = useSelector((state) => state.user.logedInUser);
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

  const isOpenModalDeleteAppointment = useSelector(
    (state) => state.ModalDeleteAppointment?.isOpen
  );

  useEffect(() => {
    dispatch(getAllAppointments(user.id));
  }, [isOpenModalDeleteAppointment]);

  return (
    <div className="">
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
        <p className="text-artistfont">No tienes ninguna reserva aún.</p>
      )}
    </div>
  );
}
