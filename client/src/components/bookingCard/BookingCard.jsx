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
import { getUserById } from "../../app/redux/features/user/userActions";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

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
  const fireBaseUser = useSelector((state) => state.user.fireBaseUser);
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
    if (new Date(dateAndTime).valueOf() > Date.now()) {
      console.log(id, tattooArtistId);
      toast.error(`Todavía no puedes dejar una reseña`, {
        className: "toastError",
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
      });
    } else {
      router.push(`reservas/critica/${id}/${tattooArtistId}`);
    }
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

    dispatch(getUserById(fireBaseUser.tokenId));
  };

  return loaded ? (
    <div
      className={`bg-secondary-100 flex flex-col items-center justify-center w-[90%] rounded-lg
      ${
        paymentStatus === "in_process" || paymentStatus === "approved"
          ? ""
          : "hidden"
      }`}
    >
      <div className="h-[25px] w-full flex justify-end pr-4">
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
          <MenuItem className="hover:bg-secondary-100 w-full h-full">
            <RiDeleteBin6Fill />
            <button onClick={handleDeleteAppointment}>Cancelar Reserva</button>
          </MenuItem>
        </Menu>
      </div>
      <div className="w-full flex lg:flex-row flex-col">
        <div className="lg:w-[200px] w-full h-full border-r-[2px] border-r-primary/20 p-6">
          <div className="flex items-center justify-center">
            <p className="flex gap-2 text-[25px] mb-6 mt-4 font-rocksalt text-artistfont">
              <TbCalendarCheck className="text-primary text-[27px]" />
              Reserva:
            </p>
          </div>
          <p className="text-center text-[16px] mb-6 text-artistfont">
            {" "}
            {fechaFormateada}
          </p>
          <div className="flex items-center justify-center mb-8">
            <p className="flex gap-2 text-[16px] font-rocksalt text-artistfont">
              <MdOutlineAttachMoney className="text-primary text-[27px]" />
              Seña:{" "}
              <span className="font-sans text-[14px] text-artistfont">
                ${depositPrice}
              </span>
            </p>
          </div>
          <div>
            {paymentStatus &&
              (paymentStatus === "approved" ? (
                <p className="text-green-800 bg-secondary-900/50 rounded-lg py-2 text-center">
                  Pago aprobado
                </p>
              ) : paymentStatus === "in_process" ? (
                <p className="text-orange-600 bg-secondary-900/50 rounded-lg py-2 text-center">
                  Pago pendiente
                </p>
              ) : paymentStatus === "rejected" ? (
                <p className="text-red-600 bg-secondary-900/50 rounded-lg py-2 text-center">
                  Pago rechazado. Trendrás que volver a reservar un turno
                </p>
              ) : (
                <p>Error al procesar el pago, intentelo mas tarde</p>
              ))}
          </div>
        </div>

        <div className="lg:w-[50%] w-full h-full ml-2 items-center justify-center">
          {response.id && (
            <div className="w-full items-center justify-center">
              <div className="flex md:flex-row flex-col items-center justify-center mt-6 gap-2 mb-6 h-full">
                <div className="flex justify-center items-center gap-x-1">
                  {response.image && (
                    <div className="md:w-[90px] w-[45px] md:h-[90px] h-[45px] rounded-full overflow-hidden">
                      <Image
                        unoptimized
                        src={response.image}
                        loader={imageLoader}
                        width={90}
                        height={90}
                        alt={`${response.fullName} foto de perfil`}
                        className="w-full h-full rounded-full mb-6 object-cover"
                      />
                    </div>
                  )}
                  <p className="text-center md:text-[30px] text-[17px] font-newrocker text-artistfont">
                    {response.fullName}
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    onClick={handleReview}
                    className=" ml-6 text-black border-[1px] flex gap-x-1 items-center border-primary/50 hover:border-primary text-[15px] bg-primary rounded-lg px-2 py-1"
                  >
                    Dejar reseña
                  </button>
                </div>
              </div>
              <div className="w-full p-5">
                <p className="text-center mb-6 text-[25px] flex items-center justify-center gap-2 font-rocksalt text-artistfont ">
                  <FaMapPin className="text-primary" /> Dirección:
                </p>
                <p className="text-center text-[16px] mb-2 text-artistfont">
                  {response.address}, {response.location}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="lg:w-[25%] w-full h-full flex flex-col justify-center items-center p-5">
          <h1 className="text-center text-[27px] font-rocksalt mt-2 mb-8">
            Detalles:
          </h1>
          <p className="text-center mt-2">Tamaño: {size}</p>
          <p className="text-center mt-2">Duración: {duration} h.</p>
          <p className="text-center mt-2">Descipción: {description}</p>
          <p className="text-center mt-2">Tu diseño:</p>
          <div className="flex justify-center items-center mt-2">
            {image && (
              <Image
                unoptimized
                src={image}
                loader={imageLoader}
                width={120}
                height={120}
                alt={"Tu diseño"}
                className="rounded-full"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default BookingCard;
