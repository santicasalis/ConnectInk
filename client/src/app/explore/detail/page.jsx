"use client";

import React, {useState} from "react";

//HOOKS DEL CALENDARIO
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";


const TatuadorDetail = () => {

 

  // Simulamos datos de un tatuador
  const tatuador = {
    id: "1",
    nombre: "Juan González",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0PsOfnvaXEPcVlx14EvW-sVzI9Zs6TEVU-4Z5g0uJynqC49S9H2gko1aT3sG3fx_XOWQ&usqp=CAU",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut justo id odio gravida dapibus nec non lacus.",
    tattooStyles: ["Realismo", "Geométrico", "Minimalista"],
    numero: "+543814556565",
    email: "juanGonzales@gmail.com",
    adress: "9 de julio",
    city: "Buenos Aires",
    postCode: "1212",
  };

  

  return (
    <div className="bg-secondary-100 p-8 shadow-lg">
      <div className="bg-black text-white text-center text-6xl font-bold p-10 h-40 shadow-lg">
        DETAIL
      </div>

      <div className="flex flex-wrap md:flex-nowrap shadow-lg">
        <div className="w-full md:w-1/3 p-4 shadow-lg">
          <div className="p-4 rounded border-primary border-[2px] shadow-lg">
            <img
              src={tatuador.imagen}
              alt={tatuador.nombre}
              className="w-48 h-48 object-cover rounded-full mx-auto"
            />
            <h2 className="text-center text-2xl font-bold mt-4">
              {tatuador.nombre}
            </h2>
            <h2 className="text-2xl font-bold mb-4">Title</h2>
            <p className="mb-4">{tatuador.about}</p>
          </div>
        </div>

        <div className="w-full md:w-2/3 p-4 shadow-lg">
          <div className="p-4 rounded border-primary border-[2px] shadow-lg">
            <h3 className="text-xl font-bold mb-2">Tattoo Styles</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {tatuador.tattooStyles.map((style, index) => (
                <p key={index} className="flex items-center">
                  {style}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-around  p-4 rounded mt-4 border-primary border-[2px] shadow-lg">
            <div className=" p-4 border-primary border-[2px]">
              <h3 className="text-xl font-bold mb-2  ">Contacto</h3>
              <p>FullName: {tatuador.nombre}</p>
              <p>Email: {tatuador.email}</p>
              <p>Mobile: {tatuador.numero}</p>
              <p>Address: {tatuador.adress}</p>
              <p>City: {tatuador.city}</p>
              <p>Post Code: {tatuador.postCode}</p>
            </div>

            <div className="border-primary border-[2px] p-4">
              <p>Instagram</p>
              <p>Facebook</p>
              <p>Medium</p>
              <p>Twitter</p>
            </div>

            <div className=" p-4 rounded border-primary border-[2px] shadow-lg">
              <div className="flex flex-col items-center">
                <label className="text-md font-semibold">Small Tattoo</label>
                <span className="text-gray-600">$</span>
              </div>
              <div className="flex flex-col items-center mt-2">
                <label className="text-md font-semibold">Medium Tattoo</label>
                <span className="text-gray-600">$$</span>
              </div>
              <div className="flex flex-col items-center mt-2">
                <label className="text-md font-semibold">Large Tattoo</label>
                <span className="text-gray-600">$$$</span>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );


};

export default TatuadorDetail;

