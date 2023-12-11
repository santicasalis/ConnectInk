"use client"
import React from 'react';
import axios from 'axios';
import BookingCard from '../../../components/bookingCard/BookingCard';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';



export default function Reservas() {
  const user = useSelector((state) => state.user.logedInUser);
  const appointment = user.appointments;

  const router = useRouter();

  useEffect(() => {
    if (!user.userType) {
      router.replace("/auth");
    } else if (user.userType !== "customer") {
      router.replace("/");
    }
  }, []);

  return (
    
      <div className=''>
        {appointment && appointment.length > 0 ? (
          [...user.appointments].sort((a, b) => new Date(a.dateAndTime) - new Date(b.dateAndTime)).map((tur) => (
            <div key={tur.id} className='mt-[50px]'>
              <BookingCard 
              id={tur.id}
               bodyPlace={tur.bodyPlace}
               description={tur.description}
               duration={tur.duration}
               image={tur.image}
               size={tur.size}
               dateAndTime={tur.dateAndTime}
               depositPrice={tur.depositPrice}
               tattooArtistId={tur.tattooArtistId}
               paymentId={!!tur.paymentId}
                />
            </div>
          ))
      ) : (
        <p className='text-artistfont'>No tienes ninguna reserva aún.</p>
      )}
    </div>
  );
}
