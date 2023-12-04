"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserId } from "@/app/redux/features/user/userActions";
import axios from "axios";
import {
  getTimeAvailabilities,
  updateArtistTimeAvailability,
} from "@/app/redux/features/artists/artistActions";

const Page = () => {

  const user = useSelector((state) => state.user);

  const timeAvailabilities = useSelector(
    (state) => state.artists.timeAvailabilities[user.logedInUser.id] || []
  );

  const [timeAvailability, setTimeAvailability] = useState([]);

  const dispatch = useDispatch();

  const initialTimeAvailability = [
    { day: "Lunes", inicio: "06:00", fin: "23:00" },
    { day: "Martes", inicio: "06:00", fin: "23:00" },
    { day: "Miércoles", inicio: "06:00", fin: "23:00" },
    { day: "Jueves", inicio: "06:00", fin: "23:00" },
    { day: "Viernes", inicio: "06:00", fin: "23:00" },
    { day: "Sábado", inicio: "06:00", fin: "23:00" },
    { day: "Domingo", inicio: "06:00", fin: "23:00" },
  ];

  const generateTimeOptions = () => {
    let options = [];
    for (let i = 6; i <= 23; i++) {
      let time = `${i}:00`;
      options.push(<option className="bg-transparent" value={time}>{time}</option>);
    }
    return options;
  };

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

  useEffect(() => {
    console.log(timeAvailability)
  }, [timeAvailability])

  const saveTimeAvailability = async () => {
    try {
      for (const [day, times] of Object.entries(timeAvailability)) {
        const data = {
          tattooArtistId: user.logedInUser.id,
          day,
          initialHour: times.inicio,
          finalHour: times.fin,
        };

        const response = await axios.post(
          "http://localhost:3001/timeAvailabilities",
          data
        );
        
      }
    } catch (error) {
      console.error("Error al guardar el horario:", error);
    }
  };

  const updateTimeAvailability = async () => {
    let timeAvailabilityArray = [];
    
    try {
      timeAvailabilityArray = timeAvailability.map((timeDisponible) => ({
        id: timeDisponible.id,
        tattooArtistId: user.logedInUser.id,
        day,
        initialHour: timeDisponible.initialHour,
        finalHour: timeDisponible.finalHour,
      }));

      for (const availability of timeAvailabilityArray) {
        dispatch(updateArtistTimeAvailability(availability));
      }

      
    } catch (error) {
      console.error("Error al actualizar el horario:", error);
    }

    
  };

  const handleExceptionChange = (e) => {
    setNewException({ ...newException, [e.target.name]: e.target.value });
    
    setNewException(newException);
  };

  const addTimeException = async () => {
    const formattedException = {
      tattooArtistId: user.logedInUser.id,
      date: newException.date,
      initialHour: newException.initialHour,
      finalHour: newException.finalHour,
    };

   

    try {
      const response = await axios.post(
        "http://localhost:3001/timeAvailabilityExceptions",
        formattedException
      );

     
      setTimeException([...timeException, response.data]);
    } catch (error) {
      console.error("Error al añadir la excepción:", error);
    }
  };

  const deleteTimeException = async () => {
    

    try {
      await axios.delete(`http://localhost:3001/timeAvailabilityExceptions/`);
     
      setTimeException(
        timeException.filter((exception) => exception.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar la excepcion:", error);
    }
  };

  useEffect(() => {
    if (user.logedInUser.id) {
      dispatch(getTimeAvailabilities(user.logedInUser.id));
    }
  }, [dispatch, user.logedInUser.id]);

  return (
    <div>
      <div>
        <h3>Disponibilidad de Tiempo</h3>

        {initialTimeAvailability.map((initialTimes) => (
          <div key={initialTimes.day}>
            <h4>{initialTimes.day}</h4>
            <label>
              Inicio:
              <select
                className="bg-transparent"
                value={timeAvailability[initialTimes.day]?.inicio || initialTimes.inicio}
                onChange={(e) =>
                  handleTimeChange(initialTimes.day, "inicio", e.target.value)
                }
              >
                {generateTimeOptions()}
              </select>
            </label>
            <label>
              Fin:
              <select
                className="bg-transparent"
                value={timeAvailability[initialTimes.day]?.fin || initialTimes.fin}
                onChange={(e) =>
                  handleTimeChange(initialTimes.day, "fin", e.target.value)
                }
              >
                {generateTimeOptions()}
              </select>
            </label>
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
