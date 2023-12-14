"use client";
import React from "react";
import { TbCalendarCheck } from "react-icons/tb";
import {
  RiHeart3Line,
  RiHeart3Fill,
  RiEditFill,
  RiDeleteBin6Fill,
  RiMoreFill,
  RiMessage3Line,
  RiEmotionHappyLine,
} from "react-icons/ri";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoBodyOutline } from "react-icons/io5";
import { FaMapPin, FaPhone } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";
import { openModalDeleteAppointmentAction } from "../../app/redux/features/modalDeleteAppointment/modalDeleteAppointmentAction";
import Link from "next/link";
import { notifyError } from "../notifyError/NotifyError";
import { current } from '@reduxjs/toolkit';
import { getUserById } from "../../app/redux/features/user/userActions";


const ArtistBookingCard = ({id, bodyPlace, description, duration, image, size, dateAndTime, depositPrice, CustomerId, paymentStatus}) => {
    const dispatch = useDispatch();
    const imageLoader = ({src}) => {
        return src
      }
    const user = useSelector((state)=>state.user.logedInUser)
    const fireBaseUser = useSelector((state)=>state.user.fireBaseUser)
    
        
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

  const [response, setResponse] = useState({});

  useEffect(() => {
    const artistId = async () => {
      try {
        const resp = (
          await axios.get(`http://localhost:3001/customers/${CustomerId}`)
        ).data;
        setResponse(resp);
      } catch (error) {
        notifyError("error");
      }
    };

    artistId();
  }, []);

  const handleCancelation = async () => {
    dispatch(openModalDeleteAppointmentAction(id));

    const customer = (
      await axios(`http://localhost:3001/customers/${CustomerId}`)
    ).data;

    const year = new Date(dateAndTime).getFullYear();
    const month = new Date(dateAndTime).getMonth() + 1;
    const day = new Date(dateAndTime).getDate();
    const hour = new Date(dateAndTime).getHours();

    const dateData = `${day}/${month}/${year} a las ${hour} horas`;
    const data = {
      dateData,
      customerName: customer.fullName,
      customerEmail: customer.email,
      artistName: user.fullName,
      artistEmail: user.email,
      depositPrice,
    };

    await axios.post("http://localhost:3001/nodemailer/cancelDate", data);
    dispatch(getUserById(fireBaseUser.tokenId))
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className={`bg-secondary-100 w-[60%] h-full rounded flex mb-8 shadow-artist shadow-sm   ${
          paymentStatus === "in_process"
            ? ""
            : paymentStatus === "approved"
            ? ""
            : ""
        }`}>
          <div className="w-[25%] my-8 border-r-[1px] border-r-artist/10 p-4">
            <div>
              <p className="text-artistfont text-[22px] flex gap-2 items-center justify-center mb-8 font-rocksalt "> 
                    <TbCalendarCheck className="text-artist text-[27px]" /> Reserva: </p>
              <p className="text-center text-artistfont mb-4"> {fechaFormateada}</p>
            </div>
              <div className="flex items-center justify-center mb-8">
                  <MdOutlineAttachMoney className="text-artist text-[27px]" />
                    <p className="text-artistfont text-[22px] font-rocksalt">   Seña: <span className="text-[19px] font-mono">${depositPrice}</span></p>
              </div>
          
            <div className="text-[16px] text-artistfont text-center">
                {paymentStatus &&
                  (paymentStatus === "approved" ? (
                    <p className="text-green-800 bg-secondary-900/50 rounded-lg py-2">Pago aprobado</p>
                  ) : paymentStatus === "in_process" ? (
                    <p className="text-orange-600 bg-secondary-900/50 rounded-lg py-2">Pago pendiente</p>
                  ) : paymentStatus === "rejected" ? (
                    <p className="text-red-800 bg-secondary-900/50 rounded-lg py-2">Pago rechazado. Trendrás que volver a reservar un turno</p>
                  ) : (
                    <p>Error al procesar el pago, intentelo mas tarde</p>
                  ))}
            </div>
        </div>
        <div className=" w-[50%]">
          <div>
           
            <div className="ml-6 flex items-center mt-6 gap-2 mb-6 border-b-artist/10 border-b-[1px] pb-3">
              {response.image && (
                <Image
                  unoptimized
                  src={response.image}
                  loader={imageLoader}
                  width={120}
                  height={120}
                  alt={`${response.fullName} profile pic`}
                  className=" rounded-full "
                />
              )}
              <p className="ml-4 text-center font-newrocker text-[28px] text-artistfont">{response.fullName}</p>
            </div>
            <div className="ml-6 mt-4 ">
              <h1 className="text-[19px] font-rocksalt text-artistfont">Descripción del Tatauje:</h1>
              <p className="mt-4">{description}</p>
            </div>
          </div>
        </div>
        <div className=" w-[25%] mr-4">
          <div className="flex items-end justify-end">
            <Menu
              menuButton={
                <MenuButton>
                  <RiMoreFill className="text-artistfont text-[25px] cursor-pointer hover:bg-secondary-100" />
                </MenuButton>
              }
              transition
              menuStyle={{ backgroundColor: "#252524", color: "white" }}
              menuClassName={"hover:bg-secondary-900 hover:text-black-900"}
            >
              <MenuItem
                className="hover:bg-secondary-100 w-full h-full"
                onClick={handleCancelation}
              >
                <RiDeleteBin6Fill />
                Cancelar Reserva
              </MenuItem>
            </Menu>
          </div>

          <h1 className="text-center text-[27px] font-rocksalt mt-2 mb-8">Detalles:</h1>
          <p className="text-center font-rocksalt mb-2 text-artistfont ">Tamaño:<span className="font-sans">    {size}</span></p>
          <p className="text-center font-rocksalt mb-2 text-artistfont ">Duracion: <span className="font-sans">{duration} hs</span></p>
          <p className="text-center font-rocksalt mb-2 text-artistfont ">Boceto:</p>
          <div className="flex justify-center items-center mt-2">
            {image && (
              <Image
                unoptimized
                src={image}
                loader={imageLoader}
                width={140}
                height={140}
                alt={"No hay boceto"}
                className=" rounded-full"
              />
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ArtistBookingCard;
