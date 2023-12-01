"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Page = () => {
  const initialTimeAvailability = {
    Lunes: { inicio: "06:00", fin: "23:00" },
    Martes: { inicio: "06:00", fin: "23:00" },
    Miercoles: { inicio: "06:00", fin: "23:00" },
    Jueves: { inicio: "06:00", fin: "23:00" },
    Viernes: { inicio: "06:00", fin: "23:00" },
    Sabado: { inicio: "06:00", fin: "23:00" },
    Domingo: { inicio: "06:00", fin: "23:00" },
  };

  const [timeAvailability, setTimeAvailability] = useState(
    initialTimeAvailability
  );
  const [timeException, setTimeException] = useState([]);
  const [newException, setNewException] = useState({
    fecha: "",
    inicio: "06:00",
    fin: "23:00",
  });

  const handleTimeChange = (day, timeType, value) => {
    setTimeAvailability({
      ...timeAvailability,
      [day]: { ...timeAvailability[day], [timeType]: value },
    });
  };

  const handleExceptionChange = (e) => {
    setNewException({ ...newException, [e.target.name]: e.target.value });
  };

  const generateTimeOptions = () => {
    let options = [];
    for (let i = 6; i <= 23; i++) {
      let time = `${i}:00`;
      options.push(
        <option value={time} key={time}>
          {time}
        </option>
      );
    }
    return options;
  };

  const handleSaveAvailability = async () => {
    const availabilityArray = Object.entries(timeAvailability).map(
      ([day, { inicio, fin }]) => {
        return {
          day,
          initialHour: inicio,
          finalHour: fin,
        };
      }
    );

    try {
      const response = await axios.post(
        "http://localhost:3001/time-availability",
        availabilityArray
      );
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const handleUpdateAvailability = async () => {
    const availabilityArray = Object.entries(timeAvailability).map(
      ([day, { inicio, fin }]) => {
        return {
          day,
          initialHour: inicio,
          finalHour: fin,
        };
      }
    );

    try {
      const response = await axios.put(
        "http://localhost:3001/timeAvailability",
        availabilityArray
      );
      console.log("Respuesta del servidor al actualizar:", response.data);
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
    }
  };

  const addTimeException = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/time-availability-exceptions",
        newException
      );
      console.log("Excepción Añadida:", response.data);
      setTimeException([...timeException, response.data]);
    } catch (error) {
      console.error("Error al añadir la excepción:", error);
    }
  };

  const deleteTimeException = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3001/timeAvailabilityExceptions/${id}`
      );
      console.log("Excepción Eliminada");
      setTimeException(
        timeException.filter((exception) => exception.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar la excepción:", error);
    }
  };

  useEffect(() => {
    const fetchTimeAvailability = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/time-availability"
        );
        const fetchedAvailability = {};
        response.data.forEach((item) => {
          fetchedAvailability[item.day] = {
            inicio: item.initialHour,
            fin: item.finalHour,
          };
        });
        setTimeAvailability(fetchedAvailability);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    const fetchTimeExceptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/timeAvailabilityExceptions"
        );
        setTimeException(response.data);
      } catch (error) {
        console.error("Error al obtener las excepciones:", error);
      }
    };

    fetchTimeAvailability();
    fetchTimeExceptions();
  }, []);

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
        <button onClick={handleUpdateAvailability}>Guardar Cambios</button>
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
            <button onClick={() => deleteTimeException(exception.id)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
