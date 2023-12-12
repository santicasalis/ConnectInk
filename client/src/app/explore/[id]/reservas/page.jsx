"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import styled from "styled-components";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { uploadImage } from "../../../../app/utils/uploadImage";
//import { SiMercadopago } from "react-icons/si";
import { validationSchema } from "./validationSchema";
import { toast } from "react-toastify";
import { dayData } from "../../../utils/data/dayData";
import { useDispatch, useSelector } from "react-redux";

import { getArtistDetail } from "../../../../app/redux/features/artists/artistActions";
import Nav from "../../../../components/nav/Nav";
import { array } from "yup";
import { useRouter } from "next/navigation";
import { MdFileUpload } from "react-icons/md";
import { notifyError } from "../../../../components/notifyError/NotifyError";

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
    selectedTime ?
      form.setFieldValue(
        "dateAndTime",
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          selectedTime
        )
      ) : 
      form.setFieldValue(
        "dateAndTime",
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
        )
      )
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

  const tileStyles = ({date, view}) => {
    if(view == "month"){
      if(new Date(date).toDateString() == new Date(selectedDate).toDateString()){
        return "bg-neutral-900"
      }
    }
  }

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

      <div className="w-full p-4 flex justify-center  text-artistfont">
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

                  try{
                    const createResponse = await axios.post(
                      `${URL_BASE}/appointments`,
                      { ...values, tattooArtistId: id, customerId: user.id }
                    );
                    const createdAppointment = createResponse.data.data;

                    try{
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
                    } catch (error){
                      console.log(error)
                    }
                  } catch (error){
                    console.log(error)
                  }




                } catch (error) {
                  console.log(error)
                  notifyError("Error en el formulario", error);
                  throw Error("Error en el formulario");
                }
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, isValid, dirty, setFieldValue, values }) => (
                <Form className="flex flex-col  shadow-2xl p-5 max-w-xl mx-auto ">
                  <div className="info-artist mb-4">
                    <div className="p-2 m-2">
                      <label
                        className="font-rocksalt text-lg text-artistfont"
                        htmlFor="size"
                      >
                        Selecciona una opción:
                      </label>
                      <Field
                        as="select"
                        name="size"
                        className=" text-artistfont  bg-secondary-100 text-[15px] ml-4 rounded-md p-2"
                      >
                        <option value="" disabled>
                          Selecciona una opcion
                        </option>

                        <option className="text-artistfont" value="Pequeño">
                          Pequeño
                        </option>
                        <option
                          className="text-artistfont"
                          value="Pequeño a color"
                        >
                          Pequeño a color
                        </option>
                        <option className="text-artistfont" value="Mediano">
                          Mediano
                        </option>
                        <option
                          className="text-artistfont"
                          value="Mediano a color"
                        >
                          Mediano a color
                        </option>
                        <option className="text-artistfont" value="Grande">
                          Grande
                        </option>
                        <option
                          className="text-artistfonte"
                          value="Grande a color"
                        >
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
                          <CalendarContainer>
                            <Calendar
                              {...field}
                              defaultValue={null}
                              locale="es"
                              tileDisabled={tileDisabled}
                              //tileClassName={tileStyles}
                              onChange={(date) => changeDate(form, date)}
                              minDate={new Date(Date.now())}
                            />
                          </CalendarContainer>
                          <div className="text-black">
                            {showTime && (
                              <div className="text-artistfont font-rocksalt text-sm mt-8  ">
                                <p>Horario del comienzo del turno:</p>
                                <select
                                  name="dateTime"
                                  value={selectedTime}
                                  onChange={(event) => handleTime(form, event)}
                                  className="text-white bg-secondary-100 text-[10px] rounded-md w-[50px] mt-2"
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
                      Abonar seña
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

const CalendarContainer = styled.div`
  .react-calendar {
    max-width: 100%;
    line-height: 1.125em;
    font: inherit;
  }

  .react-calendar--doubleView {
    width: 700px;
  }

  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }

  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }

  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .react-calendar button {
    margin: 0;
    border: 0;
    border: solid 1px rgb(30, 30, 30);
  }

  .react-calendar button:enabled:hover {
    cursor: pointer;
  }

  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }

  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    text-transform: uppercase;
  }

  .react-calendar__navigation button:disabled {
    background-color: rgb(20, 20, 20);
  }

  .react-calendar__navigation button:enabled:hover {
    background-color: rgb(40, 40, 40);
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }

  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
    text-transform: uppercase;
  }

  .react-calendar__tile {
    max-width: 100%;
    padding: 10px 6.6667px;
    text-align: center;
    line-height: 16px;
    font: inherit;
    font-size: 0.833em;
  }

  .react-calendar__tile:disabled {
    background-color: rgb(50, 50, 50);
    color: rgb(100, 100, 100);
  }

  .react-calendar__tile:enabled:hover {
    background-color: rgb(30, 30, 30);
  }
  .react-calendar__tile:enabled:focus{
    background-color: rgb(80, 80, 80);
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background-color: rgb(46, 46, 46);
  }

  .react-calendar__tile--active {
    background-color: rgb(80, 80, 80);
  }

  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: rgb(36, 36, 36);
  }

  
`;
