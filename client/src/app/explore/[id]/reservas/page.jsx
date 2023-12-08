"use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Calendar from "react-calendar";
// import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
// import { uploadImage } from "@/app/utils/uploadImage";
// import { validationSchema } from "./validationSchema";
// import { toast } from "react-toastify";
// import { dayData } from "../../../utils/data/dayData";
// import { useDispatch, useSelector } from "react-redux";
// import { getArtistDetail } from "@/app/redux/features/artists/artistActions";
// import Nav from "@/components/nav/Nav";

// const URL_BASE = "http://localhost:3001";

// const bookAppointment = ({ params }) => {
//   const { id } = params;
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedTime, setSelectedTime] = useState("");
//   const [day, setDay] = useState("");
//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");
//   const [showTime, setShowTime] = useState(false);
//   const [obj, setObj] = useState({});
//   const [objHours, setObjHours] = useState({});
//   const [exception, setException] = useState([]);
//   const artist = useSelector((state) => state.artists.detail);
//   const user = useSelector((state) => state.user.logedInUser);
//   const [sent, setSent] = useState(false);

//   const dispatch = useDispatch();

//   const durations = {
//     Pequeño: 1,
//     "Pequeño a color": 1,
//     "Mediano a color": 2,
//     Mediano: 2,
//     Grande: 3,
//     "Grande a color": 3,
//   };

//   useEffect(() => {
//     let array = [];
//     if (artist?.timeAvailabilities?.length) {
//       getDisabled();
//       getHours();
//     }
//     artist?.timeAvailabilityExceptions?.map((e) => {
//       const [exY, exM, exD] = e.date.split("-");
//       const date = new Date(exY, exM - 1, exD);
//       array.push(date.toDateString());
//     });
//     setException(array);
//   }, [artist.timeAvailabilities]);

//   useEffect(() => {
//     dispatch(getArtistDetail(id));
//   }, []);

//   function createHourArray(initialTime, FinalTime) {
//     let resultado = [];
//     for (let i = initialTime; i < FinalTime; i++) {
//       resultado.push(`${i}hs`);
//     }
//     return resultado;
//   }

//   function createHourArrayWithAppointment(
//     initialTime,
//     FinalTime,
//     initialTimeApp,
//     FinalTimeApp
//   ) {
//     let resultado = [];
//     for (let i = initialTime; i <= FinalTime; i++) {
//       if (i >= initialTimeApp && i <= FinalTimeApp) continue;
//       resultado.push(`${i}hs`);
//     }
//     return resultado;
//   }

//   const getHours = () => {
//     let objH = {};
//     artist?.timeAvailabilities?.forEach((av) => {
//       dayData.map((da) => {
//         if (da.day === av.day && av?.initialHour && av?.finalHour) {
//           objH[da.number] = createHourArray(
//             Number(av.initialHour.slice(0, 2)),
//             Number(av.finalHour.slice(0, 2))
//           );
//         }
//       });
//     });
//     artist?.timeAvailabilityExceptions?.forEach((ex, index) => {
//       if (ex.initialHour) {
//         objH[exception[index]] = createHourArray(
//           Number(ex?.initialHour?.slice(0, 2)) || 6,
//           Number(ex?.finalHour?.slice(0, 2)) || 23
//         );
//       } else {
//         objH[ex] = [];
//       }

//     });
//     artist?.appointments?.forEach((appointment) => {
//       const dateAndTime = new Date(appointment.dateAndTime);
//       const time = dateAndTime.getHours();
//       const date = dateAndTime.toDateString();
//       let initial = Number(
//         (objH[dateAndTime.getDay()]?.at(0) || objH[date].at(0)).slice(0, 2)
//       );
//       let final = Number(
//         (objH[dateAndTime.getDay()]?.at(-1) || objH[date].at(-1)).slice(0, 2)
//       );
//       objH[date] = createHourArrayWithAppointment(
//         initial,
//         final,
//         time,
//         time + appointment.duration
//       );
//     });
//     setObjHours(objH);
//   };

