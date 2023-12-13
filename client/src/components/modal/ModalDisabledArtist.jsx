"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiAlertFill, RiCloseFill, RiCheckFill } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { closeModalDisabledArtistAction } from "../../app/redux/features/modalDisabledArtist/modalDisabledArtistAction";
import { DeleteArtists } from "../../app/redux/features/artists/artistActions";

const ModalDisabledArtist = () => {
  const dispatch = useDispatch();
  const URL_BASE = "http://localhost:3001";
  const [id, setId] = useState("");
  const { isOpen, data } = useSelector((state) => state.modalDisabledArtist);

  const handleClose = () => {
    dispatch(closeModalDisabledArtistAction());
  };



  useEffect(() => {
    setId(data.id);
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(DeleteArtists(data.id));
      await axios.post("http://localhost:3001/nodemailer/restoreAccount", {email: data.email})
      dispatch(closeModalDisabledArtistAction());
      toast.success(`El artista se reestableció con éxito`, {
        className: "toastSuccess",
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (error) {
      toast.error(`Hubo un error al reestablecer el artista`, {
        className: "toastError",
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 flex justify-center items-center w-full h-full z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
        >
          <div className="w-full h-full flex justify-center items-center relative">
            <RiCloseFill
              className="absolute top-2 right-2 text-artistfont text-[35px] cursor-pointer hover:text-admin"
              onClick={handleClose}
            />
            <div className="bg-secondary-900 z-50 opacity-100  w-[400px] flex flex-col p-6 rounded-lg shadow-admin/40 shadow-md">
              <form onSubmit={handleSubmit} className="flex flex-col">
                <h3 className="font-newrocker text-[18px] mb-4 text-artistfont flex gap-x-1 items-center">
                  {" "}
                  <RiAlertFill className="text-admin/80" /> Estás seguro que
                  quieres restablecer este artista?
                </h3>

                <div className="flex gap-x-5 w-full justify-center items-center">
                  <label
                    className="cursor-pointer flex gap-x-0.5 items-center hover:text-admin "
                    onClick={handleClose}
                  >
                    {" "}
                    <RiCloseFill className="text-[18px]" /> Cancelar
                  </label>
                  <button
                    type="submit"
                    className="flex gap-x-0.5 items-center hover:text-artistfont/70"
                  >
                    {" "}
                    <RiCheckFill className=" text-[18px]" /> Restablecer artista{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalDisabledArtist;
