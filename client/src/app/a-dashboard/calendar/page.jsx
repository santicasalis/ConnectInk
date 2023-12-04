"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  getTimeAvailabilities,
  getTimeExceptions,
  updateArtistTimeAvailability,
  addTimeAvailabilityException,
  deleteArtistTimeAvailabilityException
} from "@/app/redux/features/artists/artistActions";

const Page = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const timeAvailabilities = useSelector(
    (state) => state.artists.timeAvailabilities[user.logedInUser.id] || []
  );
  console.log(timeAvailabilities)

const timeExceptions = useSelector(
  (state) => state.artists.timeAvailabilityExceptions[user.logedInUser.id]
);
  console.log(timeExceptions)

  const initialTimeAvailability = [
    { day: "Lunes", inicio: "06:00", fin: "23:00" },
    { day: "Martes", inicio: "06:00", fin: "23:00" },
    { day: "Miércoles", inicio: "06:00", fin: "23:00" },
    { day: "Jueves", inicio: "06:00", fin: "23:00" },
    { day: "Viernes", inicio: "06:00", fin: "23:00" },
    { day: "Sábado", inicio: "06:00", fin: "23:00" },
    { day: "Domingo", inicio: "06:00", fin: "23:00" },
  ];

  const [timeAvailability, setTimeAvailability] = useState([
    initialTimeAvailability,
  ]);

  const generateTimeOptions = () => {
    let options = [];
    for (let i = 6; i <= 23; i++) {
      let time = `${i}:00`;
      options.push(
        <option className="bg-transparent" value={time}>
          {time}
        </option>
      );
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
    
    const isAvailabilityEmpty =
      timeAvailability.length === 0 || !timeAvailability[0];
    const availabilities = isAvailabilityEmpty
      ? initialTimeAvailability
      : timeAvailability[0];

    for (const [day, times] of Object.entries(availabilities)) {
      const data = {
        tattooArtistId: user.logedInUser.id,
        day: isAvailabilityEmpty ? times.day : day,
        initialHour: times.inicio,
        finalHour: times.fin,
      };
      

      const response = await axios.post(
        "http://localhost:3001/timeAvailabilities",
        data
      );
      
    }
    alert("Horarios guardados con éxito");
  } catch (error) {
    console.error("Error al guardar el horario:", error);
    alert("Error al guardar los horarios");
  }
};


 const updateTimeAvailability = async () => {
   try {
     for (const availability of timeAvailabilities) {
       const updatedAvailability = {
         initialHour: timeAvailability[availability.day].inicio,
         finalHour: timeAvailability[availability.day].fin,
       };

       dispatch(
         updateArtistTimeAvailability(availability.id, updatedAvailability)
       );
     }

     alert("Horarios actualizados con éxito");
   } catch (error) {
     console.error("Error al actualizar el horario:", error);
     alert("Error al actualizar los horarios");
   }
 };

 const handleExceptionChange = (e) => {
   setNewException({ ...newException, [e.target.name]: e.target.value });
 };

const addTimeException = () => {
  const formattedException = {
    tattooArtistId: user.logedInUser.id,
    date: newException.date,
    initialHour: newException.initialHour,
    finalHour: newException.finalHour,
  };
  dispatch(
    addTimeAvailabilityException(
      user.logedInUser.id,
      newException.date,
      newException.initialHour,
      newException.finalHour
    )
  );


  setNewException({ date: "", initialHour: "06:00", finalHour: "23:00" });
};

const deleteTimeException = (exceptionId) => {
  dispatch(
    deleteArtistTimeAvailabilityException(user.logedInUser.id, exceptionId)
  );
};

  useEffect(() => {
  if (user.logedInUser.id) {
    dispatch(getTimeAvailabilities(user.logedInUser.id));
  }
}, [dispatch, user.logedInUser.id]);

    useEffect(() => {
      if (
        user.logedInUser.timeAvailabilities &&
        user.logedInUser.timeAvailabilities.length > 0
      ) {
        const updatedTimeAvailability =
          user.logedInUser.timeAvailabilities.reduce((acc, curr) => {
            acc[curr.day] = {
              inicio: curr.initialHour.substring(0, 5),
              fin: curr.finalHour.substring(0, 5),
            };
            return acc;
          }, {});
        setTimeAvailability(updatedTimeAvailability);
      } else {
        setTimeAvailability(
          initialTimeAvailability.reduce((acc, curr) => {
            acc[curr.day] = { inicio: curr.inicio, fin: curr.fin };
            return acc;
          }, {})
        );
      }
    }, [user.logedInUser.timeAvailabilities]);

    useEffect(() => {
      if (user.logedInUser.id) {
        dispatch(getTimeExceptions(user.logedInUser.id));
      }
    }, [dispatch, user.logedInUser.id]);
  return (
    <div>
      <div>
        <h3>Disponibilidad de Tiempo</h3>

        {Object.entries(timeAvailability).map(([day, times]) => (
          <div key={day}>
            <h4>{day}</h4>
            <label>
              Inicio:
              <select
                className="bg-transparent"
                value={times.inicio}
                onChange={(e) =>
                  handleTimeChange(day, "inicio", e.target.value)
                }
              >
                {generateTimeOptions()}
              </select>
            </label>
            <label>
              Fin:
              <select
                className="bg-transparent"
                value={times.fin}
                onChange={(e) => handleTimeChange(day, "fin", e.target.value)}
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
        {timeExceptions &&
          timeExceptions.map((exception, index) => (
            <div key={index}>
              Fecha: {exception.date}, Inicio: {exception.initialHour}, Fin:{" "}
              {exception.finalHour}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
