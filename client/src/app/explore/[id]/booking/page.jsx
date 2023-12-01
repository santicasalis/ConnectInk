'use client'

import { useEffect, useState } from "react";
import axios from "axios"
import Calendar from "react-calendar"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { uploadImage } from "@/app/utils/uploadImage";
import { validationSchema } from "./validationSchema";
import { toast } from "react-toastify";
import {dayData} from "../../../utils/data/dayData"

const URL_BASE = "http://localhost:3001"


const bookAppointment = ({params}) => {

  const {id} = params
  const [availability, setAvailability] = useState(null)
  const [exceptions, setExceptions] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [showTime, setShowTime] = useState(false)

  const tileStyles = ({date, view}) => {

    if (date.toDateString() === selectedDate.toDateString()) {
      return "bg-green-600	text-black"
    }

    if (date < new Date(Date.now())) {
      return "text-gray-500"
    }

    return ''
  }

  const getAvailability = async() => {
    return (await axios(`${URL_BASE}/timeAvailabilities/${id}`)).data
  }

  const getExceptions = async() => {
    return (await axios(`${URL_BASE}/timeAvailabilityExceptions/${id}`)).data
  }

  useEffect(() => {
    getAvailability().then((data) => setAvailability(data))
    getExceptions().then((data) => setExceptions(data))
  }, [])

  const changeDate = (form, date) => {
    setShowTime(true)
    setSelectedDate(date)
    setDay(date.getDate())
    setMonth(date.getMonth())
    setYear(date.getFullYear())
    showTime && form.setFieldValue("dateAndTime", new Date(date.getFullYear(), date.getMonth(), date.getDate(), selectedTime))
  }

  const handleTime = (form, event) => {
    setSelectedTime(event.target.value)
    form.setFieldValue("dateAndTime", new Date(year, month, day, event.target.value))
  }


  const reservarTurno = async() => {
    const date = new Date(year, month, day, horarioSeleccionado)

    const response = await axios.post(`${URL_BASE}/appointments`, {dateAndTime: date})
    console.log(response)

  }

  return (
    <div className="w-full md:w-2/3 p-4 shadow-lg">
      <div className="p-4 rounded border-primary border-[2px] shadow-lg">
        <Formik
          initialValues={{
            size: "",
            image: null,
            bodyPlace: "",
            description: "",
            dateAndTime: ""
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, {setSubmitting}) => {
            try{
              if(values.image && typeof values.image === "object"){
                const imageUrl = await uploadImage(values.image);
                values.image = imageUrl;
              }
              const response = await axios.post(`${URL_BASE}/appointments`, values)
              console.log(response)
            } catch(error) {
              throw Error("Error en el formulario")
            }
            setSubmitting(false)
          }}
        >
        {({ isSubmitting, isValid, dirty, setFieldValue, values }) => (
          <Form className="flex flex-col shadow-lg p-5 max-w-xl mx-auto">
            <div className="info-artist mb-4">
              <label htmlFor="size" >Selecciona una opción:</label>
              <Field as="select" name="size">
                <option value="" disabled>Selecciona una opcion</option>
                <option value="pequeño">Pequeño</option>
                <option value="pequeño a color">Pequeño a color</option>
                <option value="mediano">Mediano</option>
                <option value="mediano a color">Mediano a color</option>
                <option value="grande">Grande</option>
                <option value="grande a color">Grande a color</option>
              </Field>
              <ErrorMessage
                name="fullName"
                component="div"
                className="text-red-500 text-sm"
              />

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
              <Field name="dateAndTime">
                {({ field, form }) => (
                  <div>
                    <Calendar
                      {...field}
                      locale="es"
                      value={selectedDate}
                      tileClassName={tileStyles}
                      onChange={(date) => changeDate(form, date)}
                      minDate={new Date(Date.now())}
                    />
                    <div className="text-black">
                      {showTime && 
                      <select name="dateTime" defaultValue="" onChange={(event) => handleTime(form, event)}>
                        <option name="dateTime" value="" disabled>Selecciona un horario</option>
                        <option name="dateTime" value="11">11</option>
                        <option name="dateTime" value="13">13</option>
                        <option name="dateTime" value="15">15</option>
                        <option name="dateTime" value="17">17</option>
                      </select>}
                    </div>
                  </div>
                )}
              </Field>
              <ErrorMessage name="selectedDate" component="div" />
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
            <div>
              {console.log(availability, "availability")}
              {console.log(exceptions, "exceptions")}
              {console.log(values, "values")}
            </div>
          </Form>
        )}
        </Formik>
      </div>
      <button onClick={reservarTurno}>Reservar turno</button>
    </div>
  );
}

export default bookAppointment