"use client";
import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getAllStyles, removeStyle } from '../../../app/redux/features/styles/stylesActions';
import { openModalDeleteStyleAction } from '../../../app/redux/features/modalDeleteStyle/modalDeleteStyleAction';
import { useRouter } from "next/navigation";
import { RiEdit2Fill, RiDeleteBin2Fill  } from "react-icons/ri";


const TattooStyles = () => {
  const styles = useSelector((state) => state.styles.names);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.logedInUser);
  const router = useRouter();
  
  // const [showConfirmation, setShowConfirmation] = useState(false);
  // const [styleIdToDelete, setStyleIdToDelete] = useState(null);
  
  useEffect(() => {
    if (!user.userType) {
      router.replace("/auth");
    } else if (user.userType !== "admin") {
      router.replace("/");
    }
    dispatch(getAllStyles());
  }, [dispatch]);

  const handleRemoveStyle = (styleId) => {
    dispatch(openModalDeleteStyleAction(styleId));
  };

  return (
    <div>
      <div className="scroll-fade flex gap-x-2 w-full">
        <div className="scroll-content w-full flex flex-wrap gap-7">
          {styles.map((style) => (
            <div key={style.id} className="flex flex-col items-center border-[1px] shadow-inner shadow-admin/25 border-artistfont/70 rounded-lg p-6 bg-secondary-100/40">
              <label className="flex items-center gap-2  rounded-lg font-newrocker text-[28px] mb-5">
                <span className="text-[15px] text-artistfont/90">Estilo: </span>{style.name}
              </label>
              <div className="flex ">
                  <button
                    className=" flex gap-x-0.5 text-[16px] border-r-[1px] border-admin/50 pr-3 hover:text-admin"
                  >
                    <RiEdit2Fill />
                    Editar
                  </button>
                  <button
                    className=" flex gap-x-0.5 text-[16px] pl-3 hover:text-artistfont/70"
                    onClick={() => handleRemoveStyle(style.id)}
                  >
                    <RiDeleteBin2Fill />
                    Eliminar
                  </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TattooStyles;
