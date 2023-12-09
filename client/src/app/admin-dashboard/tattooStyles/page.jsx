"use client";
import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getAllStyles,
  removeStyle,
} from "@/app/redux/features/styles/stylesActions";
import { openModalDeleteStyleAction } from "@/app/redux/features/modalDeleteStyle/modalDeleteStyleAction";
import { useRouter } from "next/navigation";

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
      <div className="scroll-fade md:w-3/4 flex flex-wrap gap-x-2">
        <div className="scroll-content w-full">
          {styles.map((style) => (
            <div key={style.id} className="mb-4 w-1/4 flex items-center ">
              <label className="flex items-center gap-2 px-3 py-1 border rounded-lg font-newrocker text-lg border-primary bg-black text-primary">
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
    </div>
  );
};

export default TattooStyles;
