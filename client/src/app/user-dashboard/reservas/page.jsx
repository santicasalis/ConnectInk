
import React from 'react';

export default function Hola() {

    const reservations = [
        {
          id: 1,
          date: '15/12/23',
          time: '16:30',
          artist: 'Juan Perez',
        },
       
      ];

    return (
        <div className='bg-secondary-900 p-8 rounded-xl w-full'>
        <h1 className='text-4xl'>Mis Reservas</h1>
        <hr className='my-8 border-gray-500' />
        <div className='p-4 border-2 border-primary w-1/5 font-newrocker text-lg '>
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <div key={reservation.id} className='mb-4'>
                <p>Fecha de mi turno: {reservation.date}</p>
                <p>Hora de mi turno: {reservation.time} hs</p>
                <p>Artista: {reservation.artist}</p>
              </div>
            ))
          ) : (
            <p>No has realizado ninguna reserva.</p>
          )}
        </div>
      </div>
    );
  };
  