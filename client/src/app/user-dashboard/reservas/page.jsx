"use client"
import React from 'react';
import axios from 'axios';
//import { useState } from 'react';
//import { useEffect } from 'react';
//import { getAllAppointments } from '@/app/redux/appointments/appointmentsActions';

export default function Hola() {
  // const [appointment, setAppointment] = useState(null);
  // const [error, setError] = useState(null);

    const reservations = [
        {
          id: 1,
          dateAndTime: '15/12/23 , 16.30 hs ',
          duration: '2 hs',
        },
       
      ];

      // useEffect(() => {
      //   dispatchEvent(getAllAppointments())
    
      // }, []);


    return (
        <div className='bg-secondary-900 p-8 rounded-xl w-full'>
            <div className='flex items-center justify-between'>
        <h1 className='text-4xl text-white mb-4 font-bold '>Mis Reservas</h1>
        <button className='"hover:bg-white hover:text-primary flex items-center gap-1 border-gray-300 text-gray-300 border-[1px] px-2 py-3 rounded-md cursor-pointer' > Cancelar reserva </button>
            </div>
        <hr className='my-8 border-gray-500' />
        {/* <div className='p-4 border-2 border-primary w-1/5  text-lg text-white'>
        {appointment ? (
          <div className='mb-4'>
            <p className='font-bold'>Fecha y hora de mi turno:</p>
            <p>{appointment.dateAndTime}</p>
            <p className='font-bold'> Duración:</p>
            <p>{appointment.duration} </p>
            
          </div>
          ) : error ? (
            <p className='text-red-500'>Error al cargar la reserva.</p>
          ) : (
            <p className='text-red-500'>No has realizado ninguna reserva.</p>
          )}
        </div> */}

<div className='p-4 border-2 border-primary rounded-3xl w-1/4 text-lg text-white flex '>
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <div key={reservation.id} className='mb-4'>
              <p className='font-bold'>Fecha y hora :</p>
              <p className='mb-4' >{reservation.dateAndTime}</p>
              <p className='font-bold'>Duración:</p>
              <p>{reservation.duration}</p>
            </div>
          ))
        ) : (
          <p className='text-red-500'>No has realizado ninguna reserva.</p>
        )}
      </div>
   
      </div>
    );
  }