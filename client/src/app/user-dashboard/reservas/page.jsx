"use client"
import React from 'react';
import axios from 'axios';
import BookingCard from '@/components/bookingCard/BookingCard';
//import { useState } from 'react';
//import { useEffect } from 'react';
//import { getAllAppointments } from '@/app/redux/appointments/appointmentsActions';

export default function Reservas() {
 


    return (
        <div className='bg-secondary-900 p-8 rounded-xl w-[60%]'>
            <BookingCard />   
      </div>
    );
  }