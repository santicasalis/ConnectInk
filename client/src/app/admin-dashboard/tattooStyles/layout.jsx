"use client"
import AdminTopBarStyles from "@/components/admintopBarOptions/AdminTopBarOptions";
import { RiAddFill } from "react-icons/ri";
import Link from 'next/link'
import React, { useState } from 'react';
import Modal from 'react-modal';
import { RiCloseFill } from "react-icons/ri";
import { addNewStyle } from '@/app/redux/features/styles/stylesActions';
import { useDispatch } from "react-redux";


export default function TattooStylesLayout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStyleName, setNewStyleName] = useState("")
  const dispatch = useDispatch();

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddStyle = () => {
    if (newStyleName.trim() !== '') {
     console.log('Nuevo estilo a añadir:', newStyleName);
     dispatch(addNewStyle({ name: newStyleName }));
    closeModal(); 
    }
  };
    return (
      <div className='bg-secondary-900 p-8 rounded-xl w-full'>
      <div className="flex">
        <h1 className='text-4xl font-rocksalt'> Estilos </h1>
        <div className="ml-auto">
          <button
            className="hover:bg-white hover:text-black flex items-center gap-1 border-gray-300 text-gray-300 border-[1px] px-2 py-3 rounded-md cursor-pointer"
            onClick={openModal}
          >
            <RiAddFill className="font-bold" />
            Crear estilo
          </button>
        </div>
      </div>
      <hr className='my-8 border-gray-500'/>
      {/* <AdminTopBarStyles /> */}
      {children}

     
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Crear Estilo Modal"
        className="w-1/4 mx-auto p-4 border rounded-md bg-secondary-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        //overlayClassName="modal-overlay"
      >
        <div className="absolute top-0 right-0 m-4">
          <button
            className="text-primary hover:text-red-700"
            onClick={closeModal}
          >
            <RiCloseFill size={24} />
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-xl mb-4 text-primary ">Crear nuevo estilo</h2>
        </div>
        <div className="text-center">
          <input
            type="text"
            onChange={(event) => setNewStyleName(event.target.value)}
            placeholder="Ingrese el nombre del estilo"
            className="w-full p-2 border rounded-md text-black"
          />
        </div>
        <div className="text-center">
          <button
            className="mt-8 px-4 py-2 text-xl text-primary bg-secondary-500 border border-secondary-500 rounded-md hover:bg-primary hover:font-bold hover:text-secondary-100"
            onClick={handleAddStyle}
          >
            Agregar
          </button>
        </div>
      </Modal>
    </div>
  );
}