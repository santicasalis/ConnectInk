'use client'

import { useEffect, useState } from "react";
import axios from "axios"
import Calendar from "react-calendar"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { uploadImage } from "@/app/utils/uploadImage";
import { validationSchema } from "./validationSchema";
import { toast } from "react-toastify";
import {dayData} from "../../../utils/data/dayData"
import { useDispatch, useSelector } from "react-redux";
import { getArtistDetail } from "@/app/redux/features/artists/artistActions";
import Nav from "@/components/nav/Nav";

const URL_BASE = "http://localhost:3001"


const bookAppointment = ({params}) => {

  const {id} = params
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [showTime, setShowTime] = useState(false)
  const [obj, setObj] = useState({})
  const [objHours, setObjHours] = useState({})
  const [exception, setException] = useState([])
  const artist = useSelector((state) => state.artists.detail)
  const user = useSelector((state) => state.user.logedInUser)

  const dispatch = useDispatch()

  const durations = {
    pequeño: 1,
    "pequeño a color": 1,
    "mediano a color": 2,
    mediano: 2,
    grande: 3,
    "grande a color": 3,
  }

  useEffect(() => {
    let array = []
    if(artist?.timeAvailabilities?.length){
      getDisabled()
      getHours()
    }
    artist?.timeAvailabilityExceptions?.map((e) =>{
      const [exY, exM, exD] = e.date.split("-")
      const date = new Date(exY, exM, exD)
      array.push(date.toDateString())
    })
    setException(array)
  }, [artist.timeAvailabilities])

  useEffect(() => {
    dispatch(getArtistDetail(id))
  }, [])


  function createHourArray(initialTime, FinalTime) {
    let resultado = [];
    for (let i = initialTime; i < FinalTime; i++) {
      resultado.push(i);
    }
    return resultado;
  }

  function createHourArrayWithAppointment(initialTime, FinalTime, initialTimeApp, FinalTimeApp) {
    let resultado = [];
    for (let i = initialTime; i <= FinalTime; i++) {
      if(i >= initialTimeApp && i <= FinalTimeApp) continue
      resultado.push(i);
    }
    return resultado;
  }


  const getHours = () => {
    let objH = {}
    artist?.timeAvailabilities?.forEach((av) => {
      dayData.map((da) => {
        if(da.day === av.day){
          objH[da.number] = createHourArray(Number(av.initialHour.slice(0, 2)), Number(av.finalHour.slice(0, 2)))
        }
      })
    })
    exception?.forEach((ex) => {
      objH[ex] = createHourArray(Number(ex?.initialHour?.slice(0, 2)) || 6, Number(ex?.finalHour?.slice(0, 2)) || 23)
    })
    artist?.appointments?.forEach((appointment) => {
      const [date, time] = appointment.dateAndTime.split("T")
      const appointmentTime = Number(time.slice(0, 2))
      const [ye, mo, da] = date.split("-")
      const appointmentDate = new Date(ye, mo, da)
      let initial = objH[appointmentDate.getDay()]?.at(0) || objH[appointmentDate?.toDateString().at(0)]
      let final = objH[appointmentDate.getDay()]?.at(-1) || objH[appointmentDate?.toDateString().at(-1)]
      objH[appointmentDate.toDateString()] = createHourArrayWithAppointment(initial, final, appointmentTime, appointmentTime + appointment.duration)
    })
    setObjHours(objH)
  }

  const getDisabled = () => {
    let array = []
    let numobj = {}
    artist?.timeAvailabilities?.map((av) => {
      dayData.map((da) => {
        if(da.day === av.day){
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

    if(view == "month"){
      
      if (date < new Date(Date.now()) || !(obj[date.getDay()] || exception.includes(date.toDateString()))) {
        return "text-gray-500"
      }
      if (date.toDateString() === selectedDate.toDateString() && (objHours[selectedDate.getDay()] || objHours[selectedDate.toDateString()])) {
        return "bg-green-600	text-black"
      }
    }

    if(view == "year"){
      if(date.getMonth() == (new Date(Date.now())).getMonth()){
       return  "text-white"
      } else if(date.valueOf() < (new Date(Date.now())).valueOf()){
        return "text-gray-500"
      }
    }

    if(view == "decade"){
      if(date.getFullYear() == (new Date(Date.now())).getFullYear()){
       return  "text-white"
      } else if(date.valueOf() < (new Date(Date.now())).valueOf()){
        return "text-gray-500"
      }
    }


    return 'text-white'
  }

  const isPossible = (duration, start, finish) => {
    return duration + start <= finish
  }

  const tileDisabled = ({ activeStartDate, date, view }) => {
    if(view == "month") return (!(obj[date.getDay()] || exception.includes(date.toDateString())))
    // if(view == "year") return !(date.valueOf() >= (new Date(Date.now())).valueOf())
  }

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

  return (
    <div className="container mx-auto p-4">
      <Nav />

      <div className="w-full  p-4 shadow-lg flex justify-center">
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
                const response = await axios.post(`${URL_BASE}/appointments`, {...values, tattooArtistId: id, customerId: user.id})
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
                <div className="p-2 m-2">
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
                        tileClassName={tileStyles}
                        tileDisabled={tileDisabled}
                        onChange={(date) => changeDate(form, date)}
                        minDate={new Date(Date.now())}
                      />
                      <div className="text-black">
                        {showTime && 
                        <select name="dateTime" value={selectedTime} onChange={(event) => handleTime(form, event)}>
                          <option name="dateTime" value="" disabled>Seleccionar horario</option>
                          {(objHours[selectedDate.toDateString()] || objHours[selectedDate.getDay()]).map((hour) => {
                            console.log(hour)
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
      </div>
    </div>
  );
}

export default bookAppointment