//   const getDisabled = () => {
//     let array = [];
//     let numobj = {};
//     artist?.timeAvailabilities?.map((av) => {
//       dayData.map((da) => {
//         if (da.day === av.day && av.initialHour) {
//           array.push(da.number);
//         }
//       });
//     });
//     for (let num of array) {
//       numobj[num] = true;
//     }
//     setObj(numobj);
//   };

//   const tileStyles = ({ date, view }) => {
//     if (view == "month") {
//       if (
//         date < new Date(Date.now()) ||
//         !(
//           obj[date.getDay()] ||
//           (objHours[date.toDateString] &&
//             exception.includes(date.toDateString()))
//         )
//       ) {
//         return "text-gray-500";
//       }
//       if (
//         date.toDateString() === selectedDate.toDateString() &&
//         (objHours[selectedDate.getDay()] ||
//           objHours[selectedDate.toDateString()])
//       ) {
//         return "bg-green-600	text-black";
//       }
//     }

//     if (view == "year") {
//       if (date.getMonth() == new Date(Date.now()).getMonth()) {
//         return "text-white";
//       } else if (date.valueOf() < new Date(Date.now()).valueOf()) {
//         return "text-gray-500";
//       }
//     }

//     if (view == "decade") {
//       if (date.getFullYear() == new Date(Date.now()).getFullYear()) {
//         return "text-white";
//       } else if (date.valueOf() < new Date(Date.now()).valueOf()) {
//         return "text-gray-500";
//       }
//     }

//     return "text-white";
//   };

//   const isPossible = (duration, start, finish) => {
//     return duration + start <= finish;
//   };

//   const tileDisabled = ({ activeStartDate, date, view }) => {
//     if (view == "month")
//       return !(
//         obj[date.getDay()] ||
//         (objHours[date.toDateString] && exception.includes(date.toDateString()))
//       );
//   };

//   const changeDate = (form, date) => {
//     setSelectedTime("");
//     setShowTime(true);
//     setSelectedDate(date);
//     setDay(date.getDate());
//     setMonth(date.getMonth());
//     setYear(date.getFullYear());
//     selectedTime &&
//       form.setFieldValue(
//         "dateAndTime",
//         new Date(
//           date.getFullYear(),
//           date.getMonth(),
//           date.getDate(),
//           selectedTime
//         )
//       );
//   };

//   const handleTime = (form, event) => {
//     setSelectedTime(event.target.value.split("h")[0]);
//     form.setFieldValue(
//       "dateAndTime",
//       new Date(year, month, day, event.target.value.split("h")[0])
//     );
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <Nav />

//       <div className="w-full  p-4 shadow-lg flex justify-center">
//         <div className="p-4 rounded border-primary border-[2px] shadow-lg">
//           {sent ? (
//             <h1>Turno creado con exito! Redireccionando a Mercado Pago para completar la reserva</h1>
//           ) : (
//             <Formik
//               initialValues={{
//                 size: "",
//                 image: null,
//                 bodyPlace: "",
//                 description: "",
//                 dateAndTime: "",
//                 duration: "",
//                 possible: true,
//               }}
//               validationSchema={validationSchema}
//               onSubmit={async (values, { setSubmitting }) => {
//                 try {
//                   if (values.image && typeof values.image === "object") {
//                     const imageUrl = await uploadImage(values.image);
//                     values.image = imageUrl;
//                   }

//                   const createResponse = await axios.post(
//                     `${URL_BASE}/appointments`,
//                     { ...values, tattooArtistId: id, customerId: user.id }
//                   );

//                   const createdAppointment = createResponse.data.data;

//                   const paymentMp = await axios.post(`${URL_BASE}/payment`, {
//                     id: createdAppointment.id,
//                     description: createdAppointment.description,
//                     depositPrice: createdAppointment.depositPrice,
//                   });

//                   const paymentMpResponse = paymentMp.data;

//                   if (paymentMpResponse) {
//                     setTimeout(() => {
//                       window.location.href = paymentMpResponse.init_point;
//                     }, 3000);

