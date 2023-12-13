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
import Link from "next/link";
import { openModalDeleteAppointmentAction } from "../../app/redux/features/modalDeleteAppointment/modalDeleteAppointmentAction";
import { useRouter } from "next/navigation";
import { notifyError } from "../../components/notifyError/NotifyError";

const BookingCard = ({
  paymentStatus,
  id,
  bodyPlace,
  description,
  duration,
  image,
  size,
  dateAndTime,
  depositPrice,
  tattooArtistId,
}) => {
  const imageLoader = ({ src }) => {
    return src;
  };
  const user = useSelector((state) => state.user.logedInUser);
  const router = useRouter();
  const dispatch = useDispatch();
  let date = new Date(dateAndTime);
  let opcionesFormato = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  };
  let fechaFormateada = date.toLocaleDateString("es-ES", opcionesFormato);
  const [loaded, setLoaded] = useState(false);
  const [response, setResponse] = useState({});

  useEffect(() => {
    setLoaded(true);
    const artistId = async () => {
      try {
        const resp = (
          await axios.get(
            `http://localhost:3001/tattooArtists/${tattooArtistId}`
          )
        ).data;
        setResponse(resp);
      } catch (error) {
        notifyError("error");
      }
    };

    artistId();
  }, []);

  const handleReview = () => {
    // if (new Date(dateAndTime).valueOf() > Date.now()) {
    //   console.log(id, tattooArtistId);
    //   //hacer un toast que diga que todavia no se puede hacer la reseña porque no paso la cita
    // } else {

    router.push(`reservas/critica/${id}/${tattooArtistId}`);
    // }
  };

  const handleDeleteAppointment = async () => {
    dispatch(openModalDeleteAppointmentAction(id));

    const artist = (
      await axios(`http://localhost:3001/tattooArtists/${tattooArtistId}`)
    ).data;

    const year = new Date(dateAndTime).getFullYear();
    const month = new Date(dateAndTime).getMonth() + 1;
    const day = new Date(dateAndTime).getDate();
    const hour = new Date(dateAndTime).getHours();

    const dateData = `${day}/${month}/${year} a las ${hour} horas`;
    const data = {
      dateData,
      customerName: user.fullName,
      customerEmail: user.email,
      artistName: artist.fullName,
      artistEmail: artist.email,
      depositPrice,
    };

    await axios.post("http://localhost:3001/nodemailer/cancelDate", data);
  };

  return loaded ? (
    <div
      className={`
        ${
          paymentStatus === "in_process"
            ? "shadow-md shadow-orange-500"
            : paymentStatus === "approved"
            ? "shadow-md shadow-green-500"
            : "shadow-md shadow-red-500"
        }`}
    >
      <div className="bg-secondary-900 w-[830px] h-[250px] rounded flex transition-transform hover:scale-105">
        <div className="w-[26%] h-full   border-r-[2px] border-r-neutral-700">
          <div className="pt-2 ">
            <p className="flex gap-2 ml-8">
              {" "}
              <TbCalendarCheck className="text-primary text-[27px]" />
              Reserva:
            </p>
            <p className="mt-[4px] text-center"> {fechaFormateada}</p>
          </div>
          <div className="pt-4">
            <p className="flex gap-2 ml-4">
              {" "}
              <IoBodyOutline className="text-primary text-[27px]" />
              Donde: {bodyPlace}
            </p>
          </div>
          <div className="pt-4">
            <p className=" flex gap-2 ml-4 ">
              <MdOutlineAttachMoney className="text-primary text-[27px]" />
              Seña: {depositPrice}
            </p>
          </div>
          <div className="mt-[35px] ml-4 ">
            <p className="font-rocksalt text-[18px]">
              Connect<span className="text-primary">Ink.</span>
            </p>
          </div>
        </div>

        <div>
          {response.id && (
            <div>
              <div>
                <p className="text-center mb-[10px] text-2xl flex items-center justify-center gap-2 font-rocksalt">
                  <FaMapPin className="text-primary" /> Dirección:
                </p>
                <p className="text-center">{response.address}</p>
                <p className="text-center">{response.location}</p>
              </div>
              <div>
                <p className="text-center mb-[15px] text-2xl mt-4 font-rocksalt">
                  Artista:
                </p>
                <div className="flex justify-center items-center gap-2">
                  {response.image && (
                    <Image
                      unoptimized
                      src={response.image}
                      loader={imageLoader}
                      width={80}
                      height={80}
                      alt={`${response.fullName} profile pic`}
                      className=" rounded-full"
                    />
                  )}

                  <p className="text-center">{response.fullName}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className=" w-[20%] mr-4">
          <div className="flex items-end justify-end">
            <Menu
              menuButton={
                <MenuButton>
                  <RiMoreFill className="text-white text-[25px] cursor-pointer hover:bg-secondary-100" />
                </MenuButton>
              }
              transition
              menuStyle={{ backgroundColor: "#252524", color: "white" }}
              menuClassName={"hover:bg-secondary-900 hover:text-black-900"}
            >
              <MenuItem className="hover:bg-secondary-100 w-full h-full">
                <RiDeleteBin6Fill />
                <button onClick={handleDeleteAppointment}>
                  Cancelar Reserva
                </button>
              </MenuItem>
            </Menu>
          </div>

          <p className="text-center text-2xl font-rocksalt mt-2">Detalles:</p>
          <p className="text-center mt-2 ">Tamaño: {size}</p>
          <p className="text-center mt-2 ">Duracion:{duration}</p>
          <p className="text-center mt-2">Tu diseño:</p>
          <div className="flex justify-center items-center mt-2">
            {image && (
              <Image
                unoptimized
                src={image}
                loader={imageLoader}
                width={50}
                height={50}
                alt={"Tu Tattoo"}
                className=" rounded-full"
              />
            )}
          </div>
        </div>
        <button onClick={handleReview}>Dejar reseña</button>

        <div>
          {paymentStatus &&
            (paymentStatus === "approved" ? (
              <p>Pago aprobado</p>
            ) : paymentStatus === "in_process" ? (
              <p>Pago pendiente</p>
            ) : paymentStatus === "rejected" ? (
              <p>Pago rechazado. Trendrás que volver a reservar un turno</p>
            ) : (
              <p>Error al procesar el pago, intentelo mas tarde</p>
            ))}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default BookingCard;
