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
  const [availability, setAvailability] = useState([])
  const [exceptions, setExceptions] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [showTime, setShowTime] = useState(false)
  const [obj, setObj] = useState({})
  const [objHours, setObjHours] = useState({})

  const durations = {
    pequeño: 1,
    "pequeño a color": 1,
    "mediano a color": 2,
    mediano: 2,
    grande: 3,
    "grande a color": 3,
  }

  useEffect(() => {
    getDisabled()
    getHours()
  }, [availability])


  function createHourArray(initialTime, FinalTime) {
    let resultado = [];
    for (let i = initialTime; i < FinalTime; i++) {
      resultado.push(i);
    }
    return resultado;
  }


  const getHours = () => {
    let objH = {}
    availability.forEach((av) => {
      dayData.map((da) => {
        if(da.day === av.day){
          objH[da.number] = createHourArray(Number(av.initialHour.slice(0, 2)), Number(av.finalHour.slice(0, 2)))
        }
      })
    })
    setObjHours(objH)
  }

  const getDisabled = () => {
    let array = []
    let numobj = {}
    availability.map((av) => {
      dayData.map((da) => {
        if(da.day === av.day){
          console.log(da.number)
          array.push(da.number)
        }
      })
    })
    for(let num of array){
      numobj[num] = true
    }
    setObj(numobj)
  }

  const tileStyles = ({date, view}) => {

    if (date.toDateString() === selectedDate.toDateString() && objHours[selectedDate.getDay()]) {
      return "bg-green-600	text-black"
    }

    if (date < new Date(Date.now()) || !(obj[date.getDay()])) {
      return "text-gray-500"
    }

    return ''
  }

  const isPossible = (duration, start, finish) => {
    return duration + start <= finish
  }

  const tileDisabled = ({ activeStartDate, date, view }) => {
    return (!(obj[date.getDay()]))
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
    setSelectedTime("")
    setShowTime(true)
    setSelectedDate(date)
    setDay(date.getDate())
    setMonth(date.getMonth())
    setYear(date.getFullYear())
    selectedTime && form.setFieldValue("dateAndTime", new Date(date.getFullYear(), date.getMonth(), date.getDate(), selectedTime))
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
            dateAndTime: "",
            duration: "",
            possible: true
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
              
              {objHours[selectedDate.getDay()] && values.size && (values.possible = isPossible(Number(durations[values.size]), Number(selectedTime),  Number(objHours[selectedDate.getDay()].at(-1)) + 1))}
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
                      defaultValue={null}
                      locale="es"
                      // value={selectedDate}
                      tileClassName={tileStyles}
                      tileDisabled={tileDisabled}
                      onChange={(date) => changeDate(form, date)}
                      minDate={new Date(Date.now())}
                    />
                    <div className="text-black">
                      {showTime && 
                      <select name="dateTime" value={selectedTime} onChange={(event) => handleTime(form, event)}>
                        <option name="dateTime" value="" disabled>Seleccionar horario</option>
                        {objHours[selectedDate.getDay()].map((hour) => {
                          return <option key={hour} name="dateTime">{hour}</option>
                        })}
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
            <button
            type="submit"
            disabled={isSubmitting || !isValid || !dirty || !values.possible}
            >
              Reservar turno
            </button>
            {!values.possible && (
              <div>
                <p>El horario es muy tarde para un tatuaje tan grande, por favor selecciona un horario anterior o cambia de fecha para buscar un dia con mayor disponibilidad</p>
              </div>
            )}
          </Form>
        )}
        </Formik>
      </div>
      <button onClick={reservarTurno}>Reservar turno</button>
    </div>
  );
}

export default bookAppointment