"use client"
import React from 'react'
import { TbCalendarCheck } from "react-icons/tb";
import { RiHeart3Line, RiHeart3Fill, RiEditFill, RiDeleteBin6Fill, RiMoreFill, RiMessage3Line, RiEmotionHappyLine } from "react-icons/ri";
import { Menu, MenuItem, MenuButton} from '@szhsin/react-menu';
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoBodyOutline } from "react-icons/io5";
import { FaMapPin, FaPhone } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from "axios"
import { useState } from 'react';
import Image from 'next/image';
import { openModalDeleteAppointmentAction } from '@/app/redux/features/modalDeleteAppointment/modalDeleteAppointmentAction';
import Link from 'next/link';
import { notifyError } from "@/components/notifyError/NotifyError";

const ArtistBookingCard = ({id, bodyPlace, description, duration, image, size, dateAndTime, depositPrice, CustomerId}) => {
    const dispatch = useDispatch();
    const imageLoader = ({src}) => {
        return src
      }
    const user = useSelector((state)=>state.user.logedInUser)
    
        
    let date = new Date(dateAndTime) 
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
        const resp = (await axios.get(`http://localhost:3001/customers/${CustomerId}`)).data
        setResponse(resp)
       } catch (error) {
        notifyError("error");
       }     
       
    }
        
     artistId()       
        
    },[])


  return (
    <div className='bg-secondary-900 w-[830px] h-[250px] rounded flex transition-transform hover:scale-105'>
        <div className='w-[26%] h-full   border-r-[2px] border-r-neutral-700'>
            <div className='pt-2 '>
                <p className='flex gap-2 ml-8 text-xl'> <TbCalendarCheck className='text-primary text-[27px]'/>Reserva:</p>
                <p className='mt-[4px] text-center'> {fechaFormateada}</p>
            </div>     
            {/* <div className='pt-4'>
                <p className='flex gap-2 ml-4'> <IoBodyOutline className='text-primary text-[27px]'/>Donde: {bodyPlace}</p>
                
            </div> */}
            <div className='pt-10'>
                <p className=' flex gap-[2px] ml-6 items-center '><MdOutlineAttachMoney className='text-primary text-[27px]' />Seña: {depositPrice}</p>

            </div>
            <div className='ml-4 mt-[50px]'>
            <p className='font-rocksalt text-[18px]'>Connect<span className='text-primary'>Ink.</span></p>  
            </div>
             
        </div>
           <div className=' w-[65%] mt-4'>
            
            <div>
                {/* <p className='ml-6 text-2xl mt-2 font-rocksalt'>Cliente:</p> */}
                <div className='ml-6 flex items-center mt-2  gap-2'>
                    <Image unoptimized src={response.image} loader={imageLoader} width={80} height={80} alt={`${response.fullName} profile pic`} className=' rounded-full'/>
                    <p className='text-center text-[18px]'>{response.fullName}</p>
                </div>
                <div className='ml-6 mt-4 '>
                    <h1 className='text-[19px] font-rocksalt'>Descripcion:</h1>
                    <p className='mt-4'>{description}</p>
                </div>


            </div>
        </div>
        <div className=' w-[20%] mr-4'>
            <div className='flex items-end justify-end'>
            <Menu menuButton={
                            <MenuButton >  
                                <RiMoreFill className='text-white text-[25px] cursor-pointer hover:bg-secondary-100'/>
                            </MenuButton>}
                        transition
                        menuStyle={{backgroundColor:'#252524', color:'white'}}
                        menuClassName={'hover:bg-secondary-900 hover:text-black-900'}>
                        
                            <MenuItem className='hover:bg-secondary-100 w-full h-full' onClick={()=>dispatch(openModalDeleteAppointmentAction(id))}>
                                
                                    <RiDeleteBin6Fill />
                                    Cancelar Reserva
                                
                            </MenuItem>
                        </Menu>

            </div>
       
             <p className='text-center text-2xl font-rocksalt mt-2'>Detalles:</p>
             <p className='text-center mt-2 '>Tamaño: {size}</p>
             <p className='text-center mt-2 '>Duracion:{duration}</p>
             <p className='text-center mt-2'>Boceto:</p>
            <div className='flex justify-center items-center mt-2'>
                 <Image unoptimized src={image} loader={imageLoader} width={70} height={70} alt={"Tu Tattoo"} className=' rounded-full'/> 
           </div>
            
             
            
            
            
        </div>
    </div>
  )
}

export default ArtistBookingCard