"use client";

import { useState } from "react";

import React, { useEffect } from "react";

import { uploadImage } from "../../utils/uploadImage";
import { useDispatch, useSelector } from "react-redux";
import { getAllStyles } from "@/app/redux/features/styles/stylesActions";
import { auth } from "../../../firebase";
import CustomerRegister from "@/components/customerRegister/CustomerRegister";
import TattoArtistRegister from "@/components/tattooArtistRegister/TattoArtistRegister";

const RegistrationForm = () => {
  const [client, setClient] = useState(null);
  const [userInformation, setUserInformation] = useState({
    tokenId: "",
    userName: "",
    image: "",
    email: "",
    phoneNumber: "",
  });
  const urlBase = "localhost:3001";

  const { onAuthStateChanged } = require("firebase/auth");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInformation({
          tokenId: user.uid,
          userName: user.displayName,
          image: user.photoURL,
          email: user.email,
          phoneNumber: user.phoneNumber,
        });
      } else {
        setUserInformation(null);
      }
    });
  }, [auth]);

  const styles = useSelector((state) => state.styles.names);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStyles());
  }, []);

  return (
    <div>
      <button
        onClick={() => setClient(true)}
        style={{ backgroundColor: client ? "green" : "white" }}
        className="text-black"
      >
        Cliente
      </button>
      <button
        onClick={() => setClient(false)}
        style={{ backgroundColor: client ? "white" : "green" }}
        className="text-black"
      >
        Artista
      </button>
      {client ? (
        <div>
          <p>
            Como cliente, tendrás la posibilidad de explorar la página, buscar a
            los tatuadores que sean de tu agrado, filtrandolos por estilo de
            tatuaje o la zona donde trabajen, ademas de poder reservar turnos
            con los tatuadores, seleccionar tatuadores que te gusten en una
            pestaña favoritos, y tener comunicacion directa con el artista luego
            de reservar tu turno
          </p>
          <CustomerRegister userInformation={userInformation} />
        </div>
      ) : (
        <div>
          <p>
            Como artista, podrás dar a conocer tu trabajo, y ponerte a
            disposicion de nuestros clientes para la reserva de turnos.
          </p>
          <TattoArtistRegister userInformation={userInformation} />
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
