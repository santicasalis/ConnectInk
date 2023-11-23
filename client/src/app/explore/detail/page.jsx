"use client"

import React from 'react';


const TatuadorDetail = () => {
  // Simulamos datos de un tatuador
  const tatuador = {
    id: '1',
    nombre: 'Juan González',
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0PsOfnvaXEPcVlx14EvW-sVzI9Zs6TEVU-4Z5g0uJynqC49S9H2gko1aT3sG3fx_XOWQ&usqp=CAU',
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut justo id odio gravida dapibus nec non lacus.",
    tattooStyles: ['Realismo', 'Geométrico', 'Minimalista'],
    numero: "+543814556565",
    email: "juanGonzales@gmail.com",
    adress: "9 de julio",
    city: "Buenos Aires",
    postCode: "1212",
    
  };

  return (
    <div className="bg-white text-black">
      {/* Rectángulo grande con el texto "PROFILE" en el centro */}
      <div className="bg-black text-white p-10   h-40  text-center text-6xl font-bold">
        DETAIL
      </div>
      <div className="grid grid-cols-2 h-full m-12">

      {/* Cuadrado con la foto y nombre del tatuador */}
      <div className="p-12 w-96  border border-black  ">
        <div className="  w-60 h-60 overflow-hidden">
          <img
            src={tatuador.imagen}
            alt={tatuador.nombre}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className='mt-2  text-xl font-bold'>{tatuador.nombre}</p>
          <p className='mt-2  text-xl font-bold hover:text-blue-300'>{tatuador.numero}</p>
          <button className='bg-blue-300 border hover:bg-blue-500 p-2 mt-2'>Reserva un turno!</button>
         
          
        </div>
      </div>

      {/* Div grande a la derecha con información */}
      <div className=" border border-black p-12 ">
        <h2 className="text-2xl font-bold mb-2">Titulo</h2>
        <p>Descripción general del tatuador y cualquier otra información relevante.</p>

        <h3 className="text-xl font-bold mt-4 mb-2">About Me</h3>
        <p>{tatuador.about}</p>

        <h3 className="text-xl font-bold mt-4 mb-2">Tattoo Styles</h3>
        <ul>
          {tatuador.tattooStyles.map((style, index) => (
            <li key={index}>{style}</li>
          ))}
        </ul>
      </div>
      </div>
      <div className=' text-left ml-12'>
        <h2 className='text-2xl font-bold mb-2'>Contacto</h2>
        <p>FullName: {tatuador.nombre}</p>
        <p>Email: {tatuador.email}</p>
        <p>Adress: {tatuador.adress}</p>
        <p>City: {tatuador.city}</p>
        <p>Post Code: {tatuador.postCode}</p>
        
      </div>
    </div>
  );
};

export default TatuadorDetail;