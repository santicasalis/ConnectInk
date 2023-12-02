"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserId } from "@/app/redux/features/user/userActions";
import axios from "axios";

const Page = () => {
  const user = useSelector((state) => state.user);
  console.log(user);

  const initialTimeAvailability = {
    Lunes: {id:"", inicio: "06:00", fin: "23:00" },
    Martes: {id:"", inicio: "06:00", fin: "23:00" },
    Miércoles: {id:"", inicio: "06:00", fin: "23:00" },
    Jueves: {id:"", inicio: "06:00", fin: "23:00" },
    Viernes: {id:"", inicio: "06:00", fin: "23:00" },
    Sábado: {id:"", inicio: "06:00", fin: "23:00" },
    Domingo: {id:"", inicio: "06:00", fin: "23:00" },
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
  const [timeAvailability, setTimeAvailability] = useState(
    initialTimeAvailability
  );
  const [timeException, setTimeException] = useState([]);
  const [newException, setNewException] = useState({
    date: "",
    initialHour: "06:00",
    finalHour: "23:00",
  });


const handleTimeChange = (day, timeType, value) => {
  setTimeAvailability((prevState) => ({
    ...prevState,
    [day]: {
      ...prevState[day],
      [timeType]: value,
    },
  }));
};



const saveTimeAvailability = async () => {
  try {
   
    for (const [day, times] of Object.entries(timeAvailability)) {
      const data = {
        
        tattooArtistId: user.id,
        day,
        initialHour: times.inicio,
        finalHour: times.fin,
      };

      const response = await axios.post(
        "http://localhost:3001/timeAvailabilities",
        data
      );
      console.log(`Horario Guardado para ${day}:`, response);
    }
  } catch (error) {
    console.error("Error al guardar el horario:", error);
  }
};


const updateTimeAvailability = async () => {
  try {
    
    const timeAvailabilityArray = Object.entries(timeAvailability).map(
      ([day, times]) => ({
        
        tattooArtistId: user.id,
        day,
        initialHour: times.inicio,
        finalHour: times.fin,
      })
    );

    
    for (const availability of timeAvailabilityArray) {
      const response = await axios.put(
        "http://localhost:3001/timeAvailabilities/",
        availability
      );
      console.log(`Horario Actualizado para ${response.config.data}:`);
    }
  } catch (error) {
    console.error("Error al actualizar el horario:", error);
  }
};

  const handleExceptionChange = (e) => {
    setNewException({ ...newException, [e.target.name]: e.target.value });
    console.log("Nueva excepción:", newException);
    setNewException(newException);
  };

  const addTimeException = async () => {
    const formattedException = {
      tattooArtistId: user.id, 
      date: newException.date,
      initialHour: newException.initialHour,
      finalHour: newException.finalHour,
    };

    console.log("Añadiendo excepción de tiempo:", formattedException);

    try {
      const response = await axios.post(
        "http://localhost:3001/timeAvailabilityExceptions",
        formattedException
      );

      console.log("Excepción Añadida:", response.data);
      setTimeException([...timeException, response.data]);
    } catch (error) {
      console.error("Error al añadir la excepción:", error);
    }
  };

  const deleteTimeException = async () => {
    console.log("Eliminando excepcion con ID:", );

    try {
      await axios.delete(
        `http://localhost:3001/timeAvailabilityExceptions/`
      );
      console.log("Excepcion Eliminada");
      setTimeException(
        timeException.filter((exception) => exception.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar la excepcion:", error);
    }
  };

  return (
    <div>
      <div>
        <h3>Disponibilidad de Tiempo</h3>
        {Object.entries(timeAvailability).map(([day, times]) => (
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
        <button onClick={saveTimeAvailability}>Guardar Horarios</button>
        <button onClick={updateTimeAvailability}>Actualizar Horarios</button>
      </div>

      <div>
        <h3>Excepciones de Tiempo</h3>
        <input
          type="date"
          name="date"
          value={newException.date}
          onChange={handleExceptionChange}
        />
        <select
          name="initialHour"
          value={newException.initialHour}
          onChange={handleExceptionChange}
        >
          {generateTimeOptions()}
        </select>
        <select
          name="finalHour"
          value={newException.finalHour}
          onChange={handleExceptionChange}
        >
          {generateTimeOptions()}
        </select>
        <button onClick={addTimeException}>Añadir Excepcion</button>

        {timeException.map((exception, index) => (
          <div key={index}>
            <p>
              Fecha: {exception.date}, Horario: {exception.initialHour} -{" "}
              {exception.finalHour}
            </p>
            <button onClick={() => deleteTimeException(exception.id)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
