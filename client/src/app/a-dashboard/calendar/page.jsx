"use client";
import React, { useState } from "react";

const Page = () => {
  const initialTimeAvailability = {
    Lunes: { inicio: "10:00", fin: "19:00" },
    Martes: { inicio: "10:00", fin: "19:00" },
    Miercoles: { inicio: "10:00", fin: "19:00" },
    Jueves: { inicio: "10:00", fin: "19:00" },
    Viernes: { inicio: "10:00", fin: "19:00" },
    Sabado: { inicio: "10:00", fin: "19:00" },
    Domingo: { inicio: "10:00", fin: "19:00" },
  };

  const [timeAvailability, setTimeAvailability] = useState(
    initialTimeAvailability
  );
  const [timeException, setTimeException] = useState([]);
  const [newException, setNewException] = useState({
    fecha: "",
    inicio: "10:00",
    fin: "19:00",
  });

  const handleTimeChange = (day, timeType, value) => {
    setTimeAvailability({
      ...timeAvailability,
      [day]: { ...timeAvailability[day], [timeType]: value },
    });
  };

  const generateTimeOptions = () => {
    let options = [];
    for (let i = 10; i <= 19; i++) {
      let time = `${i}:00`;
      options.push(
        <option value={time} key={time}>
          {time}
        </option>
      );
    }
    return options;
  };

  const handleExceptionChange = (e) => {
    setNewException({ ...newException, [e.target.name]: e.target.value });
  };

  const addTimeException = () => {
    const updatedExceptions = [...timeException, newException];
    setTimeException(updatedExceptions);
    console.log("Nueva Excepción Añadida:", newException);
    console.log("Todas las Excepciones después de añadir:", updatedExceptions);
    setNewException({ fecha: "", inicio: "10:00", fin: "19:00" });
  };

  const handleSaveAvailability = () => {
    console.log(
      "Datos a enviar para Disponibilidad Horaria:",
      timeAvailability
    );
  };

  return (
    <div>
      <div>
        <h3>Disponibilidad Horaria</h3>
        {Object.entries(timeAvailability).map(([day, { inicio, fin }]) => (
          <div key={day}>
            <label>{day}: </label>
            <select
              value={inicio}
              onChange={(e) => handleTimeChange(day, "inicio", e.target.value)}
            >
              {generateTimeOptions()}
            </select>
            <select
              value={fin}
              onChange={(e) => handleTimeChange(day, "fin", e.target.value)}
            >
              {generateTimeOptions()}
            </select>
          </div>
        ))}
        <button onClick={handleSaveAvailability}>Guardar</button>
      </div>

      <div>
        <h3>Excepciones de Tiempo</h3>
        <input
          type="date"
          name="fecha"
          value={newException.fecha}
          onChange={handleExceptionChange}
        />
        <select
          name="inicio"
          value={newException.inicio}
          onChange={handleExceptionChange}
        >
          {generateTimeOptions()}
        </select>
        <select
          name="fin"
          value={newException.fin}
          onChange={handleExceptionChange}
        >
          {generateTimeOptions()}
        </select>
        <button onClick={addTimeException}>Añadir Excepción</button>

        {timeException.map((exception, index) => (
          <div key={index}>
            <p>
              Fecha: {exception.fecha}, Horario: {exception.inicio} -{" "}
              {exception.fin}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
