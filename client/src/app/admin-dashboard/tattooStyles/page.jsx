"use client"
import React from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getAllStyles, removeStyle } from '@/app/redux/features/styles/stylesActions';

const TattooStyles = () => {
  const styles = useSelector((state) => state.styles.names);
  const dispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [styleIdToDelete, setStyleIdToDelete] = useState(null);


  useEffect(() => {
    dispatch(getAllStyles());
  }, [dispatch]);

  const handleRemoveStyle = (styleId) => {
    setStyleIdToDelete(styleId);
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    if (styleIdToDelete !== null) {
      dispatch(removeStyle(styleIdToDelete));
      setStyleIdToDelete(null);
      setShowConfirmation(false);
    }
  };

  const cancelDelete = () => {
    setStyleIdToDelete(null);
    setShowConfirmation(false);
  };

  return (
    <div>
      <div className="scroll-fade md:w-3/4 flex flex-wrap gap-x-2">
        <div className="scroll-content w-full">
          {styles.map((style) => (
            <div key={style.id} className="mb-4 w-1/4 flex items-center ">
              <label
                className="flex items-center gap-2 px-3 py-1 border rounded  bg-white text-black"
              >
                {style.name}
              </label>
              <button
                className="text-red-500 ml-3"
                onClick={() => handleRemoveStyle(style.id)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md text-secondary-100 ">
            <p>¿Estás seguro de que deseas eliminar este estilo?</p>
            <button className="bg-red-500 text-white px-4 py-2 mr-2" onClick={confirmDelete}>
              Confirmar
            </button>
            <button className="bg-gray-500 text-white px-4 py-2" onClick={cancelDelete}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TattooStyles;