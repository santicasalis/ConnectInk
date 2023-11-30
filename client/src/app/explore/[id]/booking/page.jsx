"use client";

import { useState } from "react";

//HOOKS DEL CALENDARIO
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import axios from "axios";

const URL_BASE = "http://localhost:3001";

const bookAppointment = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

  const [horariosDisponibles, setHorariosDisponibles] = useState([]);

  const actualizarFecha = (fecha) => {
    const date = fecha._d;
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getYear() + 1900);
    setFechaSeleccionada(fecha);
    setHorarioSeleccionado(null);
    cargarHorariosDisponibles(date);
  };

  const cargarHorariosDisponibles = async (date) => {
    try {
      const response = await axios.get(
        `${URL_BASE}/timeAvailabilities/${date.toISOString()}`
      );
      setHorariosDisponibles(response.data);
    } catch (error) {
      console.error("Error al cargar horarios disponibles:", error);
      setHorariosDisponibles([]);
    }
  };

  const reservarTurno = async () => {
    const date = new Date(year, month, day, horarioSeleccionado);

    const response = await axios.post(`${URL_BASE}/appointments`, {
      dateAndTime: date,
    });
    console.log(response);
  };

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
        <ul>
          {horariosDisponibles.map((horario, index) => (
            <li key={index} onClick={() => setHorarioSeleccionado(horario)}>
              {horario}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="bg-primary text-white font-bold py-2 px-4 rounded mt-4"
        >
          Reservar
        </button>
      </div>
      <button onClick={reservarTurno}>Reservar turno</button>
    </div>
  );
};

export default bookAppointment;
