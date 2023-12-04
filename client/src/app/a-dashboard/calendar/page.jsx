"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getUserById } from "@/app/redux/features/user/userActions";

const Page = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [dayObj, setDayObj] = useState({})
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
  const [userTimeAv, setUserTimeAv] = useState(user.logedInUser.timeAvailabilities || [])
  const [newException, setNewException] = useState({date: ""})
  const URL_BASE = "http://localhost:3001"

  useEffect(() => {
    let obj = {}
    user.logedInUser.timeAvailabilities.map((timeAvailability) => {
      obj[timeAvailability.day] = {initialHour: timeAvailability.initialHour, finalHour: timeAvailability.finalHour, id: timeAvailability.id}
    })
    setDayObj({...obj})
  }, [user])

  useEffect(() => {
    let array = []
    for(let day in dayObj) {
      array.push({day, initialHour: dayObj[day].initialHour, finalHour: dayObj[day].finalHour, id: dayObj[day].id})
    }
    setUserTimeAv(array)
  }, [dayObj])

  const generateTimeOptions = (day) => {
    let options = [];
    let initial = 6
    let final = 23

    for (let i = initial; i <= final; i++) {
      let time = `${i}:00:00`;
      options.push(
        <option key={time} className="bg-transparent" value={time}>
          {time}
        </option>
      );
    }
    return options;
  };

  const generateTimeOptionsException = () => {
    let options = [];
    let initial = Number(newException?.initialHour?.slice(0, 2)) || 6
    let final = 23

    for (let i = initial; i <= final; i++) {
      let time = `${i}:00:00`;
      options.push(
        <option key={time} className="bg-transparent" value={time}>
          {time}
        </option>
      );
    }
    return options;
  };

  const generateFinalTimeOptions = (day) => {
    let options = [];
    let initial = Number(dayObj[day]?.initialHour?.slice(0, 2)) || 6
    let final = 23

    for (let i = initial; i <= final; i++) {
      let time = `${i}:00:00`;
      options.push(
        <option key={time} className="bg-transparent" value={time}>
          {time}
        </option>
      );
    }
    return options;
  };

  const handleInitialTimeChange = (weekDay, initialHour) => {
    setDayObj({
      ...dayObj,
      [weekDay]: {...dayObj[weekDay], initialHour}
    })
  }

  const handleFinalTimeChange = (weekDay, finalHour) => {
    setDayObj({
      ...dayObj,
      [weekDay]: {...dayObj[weekDay], finalHour}
    })
  }

  const saveTimeAvailability = async () => {
    try {
      for (const {day, initialHour, finalHour, id} of userTimeAv) {
        if(id){
          const data = {
            day,
            initialHour,
            finalHour,
          };
  
          await axios.put(
            `${URL_BASE}/timeAvailabilities/${id}`,
            data
          ) 
        } else if(initialHour && finalHour) {
          const data = {
            tattooArtistId: user.logedInUser.id,
            day,
            initialHour,
            finalHour,
          };
  
          await axios.post(
            `${URL_BASE}/timeAvailabilities`,
            data
          );
        }
      }
      dispatch(getUserById(user.fireBaseUser.tokenId))
    } catch (error) {
      console.error("Error al guardar el horario:", error);
    }
  };

  // useEffect(() => {
  //   console.log(newException)
  // }, [newException])

  const handleExceptionChange = (event) => {
    if(event.target.value && event.target.name == "date"){
      setNewException({
        [event.target.name]: event.target.value
      }) 
    } else {
      setNewException({
        ...newException,
        [event.target.name]: event.target.value
      })
    }
  }

  const addTimeException = async () => {
    await axios.post(`${URL_BASE}/timeAvailabilityExceptions`, {...newException, tattooArtistId: user.logedInUser.id})

    dispatch(getUserById(user.fireBaseUser.tokenId))

    setNewException({date: ""})

  }

  return (
    <div>
      <div>
        <h3>Disponibilidad de Tiempo</h3>
        {
          days.map((day) => {
            return <div key={day}>
              <h4>{day}</h4>
              {dayObj[day] ? (
                <div>

                  <label>
                    Inicio: 
                    <select
                    className="bg-transparent"
                    defaultValue={dayObj[day]?.initialHour}
                    onChange={(e) =>
                      handleInitialTimeChange(day, e.target.value)
                    }
                    >
                      {generateTimeOptions(day)}
                    </select>
                  </label>


                  <label>
                    Fin: 
                    <select
                    className="bg-transparent"
                    defaultValue={dayObj[day]?.finalHour}
                    onChange={(e) =>
                      handleFinalTimeChange(day, e.target.value)
                    }
                    >
                      {generateFinalTimeOptions(day)}
                    </select>
                  </label>
                </div>
              ) : (
                <button onClick={() => setDayObj({...dayObj, [day]: true})}>Agregar horario:</button>
              )}

            </div>
          })
        }
        <button onClick={saveTimeAvailability}>Guardar Horarios</button>
      </div>

      <div>
        <h3>Excepciones de horarios</h3>
        <p>Si en algna fecha en especifico vas a usar un horario diferente al normal, agregala acá</p>
        <p>Selecciona la fecha especial, e ingresa el horario en el que SI trabajarías</p>
        <input
          type="date"
          name="date"
          value={newException?.date}
          onChange={handleExceptionChange}
        />
        {newException.date && 
        <div>  
          <select
            name="initialHour"
            value={newException?.initialHour}
            onChange={handleExceptionChange}
          >
            {generateTimeOptions()}
          </select>
          <select
            name="finalHour"
            value={newException.finalHour}
            onChange={handleExceptionChange}
          >
            {generateTimeOptionsException()}
          </select>
        </div>
        }

        <button onClick={addTimeException}>Añadir Excepcion</button>
        {console.log(user.logedInUser)}
          {user.logedInUser.timeAvailabilityExceptions.length &&
            user.logedInUser.timeAvailabilityExceptions.map((exception, index) => (
              <div key={index}>
                Fecha: {exception.date}, Inicio: {exception.initialHour}, Fin:{" "}
                {exception.finalHour}
              </div>
            ))
          }
      </div>
    </div>
  );
};

export default Page;
