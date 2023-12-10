"use client";

import dynamic from "next/dynamic";

import SideBar from "../../components/sidebar/SideBar";
import Header from "../../components/header/Header";
const Modal = dynamic(() => import("../../components/modal/Modal"));
const ModalCreate = dynamic(() => import("../../components/modal/ModalCreate"));
const ModalDeletePost = dynamic(() => import("../../components/modal/ModalDeletePost"));
const ModalDeleteAppointment = dynamic(()=> import("../../components/modal/ModalDeleteAppointment"));
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../redux/features/user/userActions";
import { useEffect } from "react";


export default function DashboardLayout({ children }) {
  const isModalEditOpen = useSelector((state) => state.modalEdit.isOpen);
  const isModalCreateOpen = useSelector((state) => state.modalCreate.isOpen);
  const isModalDeleteOpen = useSelector((state) => state.modalDelete.isOpen);
  const isModalDeleteAppointmentOpen = useSelector(
    (state) => state.modalDeleteAppointment.isOpen
  );
  const fireBaseUser = useSelector((state) => state.user.fireBaseUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById(fireBaseUser.tokenId));
  }, [fireBaseUser]);
  
  return (
    <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6 relative">
      {isModalEditOpen && <Modal className="absolute" />}
      {isModalCreateOpen && <ModalCreate className="absolute" />}
      {isModalDeleteOpen && <ModalDeletePost className="absolute" />}
      {isModalDeleteAppointmentOpen && (
        <ModalDeleteAppointment className="absolute" />
      )}
      <SideBar />
      <div className="xl:col-span-5 ">
        <Header />
        <div className="h-[92vh] overflow-y-scroll p-8 flex flex-col items-center font-bold text-artistfont text-sm w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
