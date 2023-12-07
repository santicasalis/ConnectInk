"use client"
import React from 'react';
import axios from 'axios';
import BookingCard from '@/components/bookingCard/BookingCard';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


export default function Reservas() {

  const user = useSelector((state)=>state.user.logedInUser)
    
  const appointment = user.appointments

  

  console.log(user, "holaaa")
 


     return (
      <div className=''>
        {appointment && appointment.length > 0 ? (
          appointment.map((tur) => (
            <div className='mt-[50px]'>
              <BookingCard 
               bodyPlace={tur.bodyPlace}
               description={tur.description}
               duration={tur.duration}
               image={tur.image}
               size={tur.size}
               dateAndTime={tur.dateAndTime}
               depositPrice={tur.depositPrice}
               tattooArtistId={tur.tattooArtistId}
                />
            </div>
          ))
        ) : (
          <p>No tienes ninguna reserva aún.</p>
        )}
      </div>
    );
  }