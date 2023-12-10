"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStyles } from "../../../app/redux/features/styles/stylesActions";
import CustomerRegister from "../../../components/customerRegister/CustomerRegister";
import TattoArtistRegister from "../../../components/tattooArtistRegister/TattoArtistRegister";

import { auth } from "../../../firebase";
import { getUserInformation } from "../../../app/redux/features/user/userActions";
import { useRouter } from "next/navigation";
const { onAuthStateChanged } = require("firebase/auth");


const RegistrationForm = () => {
  const [client, setClient] = useState(null);
  const router = useRouter()
  const user = useSelector((state) => state.user.logedInUser)

  const styles = useSelector((state) => state.styles.names);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.userType) {
      if (user.userType == "artist") router.replace("/a-dashboard/home");
      if (user.userType == "customer") router.replace("/user-dashboard");
      if (user.userType == "admin") router.replace("/admin-dashboard/home");
    }
    dispatch(getAllStyles());
  }, []);

  return (
    <div className="bg-secondary-900/90 flex opacity-90 absolute h-[80vh] rounded-3xl w-full xl:w-1/2 lg:w-1/3 md:w-1/2">
      <div className="w-[35%] border-transparent border-r-[1px] border-r-white/10 flex flex-col items-center justify-center text-center px-8">
        <h2 className="font-rocksalt text-[40px] text-white/90 mb-2">
          Registrate{" "}
        </h2>
        <p className="text-primary/80 mb-4">como:</p>
        <div className="flex mb-4">
          <button
            onClick={() => setClient(true)}
            className={`text-white font-newrocker text-[17px]  py-3 px-4 font-bold rounded-l-2xl ${
              client
                ? "bg-primary/90 text-[22px]"
                : "bg-secondary-100 text-white/80"
            }`}
          >
            Cliente
          </button>
          <button
            onClick={() => setClient(false)}
            className={`text-white py-3 px-4 font-newrocker text-[17px]  font-bold rounded-r-2xl ${
              client
                ? "bg-secondary-100 text-white/80"
                : "bg-primary/90 text-[22px]"
            }`}
          >
            Artista
          </button>
        </div>
        {client ? (
          <div>
            <p className="text-white/80">
              "Como cliente, tendrás la posibilidad de buscar a los tatuadores
              que sean de tu agrado, filtrandolos por estilo de tatuaje o la
              zona donde trabajen, ademas de poder reservar turnos con los
              tatuadores, seleccionar tatuadores que te gusten, y tener
              comunicacion directa con el artista luego de reservar tu turno"
            </p>
          </div>
        ) : (
          <div>
            <p className="text-white/80">
              "Como artista, podrás dar a conocer tu trabajo, y ponerte a
              disposicion de nuestros clientes para la reserva de turnos."
            </p>
          </div>
        )}
      </div>
      <div className="flex-1 max-h-[80vh] overflow-y-auto flex items-center justify-center">
        {client ? (
          <div className="w-full h-[80vh] flex items-center justify-center">
            <CustomerRegister />
          </div>
        ) : (
          <div className="w-full h-[80vh] flex items-center justify-center pt-4">
            <TattoArtistRegister />
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
