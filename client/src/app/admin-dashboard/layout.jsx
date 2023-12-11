"use client"
import AdminSideBar from "../../components/adminSideBar/AdminSideBar";
import Header from "../../components/header/Header";
import Link from 'next/link'
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";

const ModalDeleteArtist = dynamic(()=> import("../../components/modal/ModalDeleteArtist"))
const ModalDeleteStyle = dynamic(()=> import("../../components/modal/ModalDeleteStyle"))

const ModalCreateStyle = dynamic(()=> import("../../components/modal/ModalCreateStyle"))
const ModalEditAdmin = dynamic(() => import("../../components/modal/ModalEditAdmin"));
const ModalDeletePostAdmin = dynamic(() => import("../../components/modal/ModalDeletePostAdmin"));


export default function DashboardLayout({ children }) {
    const isOpenModalDeleteArtist = useSelector((state) => state.modalDeleteArtist.isOpen);
    const isOpenModalDeleteStyle = useSelector((state) => state.modalDeleteStyle.isOpen);

    const isOpenModalCreateStyle = useSelector((state) => state.modalCreateStyle.isOpen);

    const isModalEditOpen = useSelector((state) => state.modalEdit.isOpen);
    const isModalDeleteOpen = useSelector((state) => state.modalDelete.isOpen);

    

    return (
          <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6 relative">
                { isOpenModalDeleteArtist && <ModalDeleteArtist className="absolute " /> }
                { isOpenModalDeleteStyle && <ModalDeleteStyle className="absolute " /> }
                { isOpenModalCreateStyle && <ModalCreateStyle  className="absolute " /> }
                {isModalEditOpen && <ModalEditAdmin className="absolute" />}
                {isModalDeleteOpen && <ModalDeletePostAdmin className="absolute" />}

                <AdminSideBar /> 
                <div className="xl:col-span-5 ">
                    <Header/>
                    <div className="h-[92vh] overflow-y-scroll p-8 flex flex-col items-center font-bold text-artistfont text-sm w-full">
                        {children}
                    </div>
                </div>
          </div>
    )
  }
  