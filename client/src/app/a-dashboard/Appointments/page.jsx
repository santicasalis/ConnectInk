"use client"
import React from 'react';
import axios from 'axios';
import ArtistBookingCard from "../../../components/ArtistBookingCard/ArtistBookingCard";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


export default function Appointments() {

  const user = useSelector((state)=>state.user.logedInUser)
  const appointment = user.appointments
  const dispatch = useDispatch()

  useEffect(()=>{

    

  },[user])

  

  


  

  console.log(user, "holaaa")
 


     return (
      <div className=''>
        {appointment && appointment.length > 0 ? (
          appointment.map((tur) => (
            <div className='mt-[50px]'>
              <ArtistBookingCard 
               bodyPlace={tur.bodyPlace}
               description={tur.description}
               duration={tur.duration}
               image={tur.image}
               size={tur.size}
               dateAndTime={tur.dateAndTime}
               depositPrice={tur.depositPrice}
               CustomerId={tur.CustomerId}
                />
            </div>
          ))
        ) : (
          <p>No tienes ninguna reserva aún.</p>
        )}
      </div>
    );
  }