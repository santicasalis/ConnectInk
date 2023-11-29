'use client'

import { useState } from "react";

//HOOKS DEL CALENDARIO
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import axios from "axios"

const URL_BASE = "http://localhost:3001"


const bookAppointment = () => {
  //hardcodeo horarios
  const horarios = {
    turno1: "13",
    turno2: "15",
    turno3: "17",
    turno4: "19",
    turno5: "21",
  };




  const [horarioNoDisponible, setHorarioNoDisponible] = useState(null);
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")

  const actualizarFecha = (fecha) => {
    const date = fecha._d
    setDay(date.getDate())
    setMonth(date.getMonth())
    setYear(date.getYear() + 1900)
    setFechaSeleccionada(fecha);
    setHorarioSeleccionado(null);
    //seleccionar un horario al azar como no disponible
    const keys = Object.keys(horarios);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    setHorarioNoDisponible(horarios[randomKey]);
  };

  const seleccionarHorario = (horario) => {
    if (horario === horarioNoDisponible) {
      //seleccionar un horario no disponible
      alert("Este horario no está disponible");
      return;
    }
    setHorarioSeleccionado(horario);
  };



  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

  //DESCOMENTAR CUANDO YA TENGAMOS LA CONEXION CON LA DB
  // const actualizarFecha = (fecha) => {
  //   setFechaSeleccionada(fecha);
  //   setHorarioSeleccionado(null);
  // };

  // const seleccionarHorario = (horario) => {
  //   setHorarioSeleccionado(horario);
  // };

  const reservarTurno = async() => {
    const date = new Date(year, month, day, horarioSeleccionado)

    const response = await axios.post(`${URL_BASE}/appointments`, {dateAndTime: date})
    console.log(response)

  }

  return (
    <div className="w-full md:w-2/3 p-4 shadow-lg">
      <div className="p-4 rounded border-primary border-[2px] shadow-lg">
        <h3 className="text-xl font-bold mb-2">Reserve su turno</h3>
        <Datetime
          value={fechaSeleccionada}
          onChange={actualizarFecha}
          timeFormat={false}
          open={true}
          input={false}
        />
        <button
          type="button"
          className="bg-primary text-white font-bold py-2 px-4 rounded mt-4"
        >
          Reservar
        </button>

        {/* Horarios disponibles después de seleccionar una fecha. Esta logica va a tener que revisarse cuando tengamos ya la conexion con la DB */}
        {fechaSeleccionada && (
          <div className="mt-4">
            <h4 className="text-lg font-bold mb-2">Horarios Disponibles</h4>
            {Object.values(horarios).map((horario, index) => (
              <button
                key={index}
                className={`block mb-2 px-4 py-2 rounded ${
                  horario === horarioSeleccionado
                    ? "bg-blue-500 text-white"
                    : horario === horarioNoDisponible
                    ? "bg-red-500 text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => seleccionarHorario(horario)}
              >
                {`${horario}hs`}
              </button>
            ))}
          </div>
        )}
      </div>
      <button onClick={reservarTurno}>Reservar turno</button>
    </div>
  );
}

export default bookAppointment