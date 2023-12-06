"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Appointments() {
  const user = useSelector((state) => state.user.logedInUser);

  // console.log(user);
  // console.log(user.appointments);
  // console.log(user.appointments[0].artist);
  // console.log(user.appointments[0].data);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      {user.appointments.map((appointment, index) => {
        const [showExtraDetails, setShowExtraDetails] = useState(false);

        return (
          <div key={index} className="card mb-4 p-4 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-2">
              Tatuador: {appointment.artist}
            </h3>
            <p className="mb-1">
              Fecha y Hora: {formatDate(appointment.data.dateAndTime)}
            </p>
            <p className="mb-3">Descripción: {appointment.data.description}</p>
            <button
              onClick={() => setShowExtraDetails(!showExtraDetails)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {showExtraDetails ? "Ocultar Detalles" : "Mostrar Detalles"}
            </button>
            {showExtraDetails && (
              <div className="extra-details mt-3">
                <p>Precio del depósito: {appointment.data.depositPrice}</p>
                <p>Duración: {appointment.data.duration} hora(s)</p>
                <img
                  src={appointment.data.image}
                  alt="Imagen del tatuaje"
                  className="max-w-xs max-h-xs w-auto h-auto mt-3"
                />
                <p>Tamaño: {appointment.data.size}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