//                   }
//                   setSent(true);
//                 } catch (error) {
//                   throw Error("Error en el formulario");
//                 }
//                 setSubmitting(false);
//               }}
//             >
//               {({ isSubmitting, isValid, dirty, setFieldValue, values }) => (
//                 <Form className="flex flex-col shadow-lg p-5 max-w-xl mx-auto">
//                   {console.log(values)}
//                   <div className="info-artist mb-4">
//                     <div className="p-2 m-2">
//                       <label htmlFor="size">Selecciona una opción:</label>
//                       <Field as="select" name="size">
//                         <option value="" disabled>
//                           Selecciona una opcion
//                         </option>
//                         <option value="Pequeño">Pequeño</option>
//                         <option value="Pequeño a color">Pequeño a color</option>
//                         <option value="Mediano">Mediano</option>
//                         <option value="Mediano a color">Mediano a color</option>
//                         <option value="Grande">Grande</option>
//                         <option value="Grande a color">Grande a color</option>
//                       </Field>
//                       {objHours[selectedDate.getDay()] &&
//                         values.size &&
//                         (values.possible = isPossible(
//                           Number(durations[values.size]),
//                           Number(selectedTime),
//                           Number(
//                             objHours[selectedDate.getDay()].at(-1).split("h")[0]
//                           ) + 1
//                         ))}
//                       <ErrorMessage
//                         name="fullName"
//                         component="div"
//                         className="text-red-500 text-sm"
//                       />
//                     </div>
//                     <Field
//                       type="text"
//                       name="bodyPlace"
//                       placeholder="Lugar del cuerpo"
//                       className="p-2 mb-3 shadow-md block w-full"
//                     />
//                     <ErrorMessage
//                       name="bodyPlace"
//                       component="div"
//                       className="text-red-500 text-sm"
//                     />

//                     <Field
//                       type="text"
//                       name="description"
//                       placeholder="Descripcion y explicacion del tatuaje a realizar"
//                       className="p-2 mb-3 shadow-md block w-full"
//                     />
//                     <ErrorMessage
//                       name="description"
//                       component="div"
//                       className="text-red-500 text-sm"
//                     />
//                     <label>Fecha Seleccionada:</label>
//                     <Field name="dateAndTime">
//                       {({ field, form }) => (
//                         <div>
//                           <Calendar
//                             {...field}
//                             defaultValue={null}
//                             locale="es"
//                             tileClassName={tileStyles}
//                             tileDisabled={tileDisabled}
//                             onChange={(date) => changeDate(form, date)}
//                             minDate={new Date(Date.now())}
//                           />
//                           <div className="text-black">
//                             {showTime && (
//                               <div className="text-gray-300">
//                                 <p>Horario del comienzo del turno</p>
//                                 <select
//                                   name="dateTime"
//                                   value={selectedTime}
//                                   onChange={(event) => handleTime(form, event)}
//                                 >
//                                   <option name="dateTime" value="" disabled>
//                                     Seleccionar horario inicial
//                                   </option>
//                                   {(
//                                     objHours[selectedDate.toDateString()] ||
//                                     objHours[selectedDate.getDay()]
//                                   )?.map((hour) => {
//                                     return (
//                                       <option key={hour} name="dateTime">
//                                         {hour}
//                                       </option>
//                                     );
//                                   })}
//                                 </select>
//                               </div>
//                             )}
//                             {values.duration && values.dateAndTime && <p></p>}
//                           </div>
//                         </div>
//                       )}
//                     </Field>
//                     <ErrorMessage name="selectedDate" component="div" />
//                   </div>
//                   <div className="mb-4">
//                     <label htmlFor="image" className="font-bold">
//                       Imagen de perfil
//                     </label>
//                     <input
//                       type="file"
//                       name="image"
//                       onChange={(event) => {
//                         setFieldValue("image", event.currentTarget.files[0]);
//                       }}
//                       className="p-2 mb-3 shadow-md block w-full"
//                     />
//                     {values.image && (
//                       <button
//                         type="button"
//                         onClick={() => setFieldValue("image", null)}
//                         className="bg-red-500 text-white p-2 rounded"
//                       >
//                         Delete Image
//                       </button>
//                     )}
//                   </div>
//                   <button
//                     type="submit"
//                     disabled={
//                       isSubmitting || !isValid || !dirty || !values.possible
//                     }
//                   >
//                     Reservar turno
//                   </button>
//                   {!values.possible && (
//                     <div>
//                       <p>
//                         El horario es muy tarde para un tatuaje tan grande, por
//                         favor selecciona un horario anterior o cambia de fecha
//                         para buscar un dia con mayor disponibilidad
//                       </p>
//                     </div>
//                   )}
//                 </Form>
//               )}
//             </Formik>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default bookAppointment;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { uploadImage } from "@/app/utils/uploadImage";
import { validationSchema } from "./validationSchema";
import { toast } from "react-toastify";
import { dayData } from "../../../utils/data/dayData";
import { useDispatch, useSelector } from "react-redux";
import { getArtistDetail } from "@/app/redux/features/artists/artistActions";
import Nav from "@/components/nav/Nav";

