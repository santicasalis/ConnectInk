"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineCreditCardOff } from "react-icons/md";
import Link from "next/link";
import axios from "axios";

export default function Reservas({params}) {

  const {id} = params
  const [customer, setCustomer] = useState({})
  const [appointment, setAppointment] = useState({})
  const [tattooArtist, setTattooArtist] = useState({})
  const urlBase = "http://localhost:3001"

  const getData = async () => {
    const appointmentResult = (await axios(`${urlBase}/appointments/${id}`)).data
    setAppointment(appointmentResult)
    setCustomer((await axios(`${urlBase}/customers/${appointmentResult.Customer_Appointment}`)).data)
    setTattooArtist((await axios(`${urlBase}/tattooArtists/${appointmentResult.TattooArtist_Appointment}`)).data)
  } 

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if(tattooArtist.id){
      const year = new Date(appointment.dateAndTime).getFullYear()
      const month = new Date(appointment.dateAndTime).getMonth() + 1
      const day = new Date(appointment.dateAndTime).getDate()
      const hour = new Date(appointment.dateAndTime).getHours()

      const dateData = `${day}/${month}/${year} a las ${hour} horas`
      const data = {
          dateData,
          customerName: customer.fullName,
          customerEmail: customer.email,
          artistName: tattooArtist.fullName,
          artistEmail: tattooArtist.email,
      }

      if(appointment.paymentStatus == "rejected" || !appointment.paymentStatus){
        axios.post(`${urlBase}/nodemailer/rejectDate`, data)
      } else if(appointment.paymentStatus == "approved" || appointment.paymentStatus == "in_process"){
        axios.post(`${urlBase}/nodemailer/confirmDate`, data)
      }
    }
  }, [tattooArtist])

  return (
    <div className="bg-secondary-900 w-[50%] h-[20%] rounded ">
      <div className="flex item-center justify-center mt-8 gap-x-3">
      <MdOutlineCreditCardOff className="text-primary text-[30px]"/>
          <h1 className="text-[25px] text-artistfont">RESULTADO DE LA TRANSACCION</h1>
      </div>
      <div>
        {appointment.id &&
        (appointment.paymentStatus == "rejected" || !appointment.paymentStatus) ? (
          <p className="text-center mt-6 text-[14px] text-artistfont">La transaccion no pudo ser procesada. Por favor, vuelve a realizar el turno y cambia el metodo de pago</p>
        ) : (
          <p className="text-center mt-6 text-[14px] text-artistfont">Tu transaccion fue realizada con exito, y tu turno se ha registrado</p>
        )

        }
      </div>

      <div className="flex item-center justify-center mt-6 ">
              <Link href="/user-dashboard">
                <button className="border-[1px] w-[150px] hover:border-primary  border-primary/50 rounded text-artistfont ">Volver al inicio</button>
              </Link>
      </div>
            
      <Link href="/user-dashboard/reservas">
        <span>Ver mis turnos</span>
      </Link>
    </div>
  );
}
