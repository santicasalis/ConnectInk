"use client"
import React from 'react'
import { TbCalendarCheck } from "react-icons/tb";
import { PiWatchLight } from "react-icons/pi";
import { MdOutlinePendingActions, MdOutlineEmail } from "react-icons/md";
import { IoBodyOutline } from "react-icons/io5";
import { FaMapPin, FaPhone } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from "axios"
import { useState } from 'react';
import Image from 'next/image';

const BookingCard = ({appointmentData}) => {
    const imageLoader = ({src}) => {
        return src
      }
    const user = useSelector((state)=>state.user.logedInUser)
    
    const appointment = user.appointments[0].data
        console.log(appointment, "apppppp")
    
    const artist = user.appointments[0].artist
    
        
    let date = new Date(appointment.dateAndTime) 
    let opcionesFormato = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short' 
    };
    let fechaFormateada = date.toLocaleDateString('es-ES', opcionesFormato)

    const [response, setResponse]= useState({}) 

    useEffect(()=>{
      
    const artistId = async ()=>{
       try {
        const resp = (await axios.get(`http://localhost:3001/tattooArtists/${artist}`)).data
        setResponse(resp)
       } catch (error) {
        console.error("error")
       }     
       
    }
        
     artistId()       
        
    },[])

    console.log(response, "ARTISTA")

  return (
    <div className='bg-secondary-900 w-[830px] h-[250px] rounded flex transition-transform hover:scale-105'>
        <div className='w-[26%] h-full   border-r-[2px] border-r-neutral-700'>
            <div className='pt-2 '>
                <p className='flex gap-2 ml-8'> <TbCalendarCheck className='text-primary text-[27px]'/>Reserva</p>
                <p className='mt-[4px] text-center'> {fechaFormateada}</p>
            </div>     
            <div className='pt-4'>
                <p className='flex gap-2 ml-4'> <IoBodyOutline className='text-primary text-[27px]'/>Donde:</p>
                <p className='mt-[8px] text-center'> {appointment.bodyPlace}</p>
            </div>
            <div className='mt-[35px] ml-4 '>
            <p className='font-rocksalt text-[18px]'>Connect<span className='text-primary'>Ink.</span></p>  
            </div>
             
        </div>
           <div className=' w-[65%] mt-4'>
            <div>
                <p className='text-center mb-[10px] text-2xl flex items-center justify-center gap-2 font-rocksalt'><FaMapPin className='text-primary' /> Dirección:</p>
                <p className='text-center'>{response.address}</p>
                <p className='text-center'>{response.location}</p>
            </div>
            <div>
                <p className='text-center mb-[15px] text-2xl mt-4 font-rocksalt'>Artista:</p>
                <div className='flex justify-center items-center gap-2'>
                    <Image unoptimized src={response.image} loader={imageLoader} width={80} height={80} alt={`${response.fullName} profile pic`} className=' rounded-full'/>
                    <p className='text-center'>{response.fullName}</p>
                    
                    
                </div>


            </div>
        </div>
        <div className=' w-[20%] mr-4'>
            <p className='text-center text-2xl font-rocksalt mt-6'>Contacto:</p>
            <p className='text-center mt-8 flex justify-center items-center gap-2'><FaPhone className='text-primary text-[17px]'/> {response.phone}</p>
            <p className='mt-4 flex items-center justify-center'><MdOutlineEmail className='text-[17px] text-primary'/></p><p className='text-center '>{response.email}</p> 
             <div className='flex justify-center items-center'>
             <button className='bg-primary/50 mt-6 w-[75%] rounded'>Dejar Reseña</button>
             </div>
            
            
            
        </div>
    </div>
  )
}

export default BookingCard