const URL_BASE = "http://localhost:3001";

const BookAppointment = ({ params }) => {
  const { id } = params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [showTime, setShowTime] = useState(false);
  const [obj, setObj] = useState({});
  const [objHours, setObjHours] = useState({});
  const [exception, setException] = useState([]);
  const artist = useSelector((state) => state.artists.detail);
  const user = useSelector((state) => state.user.logedInUser);
  const [sent, setSent] = useState(false);

  const dispatch = useDispatch();

  const durations = {
    Pequeño: 1,
    "Pequeño a color": 1,
    "Mediano a color": 2,
    Mediano: 2,
    Grande: 3,
    "Grande a color": 3,
  };

  const filterAvailabilties = () => {
    const { appointments, timeAvailabilities, timeAvailabilityExceptions } =
      artist;

    let obj = {};

    const allAvailabilities = timeAvailabilities.map((availabilty) => {
      return { 
        day: availabilty.day, 
        initialHour: availabilty.initialHour,
        finalHour: availabilty.finalHour,
        secondInitialHour: availabilty.secondInitialHour || null,
        secondFinalHour: availabilty.secondFinalHour || null
      };
    });

    appointments.forEach((appointment) => {
      console.log()
    });
  };

  useEffect(() => {
    let array = [];
    if (artist?.timeAvailabilities?.length) {
      getDisabled();
      getHours();
    }
    artist?.timeAvailabilityExceptions?.map((e) => {
      const [exY, exM, exD] = e.date.split("-");
      const date = new Date(exY, exM - 1, exD);
      array.push(date.toDateString());
    });
    setException(array);
  }, [artist.timeAvailabilities]);

  useEffect(() => {
    dispatch(getArtistDetail(id));
  }, []);

  const createHourArray = (initialTime, FinalTime) => {
    let resultado = [];
    for (let i = initialTime; i < FinalTime; i++) {
      resultado.push(`${i}hs`);
    }
    return resultado;
  };

  const createHourArrayWithAppointment = (
    initialTime,
    FinalTime,
    initialTimeApp,
    FinalTimeApp
  ) => {
    let resultado = [];
    for (let i = initialTime; i <= FinalTime; i++) {
      if (i >= initialTimeApp && i <= FinalTimeApp) continue;
      resultado.push(`${i}hs`);
    }
    return resultado;
  };

  const getHours = () => {
    let objH = {};
    artist?.timeAvailabilities?.forEach((av) => {
      dayData.map((da) => {
        if (da.day === av.day && av?.initialHour && av?.finalHour) {
          objH[da.number] = createHourArray(
            Number(av.initialHour.slice(0, 2)),
            Number(av.finalHour.slice(0, 2))
          );
        }
      });
    });
    artist?.timeAvailabilityExceptions?.forEach((ex, index) => {
      if (ex.initialHour) {
        objH[exception[index]] = createHourArray(
          Number(ex?.initialHour?.slice(0, 2)) || 6,
          Number(ex?.finalHour?.slice(0, 2)) || 23
        );
      } else {
        objH[ex] = [];
      }
    });
    artist?.appointments?.forEach((appointment) => {
      const dateAndTime = new Date(appointment.dateAndTime);
      const time = dateAndTime.getHours();
      const date = dateAndTime.toDateString();
      let initial = Number(
        (objH[dateAndTime.getDay()]?.at(0) || objH[date].at(0)).slice(0, 2)
      );
      let final = Number(
        (objH[dateAndTime.getDay()]?.at(-1) || objH[date].at(-1)).slice(0, 2)
      );
      objH[date] = createHourArrayWithAppointment(
        initial,
        final,
        time,
        time + appointment.duration
      );
    });
    setObjHours(objH);
  };

  const getDisabled = () => {
    let array = [];
    let numobj = {};
    artist?.timeAvailabilities?.map((av) => {
      dayData.map((da) => {
        if (da.day === av.day && av.initialHour) {
          array.push(da.number);
        }
      });
    });
    for (let num of array) {
      numobj[num] = true;
    }
    setObj(numobj);
  };

  const filterAvailableTimes = (date, selectedDate, objHours, exception) => {
    const selectedDateString = selectedDate.toDateString();

    if (
      objHours[selectedDateString] &&
      exception.includes(selectedDateString)
    ) {
      return objHours[selectedDateString];
    }

    const selectedDay = date.getDay();
    const defaultHours = objHours[selectedDay] || [];

    const appointments = artist?.appointments || [];

    const occupiedHours = appointments.reduce((acc, appointment) => {
      const appointmentDate = new Date(appointment.dateAndTime);
      if (appointmentDate.toDateString() === selectedDateString) {
        const startHour = appointmentDate.getHours();
        const endHour = startHour + appointment.duration;
        return [...acc, ...createHourArrayWithAppointment(startHour, endHour)];
      }
      return acc;
    }, []);

    return defaultHours.filter((hour) => !occupiedHours.includes(hour));
  };

  const tileStyles = ({ date, view }) => {
    if (view === "month") {
      const selectedDateString = selectedDate.toDateString();
      if (
        date < new Date(Date.now()) ||
        !(
          obj[date.getDay()] ||
          (objHours[date.toDateString] &&
            exception.includes(date.toDateString()))
        )
      ) {
        return "text-gray-500";
      }
      if (
        date.toDateString() === selectedDateString &&
        (objHours[selectedDateString] || objHours[date.getDay()])
      ) {
        return "bg-green-600 text-black";
      }
    }

    if (view === "year") {
      if (date.getMonth() === new Date(Date.now()).getMonth()) {
        return "text-white";
      } else if (date.valueOf() < new Date(Date.now()).valueOf()) {
        return "text-gray-500";
      }
    }

    if (view === "decade") {
      if (date.getFullYear() === new Date(Date.now()).getFullYear()) {
        return "text-white";
      } else if (date.valueOf() < new Date(Date.now()).valueOf()) {
        return "text-gray-500";
      }
    }

    return "text-white";
  };

  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      const selectedDateString = selectedDate.toDateString();
      return !(
        obj[date.getDay()] ||
        (objHours[date.toDateString] && exception.includes(date.toDateString()))
      );
    }
  };

  const changeDate = (form, date) => {
    setSelectedTime("");
    setShowTime(true);
    setSelectedDate(date);
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    selectedTime &&
      form.setFieldValue(
        "dateAndTime",
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          selectedTime
        )
      );
  };

  const handleTime = (form, event) => {
    setSelectedTime(event.target.value.split("h")[0]);
    form.setFieldValue(
      "dateAndTime",
      new Date(year, month, day, event.target.value.split("h")[0])
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="w-full p-4 shadow-lg flex justify-center">
        <div className="p-4 rounded border-primary border-[2px] shadow-lg">
          {sent ? (
            <h1>

             Redireccionando a Mercado Pago para completar la reserva


            </h1>
          ) : (
            <Formik
              initialValues={{
                size: "",
                image: null,
                bodyPlace: "",
                description: "",
                dateAndTime: "",
                duration: "",
                possible: true,
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  if (values.image && typeof values.image === "object") {
                    const imageUrl = await uploadImage(values.image);
                    values.image = imageUrl;
                  }

                  const createResponse = await axios.post(
                    `${URL_BASE}/appointments`,
                    { ...values, tattooArtistId: id, customerId: user.id }
                  );

                  const createdAppointment = createResponse.data.data;

                  const paymentMp = await axios.post(`${URL_BASE}/payment`, {
                    id: createdAppointment.id,
                    description: createdAppointment.description,
                    depositPrice: createdAppointment.depositPrice,
                  });

                  const paymentMpResponse = paymentMp.data;

                  if (paymentMpResponse) {
                    setTimeout(() => {
                      window.location.href = paymentMpResponse.init_point;
                    }, 3000);
                  }
                  setSent(true);
                } catch (error) {
                  throw Error("Error en el formulario");
                }
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, isValid, dirty, setFieldValue, values }) => (
                <Form className="flex flex-col shadow-lg p-5 max-w-xl mx-auto">
                  {console.log(values)}
                  <div className="info-artist mb-4">
                    <div className="p-2 m-2">
                      <label htmlFor="size">Selecciona una opción:</label>
                      <Field as="select" name="size">
                        <option value="" disabled>
                          Selecciona una opcion
                        </option>
                        <option value="Pequeño">Pequeño</option>
                        <option value="Pequeño a color">Pequeño a color</option>
                        <option value="Mediano">Mediano</option>
                        <option value="Mediano a color">Mediano a color</option>
                        <option value="Grande">Grande</option>
                        <option value="Grande a color">Grande a color</option>
                      </Field>
                      {objHours[selectedDate.getDay()] &&
                        values.size &&
                        (values.possible = isPossible(
                          Number(durations[values.size]),
                          Number(selectedTime),
                          Number(
                            objHours[selectedDate.getDay()].at(-1).split("h")[0]
                          ) + 1
                        ))}
                      <ErrorMessage
                        name="fullName"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <Field
                      type="text"
                      name="bodyPlace"
                      placeholder="Lugar del cuerpo"
                      className="p-2 mb-3 shadow-md block w-full"
                    />
                    <ErrorMessage
                      name="bodyPlace"
                      component="div"
                      className="text-red-500 text-sm"
                    />

                    <Field name="dateAndTime">
                      {({ field, form }) => (
                        <div>
                          <Calendar
                            {...field}
                            defaultValue={null}
                            locale="es"
                            tileClassName={tileStyles}
                            tileDisabled={tileDisabled}
                            onChange={(date) => changeDate(form, date)}
                            minDate={new Date(Date.now())}
                          />
                          <div className="text-black">
                            {showTime && (
                              <div className="text-gray-300">
                                <p>Horario del comienzo del turno</p>
                                <select
                                  name="dateTime"
                                  value={selectedTime}
                                  onChange={(event) => handleTime(form, event)}
                                >
                                  <option name="dateTime" value="" disabled>
                                    Seleccionar horario inicial
                                  </option>
                                  {(
                                    objHours[selectedDate.toDateString()] ||
                                    objHours[selectedDate.getDay()]
                                  )?.map((hour) => {
                                    return (
                                      <option key={hour} name="dateTime">
                                        {hour}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            )}
                            {values.duration && values.dateAndTime && <p></p>}
                          </div>
                        </div>
                      )}
                    </Field>

                    <Field
                      type="text"
                      name="description"
                      placeholder="Descripcion y explicacion del tatuaje a realizar"
                      className="p-2 mb-3 shadow-md block w-full"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                    <label>Fecha Seleccionada:</label>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="image" className="font-bold">
                      Imagen de perfil
                    </label>
                    <input
                      type="file"
                      name="image"
                      onChange={(event) => {
                        setFieldValue("image", event.currentTarget.files[0]);
                      }}
                      className="p-2 mb-3 shadow-md block w-full"
                    />
                    {values.image && (
                      <button
                        type="button"
                        onClick={() => setFieldValue("image", null)}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        Delete Image
                      </button>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={
                      isSubmitting || !isValid || !dirty || !values.possible
                    }
                  >
                    Reservar turno
                  </button>
                  {!values.possible && (
                    <div>
                      <p>
                        El horario es muy tarde para un tatuaje tan grande, por
                        favor selecciona un horario anterior o cambia de fecha
                        para buscar un dia con mayor disponibilidad
                      </p>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
