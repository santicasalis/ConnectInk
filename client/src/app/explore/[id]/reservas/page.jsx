"use client";

//  import { useEffect, useState } from "react";
//  import axios from "axios";
//  import Calendar from "react-calendar";
//  import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
//  import { uploadImage } from "@/app/utils/uploadImage";
//  import { validationSchema } from "./validationSchema";
//  import { toast } from "react-toastify";
//  import { dayData } from "../../../utils/data/dayData";
//  import { useDispatch, useSelector } from "react-redux";
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
import { uploadImage } from "../../../../app/utils/uploadImage";

import { validationSchema } from "./validationSchema";
import { toast } from "react-toastify";
import { dayData } from "../../../utils/data/dayData";
import { useDispatch, useSelector } from "react-redux";

import { getArtistDetail } from "../../../../app/redux/features/artists/artistActions";
import Nav from "../../../../components/nav/Nav";
import { array } from "yup";
import { useRouter } from "next/navigation";
import { MdFileUpload } from "react-icons/md";

const URL_BASE = "http://localhost:3001";

const BookAppointment = ({ params }) => {
  const { id } = params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [showTime, setShowTime] = useState(false);
  const [daysWithHours, setDaysWithHours] = useState({});
  const [exception, setException] = useState([]);
  const artist = useSelector((state) => state.artists.detail);
  const user = useSelector((state) => state.user.logedInUser);
  const [sent, setSent] = useState(false);
  const router = useRouter();

  console.log("ESTE ES EL DAYSWITHHOURS", daysWithHours);

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
    const exceptions = timeAvailabilityExceptions?.map((exception) => {
      const [year, month, day] = exception.date.split("-");
      return new Date(year, month - 1, day).toDateString();
    });
    let obj = {};

    const allAvailabilities = timeAvailabilities
      ?.filter((availabilty) => availabilty.initialHour)
      ?.map((availabilty) => {
        return {
          day: availabilty.day,
          initialHour: Number(availabilty.initialHour.split(":")[0]),
          finalHour: Number(availabilty.finalHour.split(":")[0]),
          secondInitialHour:
            Number(availabilty.secondInitialHour?.split(":")[0]) || null,
          secondFinalHour:
            Number(availabilty.secondFinalHour?.split(":")[0]) || null,
        };
      });

    timeAvailabilityExceptions?.map((exception) => {
      let hours = [];
      if (exception.initialHour) {
        for (
          let i = Number(exception.initialHour.split(":")[0]);
          i <= Number(exception.finalHour.split(":")[0]);
          i++
        ) {
          hours.push(i);
        }
        if (exception.secondInitialHour) {
          for (
            let i = exception.secondInitialHour.split(":")[0];
            i <= exception.secondFinalHour.split(":")[0];
            i++
          ) {
            hours.push(i);
          }
        }
      }
      const [year, month, day] = exception.date.split("-");
      obj[new Date(year, month - 1, day).toDateString()] = hours;
    });

    appointments?.map((appointment) => {
      const date = new Date(appointment.dateAndTime);
      const day = dayData[date.getDay()].day;
      const time = date.getHours();
      let hours = [];

      if (exceptions.includes(date.toDateString())) {
        timeAvailabilityExceptions.map((exception) => {
          const [year, month, day] = exception.date.split("-");
          if (
            new Date(year, month - 1, day).toDateString() == date.toDateString()
          ) {
            for (
              let i = Number(exception.initialHour.split(":")[0]);
              i <= Number(exception.finalHour.split(":")[0]);
              i++
            ) {
              if (!(i >= time && i < time + appointment.duration)) {
                hours.push(i);
              }
            }
            if (exception.secondInitialHour && exception.secondFinalHour) {
              for (
                let i = Number(exception.secondInitialHour.split(":")[0]);
                i <= Number(exception.secondFinalHour.split(":")[0]);
                i++
              ) {
                if (!(i >= time && i < time + appointment.duration)) {
                  hours.push(i);
                }
              }
            }
          }
        });
      } else {
        allAvailabilities.map((availability) => {
          if (availability.day == day) {
            for (
              let i = availability.initialHour;
              i <= availability.finalHour;
              i++
            ) {
              if (!(i >= time && i < time + appointment.duration)) {
                hours.push(i);
              }
            }
            if (
              availability.secondInitialHour &&
              availability.secondFinalHour
            ) {
              for (
                let i = availability.secondInitialHour;
                i <= availability.secondFinalHour;
                i++
              ) {
                if (!(i >= time && i < time + appointment.duration)) {
                  hours.push(i);
                }
              }
            }
          }
        });
      }

      if (obj[date.toDateString()]) {
        obj[date.toDateString()] = obj[date.toDateString()].filter((hour) =>
          hours.includes(hour)
        );
      } else {
        obj[date.toDateString()] = hours;
      }
    });

    allAvailabilities?.map((availability) => {
      let hours = [];
      if (availability.initialHour) {
        for (
          let i = availability.initialHour;
          i <= availability.finalHour;
          i++
        ) {
          hours.push(i);
        }
      }
      if (availability.secondInitialHour && availability.secondFinalHour) {
        for (
          let i = availability.secondInitialHour;
          i <= availability.secondFinalHour;
          i++
        ) {
          hours.push(i);
        }
      }
      obj[availability.day] = hours;
    });

    setDaysWithHours(obj);
  };

  const changeDate = (form, date) => {
    setSelectedTime("");
    setShowTime(true);
    setSelectedDate(date);
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
    setSelectedTime(event.target.value);
    form.setFieldValue(
      "dateAndTime",
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        event.target.value
      )
    );
  };

  useEffect(() => {
    if (!user.userType) {
      router.replace("/auth");
    }
    if (user.userType) {
      if (user.userType == "admin") router.replace("/admin-dashboard/home");
    }
    dispatch(getArtistDetail(id));
  }, []);

  useEffect(() => {
    filterAvailabilties();
  }, [artist]);

  const tileStyles = ({ date, view }) => {
    if (view == "month") {
      if (
        date < new Date(Date.now()) ||
        !(
          daysWithHours[dayData[date.getDay()].day] ||
          daysWithHours[date.toDateString()]
        )
      ) {
        return "text-gray-500";
      }
      if (
        date.toDateString() === selectedDate.toDateString() &&
        (daysWithHours[dayData[selectedDate.getDay()].day] ||
          daysWithHours[selectedDate.toDateString()])
      ) {
        return "bg-green-600	text-black";
      }
    }

    if (view == "year") {
      if (date.getMonth() == new Date(Date.now()).getMonth()) {
        return "text-white";
      } else if (date.valueOf() < new Date(Date.now()).valueOf()) {
        return "text-gray-500";
      }
    }

    if (view == "decade") {
      if (date.getFullYear() == new Date(Date.now()).getFullYear()) {
        return "text-white";
      } else if (date.valueOf() < new Date(Date.now()).valueOf()) {
        return "text-gray-500";
      }
    }

    return "text-white";
  };
  const tileDisabled = ({ activeStartDate, date, view }) => {
    if (view == "month")
      return !(
        daysWithHours[dayData[date.getDay()].day] ||
        daysWithHours[date.toDateString()]
      );
  };

  return (
    <div className=" w-full bg-secondary-900  ">
      <Nav />

      <div className="w-full p-4 flex justify-center ">
        <div className=" rounded-xl  border-primary border-[1px] shadow-lg shadow-primary overflow-hidden">
          {sent ? (
            <h1>Redireccionando a Mercado Pago para completar la reserva</h1>
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

                  const paymentMp = await axios.post(`${URL_BASE}/payments`, {
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
                <Form className="flex flex-col  shadow-2xl p-5 max-w-xl mx-auto ">
                  <div className="info-artist mb-4">
                    <div className="p-2 m-2">
                      <label className="font-rocksalt text-lg" htmlFor="size">
                        Selecciona una opción:
                      </label>
                      <Field
                        as="select"
                        name="size"
                        className=" text-white  bg-secondary-100 text-[15px] ml-4 rounded-md p-2"
                      >
                        <option value="" disabled>
                          Selecciona una opcion
                        </option>

                        <option className="text-white " value="Pequeño">
                          Pequeño
                        </option>
                        <option className="text-white" value="Pequeño a color">
                          Pequeño a color
                        </option>
                        <option className="text-white" value="Mediano">
                          Mediano
                        </option>
                        <option className="text-white" value="Mediano a color">
                          Mediano a color
                        </option>
                        <option className="text-white" value="Grande">
                          Grande
                        </option>
                        <option className="text-white" value="Grande a color">
                          Grande a color
                        </option>
                      </Field>
                      <ErrorMessage
                        name="size"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <label className="font-rocksalt text-xs">
                      {" "}
                      Lugar del cuerpo:
                    </label>
                    <Field
                      type="text"
                      name="bodyPlace"
                      //  placeholder="Lugar del cuerpo"
                      className="p-2 mb-3 shadow-md block w-50  text-white  bg-secondary-100 rounded-md "
                    />
                    <ErrorMessage
                      name="bodyPlace"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                    <label className="font-rocksalt text-xs">
                      {" "}
                      Descripción:{" "}
                    </label>
                    <p className="text-[9px]">
                      {" "}
                      *Describa en el mayor detalle posible el tatuaje a
                      realizar
                    </p>
                    <Field
                      type="text"
                      name="description"
                      //  placeholder="Descripcion y explicacion del tatuaje a realizar"
                      className="p-2 mb-3 shadow-md block w-full rounded-md text-white  bg-secondary-100"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                    <label>Fecha Seleccionada:</label>
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
                              <div className="text-gray-300 font-rocksalt text-sm mt-8 ">
                                <p>Horario del comienzo del turno:</p>
                                <select
                                  name="dateTime"
                                  value={selectedTime}
                                  onChange={(event) => handleTime(form, event)}
                                  className="text-secondary-900 text-[10px] rounded-md w-[50px] mt-2"
                                >
                                  <option
                                    name="dateTime"
                                    value=""
                                    disabled
                                  ></option>
                                  {(
                                    daysWithHours[
                                      selectedDate.toDateString()
                                    ] ||
                                    daysWithHours[
                                      dayData[selectedDate.getDay()].day
                                    ]
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
                          </div>
                        </div>
                      )}
                    </Field>
                    <ErrorMessage name="selectedDate" component="div" />
                  </div>
                  <div className="mb-4 flex flex-col">
                    <label htmlFor="image" className="font-rocksalt">
                      Imagen de referencia:
                    </label>
                    <label
                      className="border-[1px] p-2 w-[97px]  text-[15px] cursor-pointer mt-3 rounded-md flex items-center hover:bg-primary/30 hover:font-bold"
                      htmlFor="imagenReferencia"
                    >
                      <MdFileUpload className="mr-2 " />
                      Cargar
                    </label>
                    <input
                      type="file"
                      name="image"
                      id="imagenReferencia"
                      onChange={(event) => {
                        setFieldValue("image", event.currentTarget.files[0]);
                      }}
                      className="hidden "
                    />
                    {values.image && (
                      <button
                        type="button"
                        onClick={() => setFieldValue("image", null)}
                        className="bg-red-500 text-white p-2 rounded w-[20%] text-[15px] mt-3 "
                      >
                        Delete Image
                      </button>
                    )}
                  </div>
                  <div className="flex justify-center items-center ">
                    <button
                      type="submit"
                      disabled={
                        isSubmitting || !isValid || !dirty || !values.possible
                      }
                      className=" border-[1px] w-[35%] text-lg p-2 rounded-md hover:bg-primary/80 hover:font-bold disabled:bg-transparent"
                    >
                      Reservar turno
                    </button>
                  </div>
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
