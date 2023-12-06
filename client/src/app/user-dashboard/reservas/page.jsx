"use client"
import React from 'react';
import axios from 'axios';
import BookingCard from '@/components/bookingCard/BookingCard';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


export default function Reservas() {

  const user = useSelector((state)=>state.user.logedInUser)
    
  const appointment = user.appointments

  return (
    
      <div className=''>
        {/* {appointment && appointment.length > 0 ? (
          appointment.map((appointmentData, index) => (
            <div key={index} className='mt-[50px]'>
              <BookingCard bodyPlace={appointmentData.bodyPlace} />
            </div>
          ))
        ) : (
          <p>No tienes ninguna reserva aún.</p>
        )} */}
      </div>
      
    );
  }
