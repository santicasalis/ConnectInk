'use client'

import UserSideBar from "../../components/userSideBar/UserSideBar";
import Header from "../../components/header/Header";
import Modal from "../../components/modal/Modal";
import ModalCreate from "../../components/modal/ModalCreate";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
const ModalDeleteAppointment = dynamic(()=> import('../../components/modal/ModalDeleteAppointment'));


export default function DashboardLayout({ children }) {
    const isOpenModalDeleteAppointmentUser = useSelector((state) => state.modalDeleteAppointment.isOpen);
    return (
          <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6 relative">
                { isOpenModalDeleteAppointmentUser && <ModalDeleteAppointment className='absolute' /> }
                <UserSideBar />
                <div className="xl:col-span-5 ">
                    <Header/>
                    <div className="h-[92vh] overflow-y-scroll p-8 flex flex-col items-center font-bold text-gray-300 text-sm w-full">
                        {children}
                    </div>

                </div>
          </div>
    )
}
  