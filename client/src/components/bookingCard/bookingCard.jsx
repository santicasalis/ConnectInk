"use client"
import React from 'react'
import { TbCalendarCheck } from "react-icons/tb";
import { PiWatchLight } from "react-icons/pi";
import { MdOutlinePendingActions, MdOutlineEmail } from "react-icons/md";
import { FaMapPin, FaPhone } from "react-icons/fa6";


const BookingCard = () => {

    const reservation = {
        id: 1,
        name: "Juan",
        date: "2022-01-01",
        time: "12:00",
        status: "pendiente",
        artist: {
            id: 1,
            name: "matias Perez",
            email: "matiPerez@gmail.com",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyI80S1tgnWJO1uy3Ba9sVBdSYvkvHf6xhXw&usqp=CAU",
            phone: "0123456789",
            address: "123 Main Street, New York, NY 10011",
            city: "New York",
            state: "NY",
            country: "USA",
            postalCode: "10011",
            createdAt: "2022-01-01T12:00:00.000Z",
            updatedAt: "2022-01-01T12:00:00.000Z",
        },
    }


  return (
    <div className='bg-secondary-900 w-[750px] h-[220px] rounded flex '>
        <div className='w-[15%] h-full  ml-4 border-r-[2px] border-r-neutral-500'>
            <div className='pt-4'>
                <p className='flex gap-2'> <TbCalendarCheck className='text-primary text-[27px]'/>Reserva</p>
                <p className='mt-[4px] text-center'>{reservation.date}</p>
            </div>
            <div className='mt-4 '>
                <p className='flex gap-1 ml-2 '> <PiWatchLight className='text-primary text-[27px]' /> Hora:</p>
                <p className='ml-4 mt-[4px] text-center'>{reservation.time}</p>
            </div>

            <div className='mt-4'>
                <p className='flex gap-1 '> <MdOutlinePendingActions className='text-primary text-[27px]' /> Estado:</p>
                <p className='ml-4 mt-[4px]'>{reservation.status}</p>
            </div>
           
        </div>
        
        <div className=' w-[65%] mt-4'>
            <div>
                <p className='text-center mb-[10px] text-2xl flex items-center justify-center gap-2 font-rocksalt'><FaMapPin className='text-primary' /> Donde:</p>
                <p className='text-center'>{reservation.artist.city}</p>
                <p  className='text-center'>{reservation.artist.address}</p>
            </div>
            <div>
                <p className='text-center mb-[15px] text-2xl mt-4 font-rocksalt'>Artista:</p>
                <div className='flex justify-center items-center gap-2'>
                    <img src={reservation.artist.image} className='w-[50px] h-[50px] rounded-full' alt=''/>
                    <p className='text-center'>{reservation.artist.name}</p>
                    
                    
                </div>


            </div>
        </div>
        <div className=' w-[20%] mr-4'>
            <p className='text-center text-2xl font-rocksalt mt-6'>Contacto:</p>
            <p className='text-center mt-8 flex justify-center items-center gap-2'><FaPhone className='text-primary text-[17px]'/> {reservation.artist.phone}</p>
            <p className='mt-4 flex items-center justify-center'><MdOutlineEmail className='text-[17px] text-primary'/></p>
            <p className='text-center '>{reservation.artist.email}</p>
        </div>
    </div>
  )
}

export default BookingCard