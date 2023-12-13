"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineCreditCardOff } from "react-icons/md";
import Link from "next/link";
import axios from "axios";

export default function Reservas({ params }) {
  const { id } = params;
  const [customer, setCustomer] = useState({});
  const [appointment, setAppointment] = useState({});
  const [tattooArtist, setTattooArtist] = useState({});
  const urlBase = "http://localhost:3001";

  const getData = async () => {
    const appointmentResult = (await axios(`${urlBase}/appointments/${id}`))
      .data;
    setAppointment(appointmentResult);
    setCustomer(
      (
        await axios(
          `${urlBase}/customers/${appointmentResult.Customer_Appointment}`
        )
      ).data
    );
    setTattooArtist(
      (
        await axios(
          `${urlBase}/tattooArtists/${appointmentResult.TattooArtist_Appointment}`
        )
      ).data
    );
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (tattooArtist.id) {
      const year = new Date(appointment.dateAndTime).getFullYear();
      const month = new Date(appointment.dateAndTime).getMonth() + 1;
      const day = new Date(appointment.dateAndTime).getDate();
      const hour = new Date(appointment.dateAndTime).getHours();

      const dateData = `${day}/${month}/${year} a las ${hour} horas`;
      const data = {
        dateData,
        customerName: customer.fullName,
        customerEmail: customer.email,
        artistName: tattooArtist.fullName,
        artistEmail: tattooArtist.email,
      };

      if (
        appointment.paymentStatus == "rejected" ||
        !appointment.paymentStatus
      ) {
        axios.post(`${urlBase}/nodemailer/rejectDate`, data);
      } else if (
        appointment.paymentStatus == "approved" ||
        appointment.paymentStatus == "in_process"
      ) {
        axios.post(`${urlBase}/nodemailer/confirmDate`, data);
      }
    }
  }, [tattooArtist]);

  return (
    <div className="bg-secondary-900 h-[300px] rounded w-[40%] shadow-primary shadow-lg">
      <div className="flex item-center justify-center w-full">
        <h1 className="text-artistfont text-4l font-rocksalt m-3 p-4">
          RESULTADO DE LA TRANSACCIÓN
        </h1>
      </div>

      {appointment.id &&
      (appointment.paymentStatus == "rejected" ||
        !appointment.paymentStatus) ? (
        <div>
          <p className="text-center mt-6 text-[14px] text-artistfont mb-10 p-5">
            La transacción no pudo ser procesada. Por favor, vuelve a reservar
            el turno e intenta con otro método de pago.
          </p>
          <div className="flex items-center justify-center w-[50%] mx-auto">
            <Link href="/user-dashboard">
              <button className="border-[1px] border-primary text-primary hover:bg-primary hover:text-black font-bold py-2 px-4 rounded-lg text-[20px] ">
                Volver al inicio
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-center mt-6 text-[14px] text-artistfont mb-10 p-5">
            La transacción fue realizada con éxito y la reserva del turno se ha
            registrado.
          </p>
          <div className="flex items-center justify-center w-[50%] mx-auto">
            <Link href="/user-dashboard/reservas">
              <button className="border-[1px] border-primary text-primary hover:bg-primary hover:text-black font-bold py-2 px-4 rounded-lg text-[20px]">
                Ver mis turnos{" "}
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
