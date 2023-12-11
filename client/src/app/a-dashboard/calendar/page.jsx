"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getUserById } from "../../../app/redux/features/user/userActions";

import { TbPointFilled } from "react-icons/tb";

import { useRouter } from "next/navigation";

import { notifyError } from "../../../components/notifyError/NotifyError";



const Page = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [dayObj, setDayObj] = useState({});
  const router = useRouter();
  const days = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const [userTimeAv, setUserTimeAv] = useState(
    user.logedInUser.timeAvailabilities || []
  );
  const [newException, setNewException] = useState({ date: "" });
  const URL_BASE = "https://serverconnectink.up.railway.app";
  const [showHours, setShowHours] = useState({});
  const [moreTime, setMoreTime] = useState({});
  const [moreExceptionTime, setMoreExceptionTime] = useState(false);

  console.log(user.logedInUser.userType);

  useEffect(() => {
    // if (!user.userType) {
    //   router.replace("/auth");
    // } else if (user.userType !== "artist") {
    //   router.replace("/");
    // }
    
    let obj = {};
    let objH = {};
    user.logedInUser.timeAvailabilities?.map((timeAvailability) => {
      obj[timeAvailability.day] = {
        initialHour: timeAvailability.initialHour,
        finalHour: timeAvailability.finalHour,
        secondInitialHour:
          timeAvailability.secondInitialHour || timeAvailability.finalHour,
        secondFinalHour: timeAvailability.secondFinalHour || null,
        id: timeAvailability.id,
      };
      if (timeAvailability.initialHour) objH[timeAvailability.day] = true;
    });
    setDayObj({ ...obj });
    setShowHours({ ...objH });
    setMoreTime({ ...objH });
  }, [user]);

  useEffect(() => {
    let array = [];
    for (let day in dayObj) {
      if (dayObj[day])
        array.push({
          day,
          initialHour: dayObj[day].initialHour,
          secondInitialHour: dayObj[day].secondInitialHour || null,
          secondFinalHour: dayObj[day].secondFinalHour || null,
          finalHour: dayObj[day].finalHour,
          id: dayObj[day].id,
        });
    }
    setUserTimeAv(array);
  }, [dayObj]);

  const generateTimeOptions = () => {
    let options = [];
    let initial = 6;
    let final = 23;

    for (let i = initial; i <= final; i++) {
      let time = `${i}:00:00`;
      options.push(
        <option key={time} className="bg-secondary-900 text-white" value={time}>
          {time}
        </option>
      );
    }
    return options;
  };

  const generateSecondTimeOptions = (day) => {
    let options = [];
    let initial = dayObj[day]?.finalHour?.split(":")[0];
    let final = 23;

    for (let i = initial; i <= final; i++) {
      let time = `${i}:00:00`;
      options.push(
        <option key={time} className="bg-secondary-900 text-white" value={time}>
          {time}
        </option>
      );
    }
    return options;
  };

  const generateTimeOptionsException = () => {
    let options = [];
    let initial = Number(newException?.initialHour?.split(":")[0]) || 6;
    let final = 23;

    for (let i = initial; i <= final; i++) {
      let time = `${i}:00:00`;
      options.push(
        <option key={time} className="bg-secondary-900 text-white" value={time}>
          {time}
        </option>
      );
    }
    return options;
  };

  const generateSecondFinalException = () => {
    let options = [];
    let initial = Number(newException?.secondInitialHour?.split(":")[0]);
    let final = 23;

    for (let i = initial; i <= final; i++) {
      let time = `${i}:00:00`;
      options.push(
        <option key={time} className="bg-secondary-900 text-white" value={time}>
          {time}
        </option>
      );
    }
    return options;
  };

  const generateSecondException = () => {
    let options = [];
    let initial = Number(newException?.finalHour?.split(":")[0]);
    let final = 23;

    for (let i = initial; i <= final; i++) {
      let time = `${i}:00:00`;
      options.push(
        <option key={time} className="bg-secondary-900 text-white" value={time}>
          {time}
        </option>
      );
    }
    return options;
  };

  const generateFinalTimeOptions = (day) => {
    let options = [];
    let initial = Number(dayObj[day]?.initialHour?.split(":")[0] || 6);
    let final = 23;

    for (let i = initial; i <= final; i++) {
      let time = `${i}:00:00`;
      options.push(
        <option key={time} className="bg-secondary-900 text-white" value={time}>
          {time}
        </option>
      );
    }
    return options;
  };

  const generateSecondFinalTimeOptions = (day) => {
    let options = [];
    let initial = Number(dayObj[day]?.secondInitialHour?.split(":")[0]);
    let final = 23;

    for (let i = initial; i <= final; i++) {
      let time = `${i}:00:00`;
      options.push(
        <option key={time} className="bg-secondary-900 text-white" value={time}>
          {time}
        </option>
      );
    }
    return options;
  };

  const handleInitialTimeChange = (weekDay, initialHour) => {
    setDayObj({
      ...dayObj,
      [weekDay]: { ...dayObj[weekDay], initialHour },
    });
  };

  const handleSecondInitialTimeChange = (weekDay, secondInitialHour) => {
    setDayObj({
      ...dayObj,
      [weekDay]: { ...dayObj[weekDay], secondInitialHour },
    });
  };

  const handleFinalTimeChange = (weekDay, finalHour) => {
    setDayObj({
      ...dayObj,
      [weekDay]: {
        ...dayObj[weekDay],
        finalHour,
        secondInitialHour: finalHour,
      },
    });
  };

  const handleSecondFinalTimeChange = (weekDay, secondFinalHour) => {
    setDayObj({
      ...dayObj,
      [weekDay]: { ...dayObj[weekDay], secondFinalHour },
    });
  };

  const saveTimeAvailability = async () => {
    try {
      for (const {
        day,
        initialHour,
        finalHour,
        secondFinalHour,
        secondInitialHour,
        id,
      } of userTimeAv) {
        if (id) {
          const data = {
            day,
            initialHour,
            finalHour,
            secondFinalHour: secondFinalHour || null,
            secondInitialHour: secondInitialHour || null,
          };

          await axios.put(`${URL_BASE}/timeAvailabilities/${id}`, data);
        } else if (initialHour && finalHour) {
          let data = {};
          if (secondInitialHour && secondFinalHour) {
            data = {
              tattooArtistId: user.logedInUser.id,
              day,
              initialHour,
              finalHour,
              secondFinalHour,
              secondInitialHour,
            };
          } else {
            data = {
              tattooArtistId: user.logedInUser.id,
              day,
              initialHour,
              finalHour,
            };
          }


          await axios.post(`${URL_BASE}/timeAvailabilities`, data);
        }
      }
      dispatch(getUserById(user.fireBaseUser.tokenId));
    } catch (error) {
      notifyError("Error al guardar el horario:", error);
    }
  };

  const handleExceptionChange = (event) => {
    if (event.target.value && event.target.name == "date") {
      setNewException({
        [event.target.name]: event.target.value,
      });
    } else if (event.target.name == "finalHour") {
      setNewException({
        ...newException,
        [event.target.name]: event.target.value,
        secondInitialHour: event.target.value,
      });
    } else {
      setNewException({
        ...newException,
        [event.target.name]: event.target.value,
      });
    }
  };

  useEffect(() => {

   
  }, [newException])



  const addTimeException = async () => {
    if (newException.initialHour == "No trabajo") {
      await axios.post(`${URL_BASE}/timeAvailabilityExceptions`, {
        date: newException.date,
        tattooArtistId: user.logedInUser.id,
      });
    } else if (
      newException.secondInitialHour &&
      !newException.secondFinalHour
    ) {
      await axios.post(`${URL_BASE}/timeAvailabilityExceptions`, {
        date: newException.date,
        initialHour: newException.initialHour,
        finalHour: newException.finalHour,
        tattooArtistId: user.logedInUser.id,
      });
    } else {
      await axios.post(`${URL_BASE}/timeAvailabilityExceptions`, {
        ...newException,
        tattooArtistId: user.logedInUser.id,
      });
    }

    dispatch(getUserById(user.fireBaseUser.tokenId));

    setNewException({ date: "" });
  };

  const deleteHourDay = (day) => {
    setDayObj({
      ...dayObj,
      [day]: { initialHour: null, finalHour: null, id: dayObj[day]?.id },
    });
    setShowHours({
      ...showHours,
      [day]: false,
    });
  };

  return (
    <div className="bg-secondary-900 rounded w-[70%] shadow-lg shadow-artist">
      <div className=" text-center">
        <h3 className="font-rocksalt text-[26px] mt-8 mb-2 text-artistfont ">Disponibilidad de Tiempo</h3>
        <div className="flex items-center justify-center ">
           <hr className="mt-6 mb-6 w-[90%] border-artist/50 "></hr>
        </div>
        
        {days.map((day) => {
          return (
            <div key={day} className="">
              <h4 className="text-xl mb-4 font-rocksalt">{day}</h4>
              {showHours[day] ? (
                <div className="">
                  <div className="flex justify-center items-center gap-[25px] p-3"> 
                  <label>
                    Inicio:
                    <select
                      className="bg-transparent border-[1px] border-artist/50 ml-4 rounded-md "
                      defaultValue={dayObj[day]?.initialHour || ""}
                      onChange={(e) =>
                        handleInitialTimeChange(day, e.target.value)
                      }
                    >
                      <option className="bg-transparent " value="" disabled>
                        Horario inicial
                      </option>
                      {generateTimeOptions()}
                    </select>
                  </label>

                  <label>
                    Fin:
                    <select
                      className="bg-transparent border-[1px] border-artist/40 ml-4 rounded-md "
                      defaultValue={dayObj[day]?.finalHour || ""}
                      onChange={(e) =>
                        handleFinalTimeChange(day, e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Horario final
                      </option>
                      {generateFinalTimeOptions(day)}
                    </select>
                  </label>
                  </div>
                    
                  {moreTime[day] && (
                    <div className="flex items-center justify-center gap-[25px] mt-6">
                      <label>
                        Inicio:
                        <select
                          className="bg-transparent border-[1px] border-artist/40 ml-4 rounded-md"
                          defaultValue={dayObj[day]?.secondInitialHour || ""}
                          onChange={(e) =>
                            handleSecondInitialTimeChange(day, e.target.value)
                          }
                        >
                          <option value="" disabled>
                            Seleccionar horario inicial
                          </option>
                          {generateSecondTimeOptions(day)}
                        </select>
                      </label>

                      <label>
                        Fin:
                        <select
                          className="bg-transparent border-[1px] border-artist/40 ml-4 rounded-md "
                          defaultValue={dayObj[day]?.secondFinalHour || ""}
                          onChange={(e) =>
                            handleSecondFinalTimeChange(day, e.target.value)
                          }
                        >
                          <option value="" disabled>
                            Seleccionar horario final
                          </option>
                          {generateSecondFinalTimeOptions(day)}
                        </select>
                      </label>
                    </div>
                  )}
                    
                  <button
                    onClick={() =>
                      setMoreTime({ ...moreTime, [day]: !moreTime[day] })
                    }
                  >
                    {moreTime[day] ? "➖" : "➕"}
                  </button>

                  <button onClick={() => deleteHourDay(day)}>❌</button>
                </div>
              ) : (
                <button
                  onClick={() => setShowHours({ ...showHours, [day]: true })}
                  className="w-[30%] rounded outline  mb-4 transition-transform hover:scale-110  "
                >
                  Agregar horario:
                </button>
              )}
            </div>
          );
        })}
        <button onClick={saveTimeAvailability} className="w-[20%] border-[3px] p-3  border-artist/40 hover:border-artist transition-transform hover:scale-105 mb-2 rounded-lg mt-3 hover:bg-artist/70 hover:text-lg ">Guardar Horarios</button>
      </div>
      <div className="flex items-center justify-center">
           <hr className="mt-6 mb-6 w-[90%] border-artist/50"></hr>
        </div>

      <div className="">
        <h3 className="text-[26px] font-rocksalt text-center mt-4 mb-6">Excepciones de horarios</h3>
          <ul className="ml-10 mt-4">
             <li className="mt-2 flex gap-2 text-artistfont"><TbPointFilled className='text-artist'/>Si en alguna fecha en específico vas a usar un horario diferente al normal, agrégala aquí.</li>
             <li className="mt-2 flex gap-2 text-artistfont"><TbPointFilled className='text-artist'/>Selecciona la fecha especial e ingresa el horario en el que SÍ trabajarías.</li>
             <li className="mt-2 flex gap-2 text-artistfont"><TbPointFilled className='text-artist'/>En caso de que en la fecha específica no vayas a trabajar, selecciona la opción "No trabajo" en el apartado de hora inicial.</li>
          </ul>
        <div className="flex items-center justify-center mt-10">
        <input
          type="date"
          name="date"
          value={newException?.date}
          onChange={handleExceptionChange}
          className="bg-transparent border-[1px] border-artist/50 rounded-md text-center p-2"
        />
        </div>
        {newException.date && (
          <div className=" flex items-center justify-center mt-4 mb-4 gap-[25px]">
            <select
              name="initialHour"
              defaultValue=""
              onChange={handleExceptionChange}
              className="bg-transparent border-[1px] border-artist/60 rounded-md p-2"
            >
              <option value=""  >
                Horario inicial
              </option>
              {generateTimeOptions()}
              <option value="No trabajo">No trabajo</option>
            </select>
            {newException?.initialHour !== "No trabajo" && (
              <select
                name="finalHour"
                defaultValue=""
                onChange={handleExceptionChange}
                className="bg-transparent border-[1px] border-artist/60 rounded-md p-2"
              >
                <option>Horario final</option>
                {generateTimeOptionsException()}
              </select>
            )}
          </div>
        )}

        {newException.initialHour && newException.finalHour && (
          <div className="text-center">
            <button onClick={() => setMoreExceptionTime(!moreExceptionTime)}>
              {moreExceptionTime ? "➖" : "➕"}
            </button>

            {moreExceptionTime && (
              <div>
                <label>
                  Segundo horario de inicio:
                  <select
                    name="secondInitialHour"
                    className="bg-transparent"
                    onChange={handleExceptionChange}
                  >
                    <option value="" disabled>
                      Seleccionar segundo horario inicial
                    </option>
                    {generateSecondException()}
                  </select>
                </label>

                <label>
                  Segundo horario de fin:
                  <select
                    name="secondFinalHour"
                    className="bg-transparent"
                    onChange={handleExceptionChange}
                  >
                    <option value="" disabled>
                      Seleccionar horario final
                    </option>
                    {generateSecondFinalException()}
                  </select>
                </label>
              </div>
            )}
          </div>
        )}
        <div className="flex items-center justify-center mt-8 mr-6">
        <button
          onClick={addTimeException}
          className="ml-6 hover:scale-105 transition-transform border-[1px] border-artist/60 hover:border-artist hover:bg-artist/60  rounded mb-6 p-2"
          disabled={
            !newException.initialHour ||
            (!newException.finalHour &&
              newException.initialHour !== "No trabajo")
          }
        >
          Añadir Excepción
        </button>

        </div>
       
        {user.logedInUser.timeAvailabilityExceptions?.length && (
          <div className="text-center">
            {user.logedInUser.timeAvailabilityExceptions.map(
              (exception, index) => (
                <div key={index}>
                  Fecha: {exception.date},
                  {exception.initialHour && exception.finalHour ? (
                    <div>
                      <p>
                        Inicio: {exception.initialHour}, Fin:{" "}
                        {exception.finalHour}
                      </p>
                      {exception.secondInitialHour &&
                        exception.secondFinalHour && (
                          <p>
                            Segundo inicio: {exception.secondInitialHour},
                            Segundo fin: {exception.secondFinalHour}
                          </p>
                        )}
                    </div>
                  ) : (
                    <p>Sin trabajo</p>
                  )}
                   <div className="flex items-center justify-center ">
                    <hr className="mt-6 mb-6 w-[90%] border-secondary-100"></hr>
               </div>
                </div>
              )
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Page;
